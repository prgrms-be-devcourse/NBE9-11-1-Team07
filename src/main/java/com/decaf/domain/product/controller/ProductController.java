package com.decaf.domain.product.controller;


import com.decaf.domain.product.dto.ProductDto;
import com.decaf.domain.product.entity.Product;
import com.decaf.domain.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

  private final ProductService productService;
  

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




}