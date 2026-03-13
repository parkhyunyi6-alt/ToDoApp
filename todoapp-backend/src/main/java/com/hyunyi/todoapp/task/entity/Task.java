package com.hyunyi.todoapp.task.entity;

import com.hyunyi.todoapp.task.enumtype.TaskCategory;
import com.hyunyi.todoapp.task.enumtype.TaskState;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "task")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Task {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(name="title", nullable = false, length=200)
    private String title;

    @Column(name="description")
    private String description;

    @Column(name="task_date")
    private LocalDate taskDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false, length = 50)
    private TaskCategory category;

    @Enumerated(EnumType.STRING)
    @Column(name = "state", nullable = false, length = 50)
    private TaskState state;

    @Column(name="created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name="updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name="deleted_at")
    private LocalDateTime deletedAt;

    public Task(String title, String description, LocalDate taskDate, TaskCategory category) {
        this.title = title;
        this.description = description;
        this.taskDate = taskDate;
        this.category = category !=null ? category : TaskCategory.GENERAL;
        this.state = TaskState.TODO;
    }

    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public void changeTitle(String title) {
        this.title = title;
    }

    public void changeDescription(String description) {
        this.description = description;
    }

    public void changeTaskDate(LocalDate taskDate) {
        this.taskDate = taskDate;
    }

    public void changeCategory(TaskCategory category) {
        this.category = category;
    }

    public void changeState(TaskState state) {
        this.state = state;
    }

    public void markDeleted() {
        this.deletedAt = LocalDateTime.now();
    }

}
