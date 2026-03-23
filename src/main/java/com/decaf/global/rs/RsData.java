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

    @JsonIgnore
    public int getStatusCode() {
        try {
            return Integer.parseInt(resultCode.split("-")[0]);
        } catch (Exception e) {
            return 200; // 변환 실패 시 기본값 200 반환
        }
    }

}