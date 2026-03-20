package com.decaf.domain.product.repository;


// class => public interface로 변경
// 이유 :  인터페이스로 만들고 상속받으면 저장,삭제 같은 기능을 스프링이 자동으로 만들어줌
import com.decaf.domain.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
  // JpaRepository를 상속받으면 findById, delete 같은 메서드를 자동으로 만들어줍니다.
}