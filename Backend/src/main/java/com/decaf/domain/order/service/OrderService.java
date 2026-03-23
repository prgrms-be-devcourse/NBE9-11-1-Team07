package com.decaf.domain.order.service;

import com.decaf.domain.order.dto.OrderCreateRequestDto;
import com.decaf.domain.order.dto.OrderResponseDto;
import com.decaf.domain.order.dto.OrderUpdateRequestDto;
import com.decaf.domain.order.entity.Order;
import com.decaf.domain.order.repository.OrderRepository;
import com.decaf.domain.orderItem.entity.OrderItem;
import com.decaf.domain.product.entity.Product;
import com.decaf.domain.product.repository.ProductRepository;
import com.decaf.domain.user.entity.User;
import com.decaf.domain.user.repository.UserRepository;
import com.decaf.domain.user.service.UserService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Getter
@Setter
public class OrderService {
    private final OrderRepository orderRepository;

    private final UserService userService;
    private final ProductRepository productRepository;

    @Transactional
    public Integer createOrder(OrderCreateRequestDto requestDto) {
        User user = userService.findOrCreateUser(
                requestDto.email(),
                requestDto.address(),
                requestDto.postcode()
        );
        Order order = new Order(
                user,
                requestDto.address(),
                requestDto.postcode()
        );

        // 중복 로직 ( 중복 상품들 합산)
        Map<Integer, Integer> productCounts = new HashMap<>();

        for (OrderCreateRequestDto.OrderItemDto item : requestDto.orderItems()) {
            Integer id = item.productId();
            int qty = item.quantity();

            if (productCounts.containsKey(id)) {
                // 상품 있으면 기존 수량에 더함
                productCounts.put(id, productCounts.get(id) + qty);
            } else {
                // new 상품 그냥 넣기
                productCounts.put(id, qty);
            }
        }

        for (Integer productId : productCounts.keySet()) { // 키만 꺼내서 반복문 돌기
            int totalQuantity = productCounts.get(productId);

            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품입니다. id=" + productId));

            OrderItem orderItem = new OrderItem(
                    order,
                    product,
                    product.getCategory(),
                    product.getPrice(),
                    totalQuantity // 총 수량
            );

            // 주문 넣기
            order.getOrderItems().add(orderItem);
        }

        Order savedOrder = orderRepository.save(order);
        return savedOrder.getId();
    }

    // 전체 주문 조회
    @Transactional(readOnly = true)
    public List<OrderResponseDto> findAllOrders() {
        List<Order> orders = orderRepository.findAll();

        // Entity -> Dto
        return orders.stream()
                .map(OrderResponseDto::new)
                .collect(Collectors.toList());
    }

    // 특정 고객 주문 조회
    @Transactional(readOnly = true)
    public List<OrderResponseDto> findOrdersByEmail(String email) {
        // 이메일 특정고객 주문 목록 가져오기
        List<Order> orders = orderRepository.findByUserEmail(email);

        return orders.stream()
                .map(OrderResponseDto::new)
                .collect(Collectors.toList());
    }

    // 주소, 우편번호 정보 수정
    @Transactional
    public OrderResponseDto updateOrder(Integer orderId, OrderUpdateRequestDto requestDto) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 주문입니다. id=" + orderId));
        if (!"ACCEPTED".equals(order.getOrderStatus())) {
            throw new IllegalStateException("이미 배송이 시작되어 주소를 변경할 수 없습니다.");
        }
        // 주문의 주소,우편번호 정보 변경
        order.updateDeliveryInfo(requestDto.address(), requestDto.postcode());
        return new OrderResponseDto(order);
    }

    // 주문 삭제
    @Transactional
    public void deleteOrder(Integer orderId) {
        // DB 확인
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 주문입니다. id=" + orderId));

        // 이미 배송이 출발했다면 삭제 막기
        if (!"ACCEPTED".equals(order.getOrderStatus())) {
            throw new IllegalStateException("이미 처리된 주문은 삭제할 수 없습니다.");
        }
        orderRepository.delete(order);
    }
}
