package com.hyunyi.todoapp.task.service;

import com.hyunyi.todoapp.common.exception.TaskNotFoundException;
import com.hyunyi.todoapp.task.dto.request.UpdateTaskRequest;
import com.hyunyi.todoapp.task.dto.request.UpdateTaskStateRequest;
import com.hyunyi.todoapp.task.dto.response.TaskResponse;
import com.hyunyi.todoapp.task.entity.Task;
import com.hyunyi.todoapp.task.enumtype.TaskCategory;
import com.hyunyi.todoapp.task.enumtype.TaskState;
import com.hyunyi.todoapp.task.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TaskService {

    private final TaskRepository taskRepository;

    public Page<TaskResponse> getTasks(
            int page,
            int size,
            String keyword,
            TaskCategory category,
            TaskState state
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        String normalizedKeyword = normalizeKeyword(keyword);
        Page<Task> taskPage;

        if (hasKeyword(normalizedKeyword)) {
            taskPage = getTasksByKeyword(normalizedKeyword, category, state, pageable);
        } else {
            taskPage = getTasksWithoutKeyword(category, state, pageable);
        }

        return taskPage.map(TaskResponse::from);
    }

    @Transactional
    public TaskResponse createTask(String title, String description, LocalDate taskDate, TaskCategory category) {
        Task task = new Task(title, description, taskDate, category);
        Task savedTask = taskRepository.save(task);
        return TaskResponse.from(savedTask);
    }

    public TaskResponse getTask(UUID taskId) {
        Task task = getActiveTask(taskId);
        return TaskResponse.from(task);
    }

    @Transactional
    public TaskResponse updateTask(UUID taskId, UpdateTaskRequest request) {
        Task task = getActiveTask(taskId);

        if (request.title() != null) {
            if (request.title().isBlank()) {
                throw new IllegalArgumentException("title is required");
            }
            task.changeTitle(request.title());
        }

        if (request.description() != null) {
            task.changeDescription(request.description());
        }

        if (request.taskDate() != null) {
            task.changeTaskDate(request.taskDate());
        }

        if (request.category() != null) {
            task.changeCategory(request.category());
        }

        return TaskResponse.from(task);
    }

    @Transactional
    public void deleteTask(UUID taskId) {
        Task task = getActiveTask(taskId);
        task.markDeleted();
    }

    @Transactional
    public TaskResponse updateState(UUID taskId, UpdateTaskStateRequest request) {
        Task task = getActiveTask(taskId);
        task.changeState(request.state());
        return TaskResponse.from(task);
    }

    /* basic search */
    private Page<Task> getTasksWithoutKeyword(
            TaskCategory category,
            TaskState state,
            Pageable pageable
    ) {
        if (category != null && state != null) {
            return taskRepository.findByDeletedAtIsNullAndCategoryAndState(category, state, pageable);
        }

        if (category != null) {
            return taskRepository.findByDeletedAtIsNullAndCategoryAndStateNot(
                    category,
                    TaskState.ARCHIVED,
                    pageable
            );
        }

        if (state != null) {
            return taskRepository.findByDeletedAtIsNullAndState(state, pageable);
        }

        return taskRepository.findByDeletedAtIsNullAndStateNot(
                TaskState.ARCHIVED,
                pageable
        );
    }

    /* search by keyword */
    private Page<Task> getTasksByKeyword(
            String keyword,
            TaskCategory category,
            TaskState state,
            Pageable pageable
    ) {
        if (category != null && state != null) {
            return taskRepository.searchTasksByCategoryAndState(
                    keyword,
                    category,
                    state,
                    pageable
            );
        }

        if (category != null) {
            return taskRepository.searchActiveTasksByCategory(
                    keyword,
                    category,
                    TaskState.ARCHIVED,
                    pageable
            );
        }

        if (state != null) {
            return taskRepository.searchTasksByState(
                    keyword,
                    state,
                    pageable
            );
        }

        return taskRepository.searchActiveTasks(
                keyword,
                TaskState.ARCHIVED,
                pageable
        );
    }

    /* keyword normalization */
    private boolean hasKeyword(String keyword) {
        return keyword != null && !keyword.isBlank();
    }

    private String normalizeKeyword(String keyword) {
        if (keyword == null) {
            return null;
        }

        return keyword.trim();
    }

    /* search active task by id */
    private Task getActiveTask(UUID taskId) {
        return taskRepository.findById(taskId)
                .filter(foundTask -> foundTask.getDeletedAt() == null)
                .orElseThrow(() -> new TaskNotFoundException("Task not found. id: " + taskId));
    }
}