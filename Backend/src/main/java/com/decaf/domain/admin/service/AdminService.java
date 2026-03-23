package com.decaf.domain.admin.service;


import com.decaf.domain.admin.entity.Admin;
import com.decaf.domain.admin.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminService implements UserDetailsService {

  private final AdminRepository adminRepository;

  @Transactional
  public Admin create(String email, String password) {
    adminRepository.findByEmail(email).ifPresent(admin -> {
      throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
    });
    Admin admin = new Admin();
    admin.setEmail(email);
    admin.setPassword(password);
    //권한 구분
    if(email.endsWith("@decaf.com")){
      admin.setRole("ROLE_ADMIN");
    }
    else{
      admin.setRole("ROLE_USER");
    }
    this.adminRepository.save(admin);
    return admin;
  }

  // 로그인 시 시큐리티가 호출하는 메서드
  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    Admin admin = adminRepository.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + email));

    return User.builder()
        .username(admin.getEmail()) // 사용자 식별값으로 이메일 사용
        .password("{noop}" + admin.getPassword())
        .roles(admin.getRole().replace("ROLE_", ""))
        .build();
  }
  // == 로그인 로직 ==
  public Admin authenticate(String email, String password) {
    Admin admin = adminRepository.findByEmail(email)
            .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 관리자입니다."));

    // 현재는 단순 비교 (나중에 BCryptPasswordEncoder 권장)
    if (!admin.getPassword().equals(password)) {
      throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
    }
    return admin;
  }
}
