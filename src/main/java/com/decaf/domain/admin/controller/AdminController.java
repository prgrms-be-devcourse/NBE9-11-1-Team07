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
  public RsData<AdminDto> create(@RequestBody @Valid AdminDto adminDto) {
   Admin admin = adminService.create(adminDto.name(),adminDto.password());

    return new RsData<>(
        "관리자 회원가입이 완료되었습니다",
        "201-1",
        new AdminDto(admin)
    );
  }

}
