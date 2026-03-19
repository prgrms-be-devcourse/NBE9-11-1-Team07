package com.decaf.domain.product.repository;

import com.decaf.domain.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
  // JpaRepository를 상속받으면 findById, delete 같은 메서드를 자동으로 만들어줍니다.
}