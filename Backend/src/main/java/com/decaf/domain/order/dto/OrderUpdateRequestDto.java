package com.decaf.domain.order.dto;

import jakarta.validation.constraints.NotBlank;

public record OrderUpdateRequestDto(
        @NotBlank(message = "변경할 주소를 입력해주세요.")
        String address,

        @NotBlank(message = "변경할 우편번호를 입력해주세요.")
        String postcode
) {
}