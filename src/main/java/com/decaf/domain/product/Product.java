package com.decaf.domain.product;

import com.decaf.global.entity.BaseEntity;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // JPA 기본 생성자
public class Product extends BaseEntity {

    private String name;
    private Integer price;

    @Builder
    public Product(String name, Integer price) {
        this.name = name;
        this.price = price;
    }

    // 수정 메서드 (PUT 기능에서 사용)
    public void update(String name, Integer price) {
        this.name = name;
        this.price = price;
    }
}