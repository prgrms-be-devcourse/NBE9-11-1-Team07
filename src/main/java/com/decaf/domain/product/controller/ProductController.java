package com.decaf.domain.product.controller;

import com.decaf.domain.product.dto.ProductDto;
import com.decaf.domain.product.entity.Product;
import com.decaf.domain.product.service.ProductService;
import com.decaf.global.rs.RsData; // 패키지 경로 RsData 확인 필요
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService; // 필드 선언을 상단으로 이동

    @GetMapping("/list")
    public List<ProductDto> list() {
        List<Product> result = productService.findAll();
        return result.stream()
                .map(ProductDto::new)
                .toList();
    }

    @GetMapping("/{id}")
    public ProductDto detail(@PathVariable("id") int id) {
        Product product = productService.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품입니다. id=" + id));
        return new ProductDto(product);
    }

    // 상품 정보 수정 (PUT)
    @PutMapping("/{id}")
    public RsData<Void> update(@PathVariable("id") Integer id, @RequestBody ProductDto productDto) {
        productService.update(id, productDto);
        return new RsData<>("S-1", "%d번 상품이 수정되었습니다.".formatted(id), null);
    }

    // 상품 삭제 (DELETE)
    @DeleteMapping("/{id}")
    public RsData<Void> delete(@PathVariable("id") Integer id) {
        productService.delete(id);
        return new RsData<>( "%d번 상품이 삭제되었습니다.".formatted(id), "S-1",null); // 생성자의 인자 순서 문제 수정
    }

    // 내부에서 사용할 레코드는 클래스 안에 정의 가능
    public record ProductCreateReqBody(
            @NotBlank String name,
            @NotBlank String category,
            @NotNull @Min(0) int price,
            @NotBlank String description
    ) {}

    public record ProductCreateResBody(
            ProductDto productDto,
            long productsCount
    ) {}

    @PostMapping // REST API 원칙에 따라 컬렉션 경로(/api/products)에 직접 매핑
    public RsData<ProductCreateResBody> create(@RequestBody @Valid ProductCreateReqBody reqBody) {
        Product product = productService.create(
                reqBody.name(),
                reqBody.category(),
                reqBody.price(),
                reqBody.description()
        );
        long productsCount = productService.count();

        return new RsData<>(
                "201-1",
                "%d번 상품이 생성되었습니다.".formatted(product.getId()),
                new ProductCreateResBody(new ProductDto(product), productsCount)
        );
    }
}