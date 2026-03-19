package com.decaf.domain.product;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @PutMapping("/{id}")
    public String update(@PathVariable Integer id, @RequestBody ProductUpdateDto dto) {
        productService.update(id, dto);
        return "상품 수정 완료 (id: " + id + ")";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Integer id) {
        productService.delete(id);
        return "상품 삭제 완료 (id: " + id + ")";
    }
}