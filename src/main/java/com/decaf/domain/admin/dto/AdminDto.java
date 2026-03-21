package com.decaf.domain.admin.dto;

import com.decaf.domain.admin.entity.Admin;

import java.time.LocalDateTime;

public record AdminDto (
    int id,
    String name,
    String password,
    String role,
    LocalDateTime createDate,
    LocalDateTime modifyDate
){

  public AdminDto(Admin admin) {
    this(
        admin.getId(),
        admin.getName(),
        admin.getPassword(),
        admin.getRole(),
        admin.getCreateDate(),
        admin.getModifyDate()
    );
  }
}
