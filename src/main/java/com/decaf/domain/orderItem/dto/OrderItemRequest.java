package com.decaf.domain.orderItem.dto;

import jakarta.validation.constraints.NotNull;

public record OrderItemRequest(
        @NotNull(message = "주문 ID는 필수입니다.")
        int orderId,

        @NotNull(message = "상품 ID는 필수입니다.")
        int productId,

        @NotNull(message = "수량은 필수입니다.")
        int quantity
) {

}