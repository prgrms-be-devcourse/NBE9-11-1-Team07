package com.decaf.domain.product;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProductUpdateDto {
    private String name;
    private Integer price;
}