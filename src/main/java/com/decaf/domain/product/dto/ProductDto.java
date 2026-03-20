package com.decaf.domain.product.dto;

import com.decaf.domain.product.entity.Product;

public record ProductDto(
    Integer id,
    String name,
    String category,
    int price,
    String description
) {
  public ProductDto(Product product) {
    this(
        product.getId(),
        product.getName(),
        product.getCategory(),
        product.getPrice(),
        product.getDescription());
  }
}