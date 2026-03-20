package com.decaf.domain.orderItem.controller;

import com.decaf.domain.orderItem.service.OrderItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class OrderItemController {
    private final OrderItemService orderItemService;

}
