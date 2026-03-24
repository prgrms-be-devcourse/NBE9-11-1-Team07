package com.decaf.global.springDoc;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(info = @Info(title = "디카페인 API 서버", version = "beta", description = "API 서버 문서입니다."))
public class SpringDoc {
    @Bean
    public GroupedOpenApi groupApiV1() {
        return GroupedOpenApi.builder()
                .group("controller")
                .pathsToMatch("/api/**")
                .build();
    }

}