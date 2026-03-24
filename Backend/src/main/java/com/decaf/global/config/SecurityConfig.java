package com.decaf.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // CORS 설정 추가
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                .csrf(AbstractHttpConfigurer::disable)
                .headers(headers -> headers
                        .addHeaderWriter(new XFrameOptionsHeaderWriter(
                                XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN)))
                .authorizeHttpRequests(auth -> auth
                        // 1.로그인 없이 누구나 접근 가능한 주소
                        .requestMatchers("/h2-console/**").permitAll()
                        .requestMatchers("/api/admin/login", "/api/admin/signup", "/api/admin/auth", "/api/admin/me").permitAll()  // /me 추가 👈
                        .requestMatchers("/api/auth/**", "/signup").permitAll()

                        // 2.반드시 ADMIN 권한이 있어야만 접근 가능한 주소
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

    // CORS 설정 메서드 추가
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
