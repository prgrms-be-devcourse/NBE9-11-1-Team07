package com.decaf.domain.order.service;

import com.decaf.domain.order.dto.OrderCreateRequestDto;
import com.decaf.domain.order.entity.Order;
import com.decaf.domain.order.repository.OrderRepository;
import com.decaf.domain.orderItem.entity.OrderItem;
import com.decaf.domain.product.entity.Product;
import com.decaf.domain.product.repository.ProductRepository;
import com.decaf.domain.user.entity.User;
import com.decaf.domain.user.repository.UserRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Getter
@Setter
public class OrderService {
    private final OrderRepository orderRepository;

    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Transactional
    public Integer createOrder(OrderCreateRequestDto requestDto) {
        User user = userRepository.findByEmail(requestDto.email())
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setEmail(requestDto.email());
                    newUser.setAddress(requestDto.address());
                    newUser.setPostcode(requestDto.postcode());
                    return userRepository.save(newUser);
                });
        Order order = new Order(
                user,
                requestDto.address(),
                requestDto.postcode()
        );

        // 중복 로직 ( 중복 상품들 합산)
        Map<Integer, Integer> productCounts = new HashMap<>();

        for (OrderCreateRequestDto.OrderItemDto item : requestDto.orderItems()) {
            Integer id = item.productId();
            int qty = item.quantity();

            if (productCounts.containsKey(id)) {
                // 상품 있으면 기존 수량에 더함
                productCounts.put(id, productCounts.get(id) + qty);
            } else {
                // new 상품 그냥 넣기
                productCounts.put(id, qty);
            }
        }

        for (Integer productId : productCounts.keySet()) { // 키만 꺼내서 반복문 돌기
            int totalQuantity = productCounts.get(productId);

            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품입니다. id=" + productId));

            OrderItem orderItem = new OrderItem(
                    order,
                    product,
                    product.getCategory(),
                    product.getPrice(),
                    totalQuantity // 총 수량
            );

            // 주문 넣기
            order.getOrderItems().add(orderItem);
        }

        Order savedOrder = orderRepository.save(order);
        return savedOrder.getId();
    }
}
