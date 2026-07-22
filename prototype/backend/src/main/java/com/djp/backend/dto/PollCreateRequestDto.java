package com.djp.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class PollCreateRequestDto {

    @NotBlank(message = "Question is required")
    @Size(max = 255, message = "Question must not exceed 255 characters")
    private String question;

    @NotBlank(message = "Description is required")
    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    private String description;

    @NotBlank(message = "Category is required")
    @Size(max = 50, message = "Category must not exceed 50 characters")
    private String category;

    private String optionsJson;

    public PollCreateRequestDto() {}

    public PollCreateRequestDto(String question, String description, String category, String optionsJson) {
        this.question = question;
        this.description = description;
        this.category = category;
        this.optionsJson = optionsJson;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getOptionsJson() {
        return optionsJson;
    }

    public void setOptionsJson(String optionsJson) {
        this.optionsJson = optionsJson;
    }
}
