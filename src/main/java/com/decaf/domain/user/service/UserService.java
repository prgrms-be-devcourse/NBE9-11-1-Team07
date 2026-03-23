package com.decaf.domain.user.service;

// UserService.java

import com.decaf.domain.user.dto.request.CreateUserRequest;
import com.decaf.domain.user.dto.request.UpdateUserRequest;
import com.decaf.domain.user.entity.User;
import com.decaf.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    //이메일만으로 유저찾기 혹은 만드는 로직
    @Transactional
    public User findOrCreateUser(String email, String address, String postcode) {
        return userRepository.findByEmail(email)
                .orElseGet(() -> createNewUser(email, address, postcode));
    }

    // 신규 유저 생성
    private User createNewUser(String email, String address, String postcode) {
        // 이름: 이메일앞부분, 비번: 1234, 권한: ROLE_USER로 기본값 설정
        User user = new User(email, email.split("@")[0], "1234", "ROLE_USER", address, postcode);
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User findById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
    }

    // [수정] createUser 메서드도 변경된 생성자 인자에 맞게 수정
    public User createUser(CreateUserRequest request) {
        validateEmail(request.email());
        User user = new User(request.email(), request.email().split("@")[0], "1234", "ROLE_USER", request.address(), request.postcode());
        return userRepository.save(user);
    }

    @Transactional
    public User updateUser(Integer id, UpdateUserRequest request) {
        User user = findById(id);
        user.update(request.address(), request.postcode());
        return user;
    }

    public void deleteUser(Integer id) {
        User user = findById(id);
        userRepository.delete(user);
    }

    private void validateEmail(String email) {
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("이메일은 필수입니다.");
        }
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        if (!email.matches(emailRegex)) {
            throw new IllegalArgumentException("유효하지 않은 이메일 형식입니다.");
        }
    }

    // == 로그인 로직 ==
    public User authenticate(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 사용자입니다."));


        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        return user;
    }
}