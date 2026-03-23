package com.decaf.domain.user.controller;

import com.decaf.domain.user.dto.request.LoginRequest;
import com.decaf.domain.user.dto.response.UserResponse;
import com.decaf.domain.user.entity.User; // [추가] User 엔티티 임포트 필수!
import com.decaf.domain.user.service.UserService;
import com.decaf.global.rs.RsData;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    // 현재 로그인된 사용자의 정보를 가져오는 API
    @GetMapping("/me")
    public RsData<UserResponse> me(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            return new RsData<>("401-1", "로그인되지 않은 상태입니다.", null);
        }
        User user = (User) session.getAttribute("user");
        return new RsData<>("200-1", "로그인 정보 조회 성공", UserResponse.from(user));
    }
    //로그인 실행 API
    @PostMapping("/login")
    public RsData<UserResponse> login(@Valid @RequestBody LoginRequest request, HttpServletRequest httpServletRequest) {
        // [수정] 이메일 로그인이므로 request.getEmail() 사용
        User user = userService.authenticate(request.getEmail(), request.getPassword());

        // 2. 세션 수동 생성
        HttpSession session = httpServletRequest.getSession(true);
        session.setAttribute("user", user);

        return new RsData<>("200-1", "로그인 성공", UserResponse.from(user));
    }
    //로그아웃 API
    @PostMapping("/logout")
    public RsData<Void> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return new RsData<>("200-1", "로그아웃 성공", null);
    }
}