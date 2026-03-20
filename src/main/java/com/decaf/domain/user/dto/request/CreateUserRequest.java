package com.decaf.domain.user.dto.request;

public record CreateUserRequest(
    String email,
    String address,
    String postcode
) {}
