package com.hyunyi.todoapp.task.dto.request;

import com.hyunyi.todoapp.task.enumtype.TaskCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record UpdateTaskHiddenRequest(
        @NotNull(message = "isHidden is required")
        Boolean isHidden
) {
}
