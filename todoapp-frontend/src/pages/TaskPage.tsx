import { useEffect, useState } from "react";

import { getTasks } from "../api/taskApi.ts";


import TaskList from "../components/task/TaskList.tsx";
import TaskFormModal from "../components/task/TaskFormModal.tsx";
import FloatingCreateButton from "../components/task/FloatingCreateButton.tsx";
import TaskSearchBar from "../components/task/TaskSearchBar.tsx";
import TaskFilter from "../components/task/TaskFilter.tsx";

import type { TaskResponse, TaskCategory, TaskState } from "../types/task.ts";

export default function TaskPage() {
    const [taskList, setTaskList] = useState<TaskResponse[]>([]);
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState<TaskCategory | "">("");
    const [state, setState] = useState<TaskState | "">("");

    const [isLodading, setIsLodading] = useState(false);
    const [isTaskFormModalOpen, setIsTaskFormModalOpen] = useState(false);

    const [errorMessages, setErrorMessages] = useState("");

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
    }, [page, size]);

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

    const handleOpenCreateModal = () => {
        setIsTaskFormModalOpen(true);
    }

    const handleCloseCreateModal = () => {
        setIsTaskFormModalOpen(false);
    }
    return (
        <main>
            <h1>To Do App</h1>

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
            {errorMessages && <p>{errorMessages}</p>}
            {!isLodading && !errorMessages && (<TaskList taskList={taskList} />)}

            <div>
                {Array.from({ length: totalPages}).map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        disabled={page === index}
                        onClick={() => setPage(index)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            <FloatingCreateButton onClick={handleOpenCreateModal} />

            <TaskFormModal
                isOpen={isTaskFormModalOpen}
                onClose={handleCloseCreateModal}
                onSuccess={loadTaskList}
            />
        </main>
    )
}