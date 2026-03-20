package com.decaf.domain.product.controller;


import com.decaf.domain.product.dto.ProductDto;
import com.decaf.domain.product.entity.Product;
import com.decaf.domain.product.service.ProductService;
import com.decaf.global.rsData.RsData;
import jakarta.persistence.Column;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
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


  record ProductCreateReqBody(
      @NotBlank
      String name,

      @NotBlank
      String category,

      @NotNull
      @Min(0)
      int price,

      @NotBlank
      String description
  ) {
  }

  record ProductCreateResBody(
      ProductDto productDto,
      long postsCount
  ) {
  }

  @PostMapping("/product")
  public RsData<ProductCreateResBody> create(@RequestBody @Valid ProductCreateReqBody reqBody) {
    Product product = productService.create(reqBody.name(),
        reqBody.category(),
        reqBody.price(),
        reqBody.description());
    long productsCount = productService.count();

    return new RsData<>(
        "%d번 게시물이 생성되었습니다.".formatted(product.getId()),
        "201-1",
        new ProductCreateResBody(
            new ProductDto(product),
            productsCount
        )
    );
  }




}