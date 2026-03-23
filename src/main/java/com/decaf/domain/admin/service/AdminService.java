package com.decaf.domain.admin.service;


import com.decaf.domain.admin.entity.Admin;
import com.decaf.domain.admin.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
<<<<<<< HEAD
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
=======
>>>>>>> 53a18a7687e4cf46349ee2db444224d51e9d0318
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
<<<<<<< HEAD
public class AdminService implements UserDetailsService {

  private final AdminRepository adminRepository;

  @Transactional
  public Admin create(String name, String password) {
    adminRepository.findByName(name).ifPresent(admin ->{
      throw new IllegalArgumentException("이미 존재하는 관리자 입니다.");
    });
    Admin admin = new Admin();
    admin.setName(name);
    admin.setPassword(password);
    //권한 구분
    if(name.endsWith("@decaf.com")){
      admin.setRole("ROLE_ADMIN");
    }
    else{
      admin.setRole("ROLE_USER");
    }

=======
public class AdminService {

  private final AdminRepository adminRepository;

  public Admin create(String name, String password) {
    Admin admin = new Admin();
    admin.setName(name);
    admin.setPassword(password);
>>>>>>> 53a18a7687e4cf46349ee2db444224d51e9d0318
    this.adminRepository.save(admin);
    return admin;
  }

<<<<<<< HEAD
  // 로그인 시 시큐리티가 호출하는 메서드
  @Override
  public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
    Admin admin = adminRepository.findByName(name)
            .orElseThrow(() -> new UsernameNotFoundException("관리자를 찾을 수 없습니다: " + name));

    String roleName = admin.getRole().replace("ROLE_","");
    return User.builder()
            .username(admin.getName())
            .password("{noop}" + admin.getPassword()) // {noop}은 암호화 안 된 비번임을 알림
            .roles("ADMIN") // 자동으로 ROLE_ADMIN으로 인식됨
            .build();
  }
=======
>>>>>>> 53a18a7687e4cf46349ee2db444224d51e9d0318
}
