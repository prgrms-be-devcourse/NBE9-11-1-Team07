package com.decaf.domain.order.dto;

import com.decaf.domain.order.entity.Order;
// 💡 재현 님이 만들어두신 DTO를 불러옵니다!
import com.decaf.domain.orderItem.dto.OrderItemResponse;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public record OrderResponseDto(
        Integer orderId,
        String email,
        String address,
        String postcode,
        String orderStatus,
        LocalDateTime createDate,
        LocalDate shippingStartDate,
        List<OrderItemResponse> orderItems,
        int totalOrderPrice
) {
    // Entity를 받아서 DTO로 변환하는 생성자
    public OrderResponseDto(Order order) {
        this(
                order.getId(),
                order.getUser().getEmail(),
                order.getAddress(),
                order.getPostcode(),
                order.getOrderStatus(),
                order.getCreateDate(),
                order.getShippingStartDate(),

                // 주문에 딸려있는 상품들을 OrderItemResponse로 변환후 리스트로
                order.getOrderItems().stream()
                        .map(OrderItemResponse::new)
                        .collect(Collectors.toList()),

                // 총 결제 금액 계산: (각 상품 가격 * 수량)을 모두 더함
                order.getOrderItems().stream()
                        .mapToInt(item -> (int) item.getPrice() * item.getQuantity())
                        .sum()
        );
    }
}