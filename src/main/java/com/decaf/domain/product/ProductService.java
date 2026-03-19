package com.decaf.domain.product;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;

    @Transactional
    public void update(Integer id, ProductUpdateDto dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품입니다. id=" + id));

        // 더티 체킹(Dirty Checking)에 의해 자동으로 DB 반영
        product.update(dto.getName(), dto.getPrice());
    }

    @Transactional
    public void delete(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품입니다. id=" + id));

        productRepository.delete(product);
    }
}