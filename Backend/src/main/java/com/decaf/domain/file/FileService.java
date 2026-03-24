package com.decaf.domain.file;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileService {

  @Value("${file.upload-dir}")
  private String uploadDir;

  public String save(MultipartFile file) {
    try {
      Path dirPath = Paths.get(uploadDir);
      if (!Files.exists(dirPath)) {
        Files.createDirectories(dirPath);
      }

      String originalFilename = file.getOriginalFilename();
      String ext = originalFilename.substring(originalFilename.lastIndexOf("."));
      String savedFilename = UUID.randomUUID() + ext;

      Path filePath = dirPath.resolve(savedFilename);
      Files.copy(file.getInputStream(), filePath);

      return "images/" + savedFilename;

    } catch (IOException e) {
      throw new RuntimeException("파일 저장에 실패했습니다.", e);
    }
  }
}