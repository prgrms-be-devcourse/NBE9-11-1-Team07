package com.decaf.domain.product.service;

import com.decaf.domain.product.dto.ProductDto;
import com.decaf.domain.product.entity.Product;
import com.decaf.domain.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

  private final ProductRepository productRepository;

  //ProductRepository를 인터페이스로 만들어서 findById와 productRepository.delete(product)를 사용가능
  @Transactional
  public void update(Integer id, ProductDto dto) {
    Product product = productRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품입니다. id=" + id));

    product.update(dto.name(), dto.price());
  }

  @Transactional
  public void delete(Integer id) {
    Product product = productRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품입니다. id=" + id));

    productRepository.delete(product);
  }
}
