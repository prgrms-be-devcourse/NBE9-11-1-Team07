package com.decaf.domain.user.dto.request;

import jakarta.validation.constraints.NotBlank;

public record UpdateUserRequest(
        @NotBlank String address,
        @NotBlank String postcode
) {}
