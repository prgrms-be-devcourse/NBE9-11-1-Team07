package com.decaf.domain.product.entity;

import com.decaf.domain.orderItem.entity.OrderItem;
import com.decaf.global.entity.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

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

  @Column(nullable = false, length = 512)
  private String imgUrl;

  @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE, orphanRemoval = true)
  private List<OrderItem> orderItems = new ArrayList<>();

  // 이 메서드를 통해 Service에서 수정가능 + JPA에 더티체킹
  public void update(String name, String category, Integer price, String description,String imgUrl) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.description = description;
    this.imgUrl = imgUrl;

  }

  public Product(String name, String category, Integer price, String description, String imgUrl) {
    this.name = name;
    this.category = category;
    this.price = price;
    this.description = description;
    this.imgUrl = imgUrl;
    this.orderItems = new ArrayList<>();
  }

}
