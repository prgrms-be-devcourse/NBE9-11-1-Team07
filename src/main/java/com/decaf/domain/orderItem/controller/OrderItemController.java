package com.decaf.domain.orderItem.controller;

import com.decaf.domain.orderItem.dto.OrderItemRequest;
import com.decaf.domain.orderItem.dto.OrderItemResponse;
import com.decaf.domain.orderItem.service.OrderItemService;
import com.decaf.global.rs.RsData;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class OrderItemController {
    private final OrderItemService orderItemService;

    // 주문아이템 생성
    @PostMapping("/orderItems")
    public RsData<OrderItemResponse> createOrderItem(
            @Valid @RequestBody OrderItemRequest request) {
        return new RsData<>("주문 아이템이 추가되었습니다.", "201-1",
                orderItemService.createOrderItem(request));
    }

    // 주문기준조회
    @GetMapping("/orders/{orderId}/items")
    public RsData<List<OrderItemResponse>> getOrderItems(@PathVariable int orderId) {
        return new RsData<>("주문 아이템 목록 조회 성공", "200-1",
                orderItemService.getOrderItemsByOrderId(orderId));
    }

    //아이템기준 조회
    @GetMapping("/orderItems/{id}")
    public RsData<OrderItemResponse> getOrderItem(@PathVariable int id) {
        return new RsData<>("주문 아이템 조회 성공", "200-1",
                orderItemService.getOrderItem(id));
    }

}
