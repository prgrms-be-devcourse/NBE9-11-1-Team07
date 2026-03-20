package com.decaf.domain.user.controller;

import com.decaf.domain.user.dto.request.CreateUserRequest;
import com.decaf.domain.user.dto.request.UpdateUserRequest;
import com.decaf.domain.user.dto.response.UserResponse;
import com.decaf.domain.user.entity.User;
import com.decaf.domain.user.service.UserService;
import com.decaf.global.rs.RsData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 회원 등록
    public RsData<UserResponse> createUser(@RequestBody CreateUserRequest request) {
        User user = userService.createUser(request);
        return new RsData<>("회원 등록 성공", "201-1", UserResponse.from(user));
    }

    // 회원 다중 조회
    @GetMapping
    public ResponseEntity<List<UserResponse>> getUsers() {
        List<UserResponse> users = userService.getAllUsers()
                .stream()
                .map(UserResponse::from)
                .toList();
        return ResponseEntity.ok(users);
    }

    // 회원 단일 조회
    @GetMapping("/{id}")
    public RsData<UserResponse> getUser(@PathVariable Integer id) {
        User user = userService.findById(id);
        return new RsData<>("조회 성공", "200-1", UserResponse.from(user));
    }

    // 회원 수정
    @PutMapping("/{id}")
    public RsData<UserResponse> updateUser(
            @PathVariable Integer id,
            @RequestBody UpdateUserRequest request
    ) {
        User user = userService.updateUser(id, request);
        return new RsData<>("수정 성공", "200-1", UserResponse.from(user));
    }

    // 회원 삭제
    @DeleteMapping("/{id}")
    public RsData<Void> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return new RsData<>("삭제 성공", "204-1");
    }
}
