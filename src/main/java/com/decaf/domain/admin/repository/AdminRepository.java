package com.decaf.domain.admin.repository;

import com.decaf.domain.admin.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD
import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin,Integer> {
    //로그인 : 이름으로 DB에서 관리자 찾기
    Optional<Admin> findByName(String name);
=======

public interface AdminRepository extends JpaRepository<Admin,Integer> {
>>>>>>> 53a18a7687e4cf46349ee2db444224d51e9d0318
}
