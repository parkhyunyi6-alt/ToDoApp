package com.hyunyi.todoapp.task.controller;


import com.hyunyi.todoapp.common.response.ApiResponse;
import com.hyunyi.todoapp.task.dto.request.CreateTaskRequest;
import com.hyunyi.todoapp.task.dto.request.UpdateTaskRequest;
import com.hyunyi.todoapp.task.dto.request.UpdateTaskStateRequest;
import com.hyunyi.todoapp.task.dto.response.TaskResponse;
import com.hyunyi.todoapp.task.service.TaskService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import java.util.List;
import java.util.UUID;

import com.hyunyi.todoapp.task.enumtype.TaskCategory;
import com.hyunyi.todoapp.task.enumtype.TaskState;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;

    @GetMapping
    public ApiResponse<Page<TaskResponse>> getTasks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) TaskCategory category,
            @RequestParam(required = false) TaskState state
    ) {
        Page<TaskResponse> taskPage = taskService.getTasks(page, size, keyword, category, state);
        return ApiResponse.success(taskPage);
    }

    @PostMapping
    public TaskResponse createTask(@Valid @RequestBody CreateTaskRequest request) {
        return taskService.createTask(
                request.title(),
                request.description(),
                request.taskDate(),
                request.category()
        );
    }

    @GetMapping("/{taskId}")
    public TaskResponse getTask(@PathVariable UUID taskId) {
        return taskService.getTask(taskId);
    }

    @PatchMapping("/{taskId}")
    public TaskResponse updateTask(
            @PathVariable UUID taskId,
            @Valid @RequestBody UpdateTaskRequest request
    ) {
        return taskService.updateTask(taskId, request);
    }

    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable UUID taskId) {
        taskService.deleteTask(taskId);
    }

    @PatchMapping("/{taskId}/state")
    public TaskResponse updateTaskState(
            @PathVariable UUID taskId,
            @Valid @RequestBody UpdateTaskStateRequest request
    ) {
        return taskService.updateState(taskId, request);
    }

}
