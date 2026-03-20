package com.decaf.domain.order.dto;

import java.util.List;

public record OrderCreateRequestDto(
        Long userId,
        String address,
        String postcode,
        List<OrderItemDto> orderItems
) {
    public record OrderItemDto(
            Long productId,
            int quantity
    ) {}
}