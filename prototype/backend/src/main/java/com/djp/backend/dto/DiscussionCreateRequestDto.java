package com.djp.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class DiscussionCreateRequestDto {

    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must not exceed 255 characters")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    private String description;

    @NotBlank(message = "Category is required")
    @Size(max = 50, message = "Category must not exceed 50 characters")
    private String category;

    private String proposalPreview;
    private String proposalBadge;

    public DiscussionCreateRequestDto() {}

    public DiscussionCreateRequestDto(String title, String description, String category) {
        this.title = title;
        this.description = description;
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public String getProposalPreview() {
        return proposalPreview;
    }

    public void setProposalPreview(String proposalPreview) {
        this.proposalPreview = proposalPreview;
    }

    public String getProposalBadge() {
        return proposalBadge;
    }

    public void setProposalBadge(String proposalBadge) {
        this.proposalBadge = proposalBadge;
    }
}
