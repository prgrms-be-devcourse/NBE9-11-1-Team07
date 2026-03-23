package com.decaf.domain.order.dto;

import com.decaf.domain.order.entity.Order;
import java.time.LocalDateTime;

public record OrderResponseDto(
        Integer orderId,
        String email,
        String address,
        String postcode,
        String orderStatus,
        LocalDateTime createDate
) {
    // Entity를 받아서 DTO로 변환하는 생성자
    public OrderResponseDto(Order order) {
        this(
                order.getId(),
                order.getUser().getEmail(),
                order.getAddress(),
                order.getPostcode(),
                order.getOrderStatus(),
                order.getCreateDate()
        );
    }
}