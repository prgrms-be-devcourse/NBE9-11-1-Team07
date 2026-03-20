package com.decaf.domain.admin.service;


import com.decaf.domain.admin.entity.Admin;
import com.decaf.domain.admin.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminService {

  private final AdminRepository adminRepository;

  public Admin create(String name, String password) {
    Admin admin = new Admin();
    admin.setName(name);
    admin.setPassword(password);
    this.adminRepository.save(admin);
    return admin;
  }

}
