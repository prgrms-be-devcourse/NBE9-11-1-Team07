package com.decaf.domain.order.service;

import com.decaf.domain.order.dto.OrderCreateRequestDto;
import com.decaf.domain.order.entity.Order;
import com.decaf.domain.order.repository.OrderRepository;
import com.decaf.domain.orderItem.entity.OrderItem;
import com.decaf.domain.product.entity.Product;
import com.decaf.domain.product.repository.ProductRepository;
import com.decaf.domain.user.entity.User;
import com.decaf.domain.user.repository.UserRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Getter
@Setter
public class OrderService {
    private final OrderRepository orderRepository;

    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Transactional
    public Integer createOrder(OrderCreateRequestDto requestDto) {
        User user = userRepository.findById(requestDto.userId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다. id=" + requestDto.userId()));
        Order order = new Order(
                user,
                requestDto.address(),
                requestDto.postcode()
        );
        for (OrderCreateRequestDto.OrderItemDto itemDto : requestDto.orderItems()) {

            // 상품 찾기
            Product product = productRepository.findById(itemDto.productId())
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품입니다. id=" + itemDto.productId()));

            // 주문상품 만들기
            OrderItem orderItem = new OrderItem(
                    order,
                    product,
                    product.getCategory(),
                    product.getPrice(),
                    itemDto.quantity()
            );

            // 주문 넣기
            order.getOrderItems().add(orderItem);
        }

        Order savedOrder = orderRepository.save(order);
        return savedOrder.getId();
    }
}
