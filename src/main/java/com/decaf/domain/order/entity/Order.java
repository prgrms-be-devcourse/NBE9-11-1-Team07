package com.decaf.domain.order.entity;

import com.decaf.domain.orderItem.entity.OrderItem;
import com.decaf.global.entity.BaseEntity;
// import com.decaf.domain.user.Customer;
// import com.decaf.domain.orderitem.OrderItem;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "orders")
public class Order extends BaseEntity {


    //User
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;

    @Column(nullable = false, length = 200)
    private String address;

    @Column(nullable = false, length = 10)
    private String postcode;

    @Column(name = "order_status", nullable = false, length = 50)
    private String orderStatus;

    //OrderItem
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems = new ArrayList<>();


    public Order(/*User user*/ String address, String postcode) {
        //this.user = user;
        this.address = address;
        this.postcode = postcode;
        this.orderStatus = "ACCEPTED";
    }
}
