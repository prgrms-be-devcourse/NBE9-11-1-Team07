package com.decaf.domain.order.dto;

import java.util.List;

public record OrderCreateRequestDto(
        Integer userId,  // Userid
        String address,
        String postcode,
        List<OrderItemDto> orderItems
) {
    public record OrderItemDto(
            Integer productId,    //  상품 ID
            int quantity  // 상품 수량
    ) {}
}