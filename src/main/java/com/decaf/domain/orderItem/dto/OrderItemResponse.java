package com.decaf.domain.orderItem.dto;

import java.time.LocalDateTime;

public record OrderItemResponse(
        long id,
        long orderId,
        long productId,
        String productName,
        String category,
        int price,
        int quantity,
        int totalPrice,
        LocalDateTime createdAt
) {
//    public OrderItemResponse(OrderItem item) {
//        this(
//                item.getId(),
//                item.getOrder().getId(),
//                item.getProduct().getId(),
//                item.getProduct().getName(),
//                item.getCategory(),
//                item.getPrice(),
//                item.getQuantity(),
//                item.getPrice() * item.getQuantity(),
//                item.getCreatedAt()
//        );
//    }
}
