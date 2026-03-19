package com.decaf.domain.order;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class OrderController {

    private final OrderService orderService;
    @PostMapping("/orders")
    public ResponseEntity<Integer> createOrder(@RequestBody OrderCreateRequestDto requestDto) {

        // service
        Integer orderId = orderService.createOrder(requestDto);
        return ResponseEntity.ok(orderId);
    }
}

