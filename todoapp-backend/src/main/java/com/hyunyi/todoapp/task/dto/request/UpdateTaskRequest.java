package com.hyunyi.todoapp.task.dto.request;

import com.hyunyi.todoapp.task.enumtype.TaskCategory;
import com.hyunyi.todoapp.task.enumtype.TaskState;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record UpdateTaskRequest(
        @NotBlank(message = "title is required")
        String title,

        String description,
        LocalDate taskDate,
        TaskCategory category
) {
}
