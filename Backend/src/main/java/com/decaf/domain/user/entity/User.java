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

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, length = 50)
    private String role;

    @Column(nullable = false, length = 200)
    private String address;

    @Column(nullable = false, length = 10)
    private String postcode;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Order> orders = new ArrayList<>();

    // 6개 인자를 받는 생성자 (UserService와 일치시킴)
    public User(String email, String name, String password, String role, String address, String postcode) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.role = role;
        this.address = address;
        this.postcode = postcode;
    }

    public void update(String address, String postcode) {
        this.address = address;
        this.postcode = postcode;
    }
}