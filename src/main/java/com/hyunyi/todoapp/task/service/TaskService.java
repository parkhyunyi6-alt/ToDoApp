package com.hyunyi.todoapp.task.service;

import com.hyunyi.todoapp.common.exception.TaskNotFoundException;
import com.hyunyi.todoapp.task.dto.request.UpdateTaskRequest;
import com.hyunyi.todoapp.task.dto.request.UpdateTaskStateRequest;
import com.hyunyi.todoapp.task.dto.request.UpdateTaskHiddenRequest;
import com.hyunyi.todoapp.task.entity.Task;
import com.hyunyi.todoapp.task.repository.TaskRepository;
import com.hyunyi.todoapp.task.dto.response.TaskResponse;
import com.hyunyi.todoapp.task.enumtype.TaskCategory;
import com.hyunyi.todoapp.task.enumtype.TaskState;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TaskService {

    private final TaskRepository taskRepository;

    public Page<TaskResponse> getTasks(int page, int size, TaskCategory category, TaskState state) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Task> taskPage;

        if(category != null && state != null) {
            taskPage = taskRepository.findByDeletedAtIsNullAndCategoryAndState(category, state, pageable);
        } else if(category != null) {
            taskPage = taskRepository.findByDeletedAtIsNullAndCategory(category, pageable);
        } else if(state != null) {
            taskPage = taskRepository.findByDeletedAtIsNullAndState(state, pageable);
        } else {
            taskPage = taskRepository.findByDeletedAtIsNull(pageable);
        }

        return taskPage.map(TaskResponse::from);
    }

    @Transactional
    public TaskResponse createTask(String title, String description, LocalDate taskDate, TaskCategory category) {
        Task task = new Task(title, description, taskDate, category);
        Task savedTask = taskRepository.save(task);
        return TaskResponse.from(savedTask);
    }

    @Transactional
    public TaskResponse getTask(UUID taskId) {
        Task task = taskRepository.findById(taskId)
                .filter(foundTask -> foundTask.getDeletedAt() == null)
                .orElseThrow(()-> new TaskNotFoundException("Task not found. id: " + taskId));
        return TaskResponse.from(task);
    }

    @Transactional
    public TaskResponse updateTask(UUID taskId, UpdateTaskRequest request) {
        Task task = taskRepository.findById(taskId)
                .filter(foundTask -> foundTask.getDeletedAt() == null)
                .orElseThrow(()-> new TaskNotFoundException("Task not found. id: " + taskId));

        if(request.title() !=null) {
            if(request.title().isBlank()) {
                throw new IllegalArgumentException("title is required");
            }
            task.changeTitle(request.title());
        }

        if(request.description() !=null) {
            task.changeDescription(request.description());
        }

        if(request.taskDate() !=null) {
            task.changeTaskDate(request.taskDate());
        }

        if(request.category() !=null) {
            task.changeCategory(request.category());
        }

        return TaskResponse.from(task);
    }

    @Transactional
    public void deleteTask(UUID taskId) {
        Task task = taskRepository.findById(taskId)
                .filter(foundTask -> foundTask.getDeletedAt() == null)
                .orElseThrow(()-> new TaskNotFoundException("Task not found. id: " + taskId));

        task.markDeleted();
    }

    @Transactional
    public TaskResponse updateState(UUID taskId, UpdateTaskStateRequest request) {
        Task task = taskRepository.findById(taskId)
                .filter(foundTask -> foundTask.getDeletedAt() == null)
                .orElseThrow(()-> new TaskNotFoundException("Task not found. id: " + taskId));

        task.changeState(request.state());

        Task updatedTask = taskRepository.save(task);
        return TaskResponse.from(updatedTask);
    }
    @Transactional
    public TaskResponse updateHidden(UUID taskId, UpdateTaskHiddenRequest request) {
        Task task = taskRepository.findById(taskId)
                .filter(foundTask -> foundTask.getDeletedAt() == null)
                .orElseThrow(()-> new TaskNotFoundException("Task not found. id: " + taskId));

        task.changeHidden(request.isHidden());

        Task updatedTask = taskRepository.save(task);
        return TaskResponse.from(updatedTask);
    }
}
