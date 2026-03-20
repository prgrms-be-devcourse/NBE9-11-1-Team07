package com.decaf;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

//경로 추가
@EnableJpaAuditing
@SpringBootApplication
public class  DecafApplication {

  public static void main(String[] args) {
    SpringApplication.run(DecafApplication.class, args);
  }

}
