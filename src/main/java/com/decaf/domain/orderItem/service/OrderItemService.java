package com.decaf.domain.orderItem.service;


import com.decaf.domain.orderItem.entity.OrderItem;
import com.decaf.domain.orderItem.repository.OrderItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;

    public List<OrderItem> findAll() {
        return orderItemRepository.findAll();
    }

    public Optional<OrderItem> findById(int id) {
        return orderItemRepository.findById(id);
    }

    public void deleteById(int id) {
        orderItemRepository.deleteById(id);
    }

}
