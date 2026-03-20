package com.decaf.domain.orderItem.service;


import com.decaf.domain.order.entity.Order;
import com.decaf.domain.order.repository.OrderRepository;
import com.decaf.domain.orderItem.dto.OrderItemRequest;
import com.decaf.domain.orderItem.dto.OrderItemResponse;
import com.decaf.domain.orderItem.entity.OrderItem;
import com.decaf.domain.orderItem.repository.OrderItemRepository;
import com.decaf.domain.product.entity.Product;
import com.decaf.domain.product.repository.ProductRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    // 아이템 생성
    @Transactional
    public OrderItemResponse createOrderItem(@Valid OrderItemRequest request) {
        Order order = orderRepository.findById(request.orderId()).orElse(null);
        if (order == null) {
            throw new IllegalArgumentException("주문을 찾을 수 없습니다. id=" + request.orderId());
        }

        Product product = productRepository.findById(request.productId()).orElse(null);
        if (product == null) {
            throw new IllegalArgumentException("상품을 찾을 수 없습니다. id=" + request.productId());
        }
        OrderItem orderItem = new OrderItem(order, product, product.getCategory(), product.getPrice(), request.quantity());
        return new OrderItemResponse(orderItemRepository.save(orderItem));
    }

    // 주문기준 아이템 목록 조회
    public List<OrderItemResponse> getOrderItemsByOrderId(int orderId) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order == null) {
            throw new IllegalArgumentException("주문을 찾을 수 없습니다. id=" + orderId);
        }

        return order.getOrderItems().stream()
                .map(OrderItemResponse::new)
                .collect(Collectors.toList());
    }

    //아이템 단건 조회
    public OrderItemResponse getOrderItem(int id) {
        return new OrderItemResponse(findOrderItemById(id));
    }

    //주문 조회
    private OrderItem findOrderItemById(int id) {
        OrderItem orderItem = orderItemRepository.findById(id).orElse(null);
        if (orderItem == null) {
            throw new IllegalArgumentException("주문 아이템을 찾을 수 없습니다. id=" + id);
        }
        return orderItem;
    }
}
