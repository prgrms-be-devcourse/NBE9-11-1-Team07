package com.decaf.domain.admin.repository;

import com.decaf.domain.admin.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin,Integer> {
    //로그인 : 이름으로 DB에서 관리자 찾기
    Optional<Admin> findByName(String name);
}
