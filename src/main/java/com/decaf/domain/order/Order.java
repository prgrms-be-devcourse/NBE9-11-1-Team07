package com.decaf.domain.order;

import com.decaf.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "orders")
public class Order extends BaseEntity {

    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private String zipCode;

    public Order(String email, String address, String zipCode) {
        this.email = email;
        this.address = address;
        this.zipCode = zipCode;
    }

    private int totalPrice;
}
