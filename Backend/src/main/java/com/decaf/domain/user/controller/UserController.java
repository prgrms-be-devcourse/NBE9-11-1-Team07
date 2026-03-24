package com.decaf.domain.user.controller;

import com.decaf.domain.user.dto.request.CreateUserRequest;
import com.decaf.domain.user.dto.request.UpdateUserRequest;
import com.decaf.domain.user.dto.response.UserResponse;
import com.decaf.domain.user.entity.User;
import com.decaf.domain.user.service.UserService;
import com.decaf.global.rs.RsData;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "UserController", description = "회원 API")
public class UserController {

    private final UserService userService;

    // 회원 등록
    @Operation(summary="회원 등록")
    @PostMapping
    public RsData<UserResponse> createUser(@RequestBody @Valid CreateUserRequest request) {
        User user = userService.createUser(request);
        return new RsData<>("회원 등록 성공", "201-1", UserResponse.from(user));
    }

    // 회원 다중 조회
    @Operation(summary="전체 회원 조회")
    @GetMapping
    public RsData<List<UserResponse>> getUsers() {
        List<UserResponse> users = userService.getAllUsers()
                .stream()
                .map(UserResponse::from)
                .toList();
        return new RsData<>("조회 성공", "200-1", users);
    }

    // 회원 단일 조회
    @Operation(summary="특정 회원 조회")
    @GetMapping("/{id}")
    public RsData<UserResponse> getUser(@PathVariable Integer id) {
        User user = userService.findById(id);
        return new RsData<>("조회 성공", "200-1", UserResponse.from(user));
    }

    // 회원 수정
    @Operation(summary="회원 수정")
    @PutMapping("/{id}")
    public RsData<UserResponse> updateUser(
            @PathVariable Integer id,
            @RequestBody @Valid UpdateUserRequest request
    ) {
        User user = userService.updateUser(id, request);
        return new RsData<>("수정 성공", "200-1", UserResponse.from(user));
    }

    // 회원 삭제
    @Operation(summary="회원 삭제")
    @DeleteMapping("/{id}")
    public RsData<Void> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return new RsData<>("삭제 성공", "204-1");
    }
}
