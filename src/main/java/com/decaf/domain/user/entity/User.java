package com.decaf.domain.user.entity;

import com.decaf.domain.order.entity.Order;
import com.decaf.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User extends BaseEntity {

    // id, createDate, modifyDate는 BaseEntity에서 상속

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 200)
    private String address;

    @Column(nullable = false, length = 10)
    private String postcode;

    // TODO: Order 외래키
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> orders = new ArrayList<>();
}
