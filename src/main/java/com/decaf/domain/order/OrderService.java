package com.decaf.domain.order;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Getter
@Setter
public class OrderService {
    private final OrderRepository orderRepository;

    @Transactional
    public Integer createOrder(OrderCreateRequestDto requestDto) {
        Order order = new Order(
                requestDto.getEmail(),
                requestDto.getAddress(),
                requestDto.getZipCode()
        );

        Order savedOrder = orderRepository.save(order);
        return savedOrder.getId();
    }
}
