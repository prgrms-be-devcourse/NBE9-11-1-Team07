package com.decaf.domain.user.dto.response;

import com.decaf.domain.user.entity.User;

import java.time.LocalDateTime;

public record UserResponse(
        Integer id,
        String email,
        String address,
        String postcode,
        LocalDateTime createDate,
        LocalDateTime modifyDate
) {
    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getAddress(),
                user.getPostcode(),
                user.getCreateDate(),
                user.getModifyDate()
        );
    }
}
