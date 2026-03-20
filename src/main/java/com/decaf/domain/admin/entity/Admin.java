package com.decaf.domain.admin.entity;

import com.decaf.global.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "admin")
public class Admin extends BaseEntity {
  @Column(nullable = false, length = 100)
  private String name;

  @Column(nullable = false, length = 100)
  private String password;

  @Column(nullable = false, length = 50)
  private String role;
}
