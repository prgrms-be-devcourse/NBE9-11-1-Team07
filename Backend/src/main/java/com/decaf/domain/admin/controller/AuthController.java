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
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @PostMapping("/login")
    public RsData<AdminDto> login(@Valid @RequestBody LoginRequest request, HttpServletRequest httpServletRequest) {

        Admin admin = adminService.authenticate(request.getEmail(), request.getPassword());

        // Spring Security Context에 인증 정보 등록
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                admin.getEmail(),
                null,
                List.of(new SimpleGrantedAuthority(admin.getRole())) // "ROLE_ADMIN" 이 저장되어 있어야 함
        );

        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(authentication);
        SecurityContextHolder.setContext(securityContext);

        // 세션에 SecurityContext 저장 (이게 없으면 다음 요청에서 인증이 사라짐)
        HttpSession session = httpServletRequest.getSession(true);
        session.setAttribute(
                HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                securityContext
        );
        session.setAttribute("admin", admin); // 기존 코드 유지

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