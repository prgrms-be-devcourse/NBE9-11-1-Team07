package com.decaf.domain.product.service;

import com.decaf.domain.product.dto.ProductDto;
import com.decaf.domain.product.entity.Product;
import com.decaf.domain.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

  private final ProductRepository productRepository;


  public List<Product> findAll() {
    return productRepository.findAll();
  }

  public Optional<Product> findById(int id) {
    return productRepository.findById(id);
  }

  public long count() {
    return productRepository.count();
  }

  public Product create(String name, String category, int price, String description) {
    Product product = new Product(name, category, price, description);
    return productRepository.save(product);
  }

    //ProductRepository를 인터페이스로 만들어서 findById와 productRepository.delete(product)를 사용가능

    @Transactional // 데이터 베이스의 상태를 변경하기 때문에 update와 delete에 Transcational어노테이션 추가
    public void update(Integer id, ProductDto dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 상품입니다. id=" + id));

        product.update(dto.name(), dto.category(), dto.price(), dto.description()); // 설명과 카테고리 수정 안되는거 같아서 수정헀습니다.
    }
    @Transactional
    public void delete(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품입니다. id=" + id));

        productRepository.delete(product);
    }
}
