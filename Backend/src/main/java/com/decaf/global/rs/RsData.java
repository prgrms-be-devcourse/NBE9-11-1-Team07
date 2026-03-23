package com.decaf.global.rs;

import com.fasterxml.jackson.annotation.JsonIgnore;

public record RsData<T>(
        String msg,
        String resultCode,
        T data
) {
    public RsData(String msg, String resultCode) {
        this(msg, resultCode, null);
    }

    // resultCode의 앞 3자리를 잘라 HTTP 상태 코드로 변환 (예: "200-1" -> 200)
    @JsonIgnore
    public int getStatusCode() {
        try {
            return Integer.parseInt(resultCode.split("-")[0]);
        } catch (Exception e) {
            return 200; // 변환 실패 시 기본값 200 반환
        }
    }

}