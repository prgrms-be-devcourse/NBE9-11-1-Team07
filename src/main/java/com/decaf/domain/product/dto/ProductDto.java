package com.decaf.domain.product.dto;

import com.decaf.domain.product.entity.Product;

import java.time.LocalDateTime;

public record ProductDto(
    long id,
    String name,
    String category,
    int price,
    String description,
    LocalDateTime createDate,
    LocalDateTime modifyDate
) {
  public ProductDto(Product product) {
    this(
        product.getId(),
        product.getName(),
        product.getCategory(),
        product.getPrice(),
        product.getDescription(),
        product.getCreateDate(),
        product.getModifyDate());
  }
}