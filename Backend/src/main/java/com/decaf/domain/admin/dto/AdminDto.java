package com.decaf.domain.admin.dto;

import com.decaf.domain.admin.entity.Admin;

import java.time.LocalDateTime;

public record AdminDto (
    Integer id,
    String email,
    String password,
    String role,
    LocalDateTime createDate,
    LocalDateTime modifyDate
){

  public AdminDto(Admin admin) {
    this(
        admin.getId(),
        admin.getEmail(),
        admin.getPassword(),
        admin.getRole(),
        admin.getCreateDate(),
        admin.getModifyDate()
    );
  }
}
