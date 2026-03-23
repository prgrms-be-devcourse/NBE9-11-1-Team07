package com.decaf.domain.admin.controller;

import com.decaf.domain.admin.dto.AdminDto;
import com.decaf.domain.admin.entity.Admin;
import com.decaf.domain.admin.service.AdminService;
import com.decaf.domain.product.dto.ProductDto;
import com.decaf.domain.product.entity.Product;
import com.decaf.domain.product.service.ProductService;
import com.decaf.global.rs.RsData;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AdminController {

  private final AdminService adminService;

    @PostMapping("/signup")
    public RsData<AdminDto> signup(@RequestBody AdminDto adminDto) {
        // 1. 가입 처리 (우리가 만든 도메인 체크 로직 실행)
        Admin admin = adminService.create(adminDto.name(), adminDto.password());

        // 2. 권한에 따라 메시지 결정
        String message = admin.getRole().equals("ROLE_ADMIN")
                ? "관리자 회원가입이 완료되었습니다."
                : "일반 회원가입이 완료되었습니다.";

        // 3. 결정된 메시지로 응답 반환
        return new RsData<>(message, "201-1", new AdminDto(admin));
    }

}
