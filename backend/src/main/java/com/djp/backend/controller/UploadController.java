package com.djp.backend.controller;

import com.djp.backend.util.DjpConstant;
import com.djp.backend.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.djp.backend.service.UploadService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "5. System & Observability", description = "File Uploads and System Observability")
@RequestMapping("/djp/api/v1/uploads")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class UploadController {

    private final UploadService uploadService;

    public UploadController(UploadService uploadService) {
        this.uploadService = uploadService;
    }

    @Operation(summary = "Upload File", description = "Executes the uploadFile operation")
    @PostMapping
    public ResponseEntity<ApiResponse<String>> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        String url = uploadService.uploadFile(file);
        return ResponseEntity.ok(ApiResponse.success(url, DjpConstant.MSG_FILE_UPLOADED));
    }

    @Operation(summary = "Serve File", description = "Executes the serveFile operation")
    @GetMapping("/{filename}")
    public ResponseEntity<org.springframework.core.io.Resource> serveFile(@PathVariable String filename) {
        if (!uploadService.fileExists(filename)) {
            return ResponseEntity.notFound().build();
        }
        var resource = uploadService.serveFile(filename);
        return ResponseEntity.ok()
                .contentType(uploadService.getMediaType(resource))
                .body(resource);
    }
}
