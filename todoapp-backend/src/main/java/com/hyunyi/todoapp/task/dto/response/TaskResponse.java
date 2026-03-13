package com.hyunyi.todoapp.task.dto.response;
import com.hyunyi.todoapp.task.entity.Task;
import com.hyunyi.todoapp.task.enumtype.TaskCategory;
import com.hyunyi.todoapp.task.enumtype.TaskState;
import jakarta.persistence.EnumType;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public record TaskResponse(
        UUID id,
        String title,
        String description,
        LocalDate taskDate,
        TaskCategory category,
        TaskState state,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static TaskResponse from(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getTaskDate(),
                task.getCategory(),
                task.getState(),
                task.getCreatedAt(),
                task.getUpdatedAt()
        );
    }
}
