package com.decaf.domain.order;

import com.decaf.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "orders")
public class Order extends BaseEntity {

    //User
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;

    //OrderItem
//    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
//    private List<OrderItem> orderItems = new ArrayList<>();


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
