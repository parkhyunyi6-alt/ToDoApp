package com.hyunyi.todoapp.task.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.hyunyi.todoapp.task.entity.Task;

import com.hyunyi.todoapp.task.enumtype.TaskCategory;
import com.hyunyi.todoapp.task.enumtype.TaskState;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface TaskRepository extends JpaRepository<Task, UUID> {

    /* deletedAt is not null --> deleted  */
    /* search except state = ARCHIVED */
    Page<Task> findByDeletedAtIsNullAndStateNot(TaskState state, Pageable pageable);

    /* search by state */
    Page<Task> findByDeletedAtIsNullAndState(TaskState state, Pageable pageable);

    /* search by category (except state = ARCHIVED) */
    Page<Task> findByDeletedAtIsNullAndCategoryAndStateNot(TaskCategory category, TaskState state, Pageable pageable);

    /* search by category and state */
    Page<Task> findByDeletedAtIsNullAndCategoryAndState(TaskCategory category, TaskState state, Pageable pageable);

    /* search by keyword */
    @Query("""
            SELECT t
            FROM Task t
            WHERE t.deletedAt IS NULL
              AND t.state <> :excludedState
              AND (
                    LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
                 OR LOWER(COALESCE(t.description,'')) LIKE LOWER(CONCAT('%', :keyword, '%'))
              )
            """)
    Page<Task> searchActiveTasks(
            @Param("keyword") String keyword,
            @Param("excludedState") TaskState excludedState,
            Pageable pageable
    );

    @Query("""
            SELECT t
            FROM Task t
            WHERE t.deletedAt IS NULL
              AND t.category = :category
              AND t.state <> :excludedState
              AND (
                    LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
                 OR LOWER(COALESCE(t.description,'')) LIKE LOWER(CONCAT('%', :keyword, '%'))
              )
            """)
    Page<Task> searchActiveTasksByCategory(
            @Param("keyword") String keyword,
            @Param("category") TaskCategory category,
            @Param("excludedState") TaskState excludedState,
            Pageable pageable
    );

    @Query("""
            SELECT t
            FROM Task t
            WHERE t.deletedAt IS NULL
              AND t.state = :state
              AND (
                    LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
                 OR LOWER(COALESCE(t.description,'')) LIKE LOWER(CONCAT('%', :keyword, '%'))
              )
            """)
    Page<Task> searchTasksByState(
            @Param("keyword") String keyword,
            @Param("state") TaskState state,
            Pageable pageable
    );

    @Query("""
            SELECT t
            FROM Task t
            WHERE t.deletedAt IS NULL
              AND t.category = :category
              AND t.state = :state
              AND (
                    LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
                 OR LOWER(COALESCE(t.description,'')) LIKE LOWER(CONCAT('%', :keyword, '%'))
              )
            """)
    Page<Task> searchTasksByCategoryAndState(
            @Param("keyword") String keyword,
            @Param("category") TaskCategory category,
            @Param("state") TaskState state,
            Pageable pageable
    );
}
