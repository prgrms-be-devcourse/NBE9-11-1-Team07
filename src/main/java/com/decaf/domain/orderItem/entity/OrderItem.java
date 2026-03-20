package com.decaf.domain.orderItem.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "order_id", nullable = false)
//    private Order order;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "product_id", nullable = false)
//    private Product product;

    @Column(length = 50,nullable = false)
    private String category;

    @Column(nullable = false)
    private int price;

    @Column(nullable = false)
    private int quantity;

    private LocalDateTime createdAt;

//    public OrderItem(Order orderId, Product productId ,String category, int price, int quantity) {
//        this.orderId = orderId;
//        this.productId = productId;
//        this.category = category;
//        this.price = price;
//        this.quantity = quantity;
//        this.createdAt = LocalDateTime.now();
//    }
}
