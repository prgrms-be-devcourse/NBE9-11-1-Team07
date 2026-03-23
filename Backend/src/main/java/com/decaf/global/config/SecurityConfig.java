package com.decaf.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .headers(headers -> headers
                        .addHeaderWriter(new XFrameOptionsHeaderWriter(
                                XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN)))
                .authorizeHttpRequests(auth -> auth
                        // 1.로그인 없이 누구나 접근 가능한 주소
                        .requestMatchers("/h2-console/**").permitAll()
                        .requestMatchers("/api/admin/login", "/api/admin/signup", "/api/admin/auth").permitAll()
                        .requestMatchers("/api/auth/**", "/signup").permitAll()

                        // 2.반드시 ADMIN 권한이 있어야만 접근 가능한 주소
                        //  말씀하신 상품 관리 권한 로직을 여기에 배치했습니다.
                        .requestMatchers("/api/products/admin/**").hasRole("ADMIN")

                        // 3.그 외 /api/admin/으로 시작하는 모든 관리자 기능도 보호
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        // 4.나머지는 일단 허용 (일반 사용자 상품 조회 등)
                        .anyRequest().permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/api/admin/logout")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .permitAll()
                );

        return http.build();
    }
}
