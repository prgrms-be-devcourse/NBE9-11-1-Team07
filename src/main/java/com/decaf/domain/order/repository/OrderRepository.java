package com.decaf.domain.order.repository;

import com.decaf.domain.order.entity.Order;
import com.decaf.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUserEmail(String email);
}

