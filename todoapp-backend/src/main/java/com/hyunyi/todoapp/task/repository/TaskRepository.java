package com.hyunyi.todoapp.task.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.hyunyi.todoapp.task.entity.Task;

import com.hyunyi.todoapp.task.enumtype.TaskCategory;
import com.hyunyi.todoapp.task.enumtype.TaskState;

import java.util.UUID;

public interface TaskRepository extends JpaRepository<Task, UUID> {

    Page<Task> findByDeletedAtIsNull(Pageable pageable);

    Page<Task> findByDeletedAtIsNullAndCategory(TaskCategory category, Pageable pageable);

    Page<Task> findByDeletedAtIsNullAndState(TaskState state, Pageable pageable);

    Page<Task> findByDeletedAtIsNullAndCategoryAndState(TaskCategory category, TaskState state, Pageable pageable);

}
