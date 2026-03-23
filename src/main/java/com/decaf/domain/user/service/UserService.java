package com.decaf.domain.user.service;

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

    public User findOrCreateUser(String email, String address, String postcode) {
        return userRepository.findByEmail(email)
                .orElseGet(() -> createNewUser(email, address, postcode));
    }

    private User createNewUser(String email, String address, String postcode) {
        User user = new User(email, address, postcode);
        return userRepository.save(user);
    }

    // === 관리자용 메서드 ===
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User findById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
    }

    public User createUser(CreateUserRequest request) {
        validateEmail(request.email());

        User user = new User(request.email(), request.address(), request.postcode());
        return userRepository.save(user);
    }

    @Transactional
    public User updateUser(Integer id, UpdateUserRequest request) {
        User user = findById(id);
        user.update(request.address(), request.postcode());
        return user;  // JPA 더티체킹으로 자동 저장
    }

    public void deleteUser(Integer id) {
        User user = findById(id);
        userRepository.delete(user);
    }

    // === 검증 로직 ===
    private void validateEmail(String email) {
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("이메일은 필수입니다.");
        }

        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        if (!email.matches(emailRegex)) {
            throw new IllegalArgumentException("유효하지 않은 이메일 형식입니다.");
        }

        if (email.length() > 100) {
            throw new IllegalArgumentException("이메일은 100자를 초과할 수 없습니다.");
        }
    }
}
