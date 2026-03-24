package com.decaf.domain.admin.controller;

import com.decaf.domain.admin.dto.AdminDto;
import com.decaf.domain.admin.entity.Admin;
import com.decaf.domain.admin.service.AdminService;
import com.decaf.domain.user.dto.request.LoginRequest;
import com.decaf.domain.user.dto.response.UserResponse;
import com.decaf.domain.user.entity.User; // [추가] User 엔티티 임포트 필수!
import com.decaf.domain.user.service.UserService;
import com.decaf.global.rs.RsData;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Tag(name = "AuthController", description = "auth API")
public class AuthController {

    private final AdminService adminService;

    // 현재 로그인된 사용자의 정보를 가져오는 API
    @Operation(summary="현재 로그인된 사용자의 정보를 가져오는 API")
    @GetMapping("/me")
    public RsData<AdminDto> me(HttpServletRequest request) {  // UserResponse → AdminDto
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("admin") == null) {  // "user" → "admin"
            return new RsData<>("로그인되지 않은 상태입니다.", "401-1", null);
        }
        Admin admin = (Admin) session.getAttribute("admin");  // User → Admin, "user" → "admin"
        return new RsData<>("로그인 정보 조회 성공", "200-1", new AdminDto(admin));
    }
    //로그인 실행 API
    @Operation(summary="로그인 실행 API")
    @PostMapping("/login")
    public RsData<AdminDto> login(@Valid @RequestBody LoginRequest request, HttpServletRequest httpServletRequest) {

        // [변경 전] User user = userService.authenticate(...);
        // [변경 후] AdminService를 통해 관리자 테이블에서 찾음
        Admin admin = adminService.authenticate(request.getEmail(), request.getPassword());

        // 세션에 저장할 때도 "admin"이라는 이름표를 붙여서 저장
        HttpSession session = httpServletRequest.getSession(true);
        session.setAttribute("admin", admin);

        return new RsData<>("관리자 로그인 성공", "200-1", new AdminDto(admin));
    }
    //로그아웃 API
    @Operation(summary="로그아웃 API")
    @PostMapping("/logout")
    public RsData<Void> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return new RsData<>("로그아웃 성공", "200-1", null);
    }
}