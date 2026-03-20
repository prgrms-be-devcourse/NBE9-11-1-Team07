package com.decaf.domain.product.entity;

import com.decaf.global.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Product extends BaseEntity {

  @Column(nullable = false, length = 100)
  private String name;

  @Column(nullable = false, length = 50)
  private String category;

  @Column(nullable = false)
  private Integer price;

  @Column(columnDefinition = "TEXT")
  private String description;

  public void update(String name, Integer price) {
    this.name = name;
    this.price = price;
  }

}
