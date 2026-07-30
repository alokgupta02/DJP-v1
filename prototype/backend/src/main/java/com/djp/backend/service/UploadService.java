package com.djp.backend.service;

import com.djp.backend.util.DjpConstant;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

@Service
public class UploadService {

    private final Path uploadDir = Path.of("uploads");

    public UploadService() throws IOException {
        Files.createDirectories(uploadDir);
    }

    /**
     * Executes the upload operation for file.
     * Returns the appropriate response or status based on the operation.
     */
    public String uploadFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException(DjpConstant.MSG_FILE_IS_EMPTY);
        }
        String ext = "";
        String original = file.getOriginalFilename();
        if (original != null && original.contains(".")) {
            ext = original.substring(original.lastIndexOf("."));
        }
        String filename = UUID.randomUUID() + ext;
        Path dest = uploadDir.resolve(filename);
        Files.copy(file.getInputStream(), dest);
        return "/djp/api/v1/uploads/" + filename;
    }

    /**
     * Executes the file operation for exists.
     * Returns the appropriate response or status based on the operation.
     */
    public boolean fileExists(String filename) {
        return Files.exists(uploadDir.resolve(filename));
    }

    /**
     * Executes the serve operation for file.
     * Returns the appropriate response or status based on the operation.
     */
    public Resource serveFile(String filename) {
        Path file = uploadDir.resolve(filename);
        return new FileSystemResource(file);
    }

    /**
     * Retrieves media type from the system.
     * Returns the appropriate response or status based on the operation.
     */
    public MediaType getMediaType(Resource resource) {
        return MediaTypeFactory.getMediaType(resource)
                .orElse(MediaType.APPLICATION_OCTET_STREAM);
    }
}
