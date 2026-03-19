package com.decaf.global.rs;

public record RsData<T>(
        String resultCode,
        String msg,
        T data
) {}