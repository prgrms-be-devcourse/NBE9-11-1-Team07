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

    // private final UserRepository userRepository;

    @Transactional
    public Integer createOrder(OrderCreateRequestDto requestDto) {
        // User user = userRepository.findById(requestDto.userId())
        Order order = new Order(
                //user,
                requestDto.address(),
                requestDto.postcode()
        );

        Order savedOrder = orderRepository.save(order);
        return savedOrder.getId();
    }
}
