import { useEffect, useState } from "react";
import Header from "../components/layout/Header.tsx";

import {getTasks, createTask, updateTask, deleteTask, updateTaskState} from "../api/taskApi.ts";

import TaskList from "../components/task/TaskList.tsx";
import TaskFormModal from "../components/task/TaskFormModal.tsx";
import FloatingCreateButton from "../components/Common/FloatingCreateButton.tsx";
import TaskSearchBar from "../components/task/TaskSearchBar.tsx";
import TaskFilter from "../components/task/TaskFilter.tsx";
import {Button} from "../components/Common/Button.tsx";

import styles from "./TaskPage.module.css";

import type {
    TaskResponse,
    TaskCategory,
    TaskState,
    CreateTaskRequest,
    UpdateTaskRequest,
} from "../types/task.ts";

export default function TaskPage() {
    const [taskList, setTaskList] = useState<TaskResponse[]>([]);
    const [page, setPage] = useState(0);
    const [size] = useState(6);
    const [totalPages, setTotalPages] = useState(0);

    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState<TaskCategory | "">("");
    const [state, setState] = useState<TaskState | "">("");

    const [isLodading, setIsLodading] = useState(false);
    const [isTaskFormModalOpen, setIsTaskFormModalOpen] = useState(false);

    const [errorMessages, setErrorMessages] = useState("");

    const [selectedTask, setSelectedTask] = useState<TaskResponse | null>(null);

    const loadTaskList = async () => {
        try {
            setIsLodading(true);
            setErrorMessages("");

            const response = await getTasks({
                page,
                size,
                keyword: keyword || undefined,
                category: category || undefined,
                state: state || undefined,
            });

            setTaskList(response.content);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Failed to load tasks", error);
            setErrorMessages("Failed to load tasks");
        } finally {
            setIsLodading(false);
        }
    };

    useEffect(() => {
        loadTaskList();
    },  [page, size, keyword, category, state]);

    const handleChangeTaskState = async (taskId: string, nextState: TaskState) => {
        try {
            await updateTaskState(taskId, { state: nextState });
            await loadTaskList();
        } catch (error) {
            console.error("Failed to update task state", error);
            alert("상태 변경에 실패했습니다.");
        }
    };

    const handleSearch = () => {
        setPage(0);
        loadTaskList();
    }

    const handleChangeCategory = (value: TaskCategory | "") => {
        setCategory(value);
        setPage(0);
    }

    const handleChangeState = (value: TaskState | "") => {
        setState(value);
        setPage(0);
    }

    const handleCreateTask = async (request: CreateTaskRequest) => {
        try {
            await createTask(request);
            loadTaskList();
        } catch (error) {
            console.error("Failed to create task", error);
            setErrorMessages("Failed to create task");
        }
    }

    const handleUpdateTask = async (taskId: string, request: UpdateTaskRequest) => {
        try {
            await updateTask(taskId, request);
            loadTaskList();
        } catch (error) {
            console.error("Failed to update task", error);
            setErrorMessages("Failed to update task");
        }
    }


    const handleOpenCreateModal = () => {
        setSelectedTask(null);
        setIsTaskFormModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsTaskFormModalOpen(false);
        setSelectedTask(null);
    }

    const handleOpenUpdateModal = (task: TaskResponse) => {
        setSelectedTask(task);
        setIsTaskFormModalOpen(true);
    }

    const handleDeleteTask = async (taskId: string) => {
        try {
            await deleteTask(taskId);
            loadTaskList();
        } catch (error) {
            console.error("Failed to delete task", error);
            setErrorMessages("Failed to delete task");
        }
    }



    return (
        <div className={styles.taskPage}>
            <Header />

            <TaskSearchBar
                keyword={keyword}
                onChangeKeyword={setKeyword}
                onSearch={loadTaskList}
            />

            <TaskFilter
                category={category}
                state={state}
                onChangeCategory={handleChangeCategory}
                onChangeState={handleChangeState}
                onApply={handleSearch}
            />

            {isLodading && <p>Loading...</p>}
            {errorMessages && <div className={styles.errorMessage} >{errorMessages}</div>}
            {!isLodading && !errorMessages &&
                (<TaskList
                    taskList={taskList}
                    onClickDetail={handleOpenUpdateModal}
                    onChangeState={handleChangeTaskState}
                />)}
            <div className={styles.pageButton}>
                {Array.from({ length: totalPages}).map((_, index) => (
                    <Button
                        key={index}
                        type="button"
                        disabled={page === index}
                        variant={page === index ? "primary" : "secondary"}
                        size={"sm"}
                        onClick={() => setPage(index)}
                    >
                        {index + 1}
                    </Button>
                ))}
            </div>

            <FloatingCreateButton onClick={handleOpenCreateModal} />

            <TaskFormModal
                isOpen={isTaskFormModalOpen}
                onClose={handleCloseModal}
                onCreate={handleCreateTask}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
                editingTask={selectedTask}
                onSuccess={loadTaskList}
            />
        </div>
    )
}