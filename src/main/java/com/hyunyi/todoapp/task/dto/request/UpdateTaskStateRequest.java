package com.hyunyi.todoapp.task.dto.request;

import com.hyunyi.todoapp.task.enumtype.TaskState;
import jakarta.validation.constraints.NotNull;

public record UpdateTaskStateRequest(
        @NotNull(message = "state is required")
        TaskState state
) {
}