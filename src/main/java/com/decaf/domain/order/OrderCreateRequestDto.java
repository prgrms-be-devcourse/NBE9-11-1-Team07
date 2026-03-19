package com.decaf.domain.order;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class OrderCreateRequestDto {

    private String email;
    private String address;
    private String zipCode;

    private List<OrderItemDto> orderItems;

    @Getter
    @Setter
    public static class OrderItemDto {
        private Long productId;
        private int quantity;
    }
}
