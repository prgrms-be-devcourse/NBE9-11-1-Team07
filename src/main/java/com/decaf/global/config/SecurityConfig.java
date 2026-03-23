package com.decaf.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf(AbstractHttpConfigurer::disable) // 테스트를 위해 CSRF 비활성화
        .headers(headers -> headers
            .addHeaderWriter(new XFrameOptionsHeaderWriter(
                XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN))) // H2 콘솔 프레임 허용
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/h2-console/**").permitAll() // H2 콘솔 허용
//            .requestMatchers("/api/products/admin/**").hasRole("ADMIN")
            .anyRequest().permitAll() // 모든 API 요청 허용 (테스트용)
        )
        // < -- 로그인 설정 -- >
        .formLogin(form -> form
                .loginProcessingUrl("/login")    // 프론트엔드에서 POST로 로그인을 보낼 주소
                .usernameParameter("name")       // AdminDto의 name 필드와 일치하는지 확인
                .passwordParameter("password")   // AdminDto의 password 필드와 일치하는지 확인
                .defaultSuccessUrl("/")          // 로그인 성공 시 리다이렉트될 기본 주소
                .permitAll()
        )
        .logout(logout -> logout
                .logoutUrl("/logout")            // 로그아웃 주소
                .logoutSuccessUrl("/")           // 로그아웃 성공 시 이동
                .invalidateHttpSession(true)     // 세션 무효화
        );
    return http.build();
  }
}
