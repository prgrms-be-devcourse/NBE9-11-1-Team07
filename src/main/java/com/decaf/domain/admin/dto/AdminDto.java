package com.decaf.domain.admin.dto;

import com.decaf.domain.admin.entity.Admin;

import java.time.LocalDateTime;

public record AdminDto (
<<<<<<< HEAD
    Integer id,
=======
    int id,
>>>>>>> 53a18a7687e4cf46349ee2db444224d51e9d0318
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
