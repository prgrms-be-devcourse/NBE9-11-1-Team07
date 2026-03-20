package com.decaf.domain.product.controller;

import com.decaf.domain.product.dto.ProductDto;
import com.decaf.domain.product.entity.Product;
import lombok.RequiredArgsConstructor;
import com.decaf.domain.product.ProductService;
import com.decaf.global.rs.RsData;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor

public class ProductController {
    @GetMapping("/list")
    public List<ProductDto> list() {
        List<Product> result = productService.findAll();

        List<ProductDto> postDtoList = result.stream()
                .map(ProductDto::new)
                .toList();

        return postDtoList;
    }
    @GetMapping("/{id}")
    public ProductDto detail(@PathVariable int id) {
        Product product = productService.findById(id).get();
        return new ProductDto(product);
    }

    private final ProductService productService;

    // 상품 정보 수정 (PUT)
    @PutMapping("/{id}")
    public RsData<Void> update(@PathVariable("id") Integer id, @RequestBody ProductDto productDto) {
        productService.update(id, productDto);

        return new RsData<>(
                "S-1",
                "%d번 상품이 수정되었습니다.".formatted(id),
                null
        );
    }
    // 상품 삭제 (DELETE)
    @DeleteMapping("/{id}")
    public RsData<Void> delete(@PathVariable("id") Integer id) {
        productService.delete(id);

        return new RsData<>(
                "S-1",
                "%d번 상품이 삭제되었습니다.".formatted(id),
                null
        );
    }
}
