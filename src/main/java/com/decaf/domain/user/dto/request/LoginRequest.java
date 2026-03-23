package com.decaf.domain.user.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

// LoginRequest.java
@Getter // [추가] 컨트롤러에서 getEmail()을 쓸 수 있게 함
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    @NotBlank(message = "이메일은 필수입니다.")
    private String email;

    @NotBlank(message = "비밀번호는 필수입니다.")
    private String password;
}