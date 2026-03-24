package com.decaf.global.initData;

import com.decaf.domain.admin.service.AdminService;
import com.decaf.domain.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.transaction.annotation.Transactional;

@Configuration
@RequiredArgsConstructor
public class BaseInitData {

    @Autowired
    @Lazy
    private BaseInitData self;

    private final ProductService productService;
    private final AdminService adminService;

    @Bean
    public ApplicationRunner initData() {
        return args -> {
            self.work1();
            self.work2();
        };
    }

    @Transactional
    public void work1() {
        if (productService.count() > 0) {
            return;
        }
        productService.create(
                "에티오피아 예가체프",
                "싱글 오리진",
                18000,
                "꽃향기와 베리류의 달콤한 산미가 특징인 에티오피아 원두 200g 패키지",
            "images/ye.jpg");
        productService.create(
                "콜롬비아 수프리모",
                "싱글 오리진",
                16000,
                "견과류와 카라멜의 부드러운 단맛이 느껴지는 콜롬비아 원두 200g 패키지",
            "images/kol.jpg");
        productService.create(
                "그리드 블렌드",
                "블렌드",
                14000,
                "Grids & Circles 시그니처 블렌드. 균형 잡힌 바디감과 초콜릿 향의 200g 패키지",
            "images/grid.jpg");
        productService.create(
                "디카페인 브라질",
                "디카페인",
                17000,
                "스위스 워터 공법으로 카페인을 제거한 브라질 원두 200g 패키지",
            "images/dca.jpg");

        System.out.println("초기 상품 4개가 등록되었습니다.");
    }

    @Transactional
    public void work2() {
        try {
            // 관리자 계정 생성
            if (adminService.findByEmail("admin@decaf.com").isEmpty()) {
                adminService.create("admin@decaf.com", "1234");
            }
        } catch (IllegalArgumentException e) {
            // 이미 존재하면 무시
            System.out.println("관리자 계정이 이미 존재합니다.");
        }
    }
}
