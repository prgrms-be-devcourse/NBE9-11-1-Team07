package com.decaf.global.exception;

import com.decaf.global.rs.RsData;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.NoSuchElementException;

@ControllerAdvice
public class GlobalExceptionHandler {

    // 404 - 존재하지 않는 리소스
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<RsData<Void>> handleNoSuchElement(NoSuchElementException e) {
        return ResponseEntity
                .status(404)
                .body(new RsData<>(e.getMessage(), "404-1"));
    }

    // 404 - IllegalArgumentException
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<RsData<Void>> handleIllegalArgument(IllegalArgumentException e) {
        return ResponseEntity
                .status(404)
                .body(new RsData<>(e.getMessage(), "404-1"));
    }

    // 400 - 유효성 검증 실패
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<RsData<Void>> handleValidation(MethodArgumentNotValidException e) {
        return ResponseEntity
                .status(400)
                .body(new RsData<>("유효성 검증 실패", "400-1"));
    }

    // 500 - 기타 예외
    @ExceptionHandler(Exception.class)
    public ResponseEntity<RsData<Void>> handleException(Exception e) {
        e.printStackTrace();
        return ResponseEntity
                .status(500)
                .body(new RsData<>("서버 내부 오류가 발생했습니다", "500-1"));
    }
}
