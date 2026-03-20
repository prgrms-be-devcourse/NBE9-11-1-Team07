package com.decaf.domain.user.dto.request;

public record UpdateUserRequest(
    String address,
    String postcode
) {}
