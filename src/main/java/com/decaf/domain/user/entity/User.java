package com.decaf.domain.user.entity;

import com.decaf.domain.order.entity.Order;
import com.decaf.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@Table(name = "users")
@NoArgsConstructor
public class User extends BaseEntity {

    // id, createDate, modifyDate는 BaseEntity에서 상속

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 200)
    private String address;

    @Column(nullable = false, length = 10)
    private String postcode;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> orders = new ArrayList<>();

    public User(String email, String address, String postcode) {
        this.email = email;
        this.address = address;
        this.postcode = postcode;
    }

    public void update(String address, String postcode) {
        this.address = address;
        this.postcode = postcode;
    }
}
