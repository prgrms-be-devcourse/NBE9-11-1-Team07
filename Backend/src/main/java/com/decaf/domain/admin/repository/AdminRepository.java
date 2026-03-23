package com.decaf.domain.admin.repository;

import com.decaf.domain.admin.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    Optional<Admin> findByEmail(String email); // name -> email
}
