import { useEffect, useState } from "react";
import type {
    CreateTaskRequest,
    TaskCategory,
    TaskResponse,
    TaskState,
    UpdateTaskRequest,
} from "../../types/task";

import { Button } from "../Common/Button.tsx";
import { Select } from "../Common/Select.tsx";
import styles from "./TaskFormModal.module.css";

interface TaskFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (request: CreateTaskRequest) => Promise<void>;
    onUpdate?: (taskId: string, request: UpdateTaskRequest) => Promise<void>;
    onDelete?: (taskId: string) => Promise<void>;
    editingTask?: TaskResponse | null;
    onSuccess: () => void;
}

function TaskFormModal({
                           isOpen,
                           onClose,
                           onCreate,
                           onUpdate,
                           onDelete,
                           editingTask = null,
                           onSuccess,
                       }: TaskFormModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [category, setCategory] = useState<TaskCategory>("GENERAL");
    const [state, setState] = useState<TaskState>("TODO");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessages, setErrorMessages] = useState("");

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        if (editingTask) {
            setTitle(editingTask.title ?? "");
            setDescription(editingTask.description ?? "");
            setTaskDate(editingTask.taskDate ?? "");
            setCategory(editingTask.category ?? "GENERAL");
            setState(editingTask.state ?? "TODO");
        } else {
            setTitle("");
            setDescription("");
            setTaskDate("");
            setCategory("GENERAL");
            setState("TODO");
        }

        setErrorMessages("");
    }, [isOpen, editingTask]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!title.trim()) {
            setErrorMessages("Title is required");
            return;
        }

        setIsSubmitting(true);
        setErrorMessages("");

        try {
            if (editingTask && onUpdate) {
                const request: UpdateTaskRequest = {
                    title: title.trim(),
                    description: description.trim() || undefined,
                    taskDate: taskDate || null,
                    category,
                    state,
                };

                await onUpdate(editingTask.id, request);
            } else {
                const request: CreateTaskRequest = {
                    title: title.trim(),
                    description: description.trim() || undefined,
                    taskDate: taskDate || null,
                    category,
                    state,
                };

                await onCreate(request);
            }

            onClose();
            onSuccess();
        } catch (error) {
            console.error("Failed to save task", error);
            setErrorMessages(
                editingTask ? "Failed to update task" : "Failed to create task"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!editingTask || !onDelete) {
            return;
        }

        try {
            await onDelete(editingTask.id);
            onClose();
            onSuccess();
        } catch (error) {
            console.error("Failed to delete task", error);
        }
    }


    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(event) => event.stopPropagation()}
            >
                <h2 className={styles.title}>
                    {editingTask ? "Edit Task" : "Create Task"}
                </h2>

                {errorMessages && <p className={styles.error}>{errorMessages}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />

                    <textarea
                        className={styles.textarea}
                        placeholder="Description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />

                    <input
                        className={styles.input}
                        type="date"
                        value={taskDate}
                        onChange={(event) => setTaskDate(event.target.value)}
                    />

                    <Select
                        className={styles.select}
                        value={category}
                        onChange={(event) =>
                            setCategory(event.target.value as TaskCategory)
                        }
                        options={[
                            { value: "GENERAL", label: "GENERAL" },
                            { value: "WORK", label: "WORK" },
                            { value: "PERSONAL", label: "PERSONAL" },
                            { value: "STUDY", label: "STUDY" },
                            { value: "HEALTH", label: "HEALTH" },
                            { value: "FINANCE", label: "FINANCE" },
                        ]}
                    />

                    <Select
                        className={styles.select}
                        value={state}
                        onChange={(event) =>
                            setState(event.target.value as TaskState)
                        }
                        options={[
                            { value: "TODO", label: "TODO" },
                            { value: "IN_PROGRESS", label: "IN_PROGRESS" },
                            { value: "DONE", label: "DONE" },
                            { value: "CANCELLED", label: "CANCELLED" },
                            { value: "ARCHIVED", label: "ARCHIVED" },
                        ]}
                    />

                    <div className={styles.buttonGroup}>
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {editingTask ? "Update" : "Create"}
                        </Button>
                        {editingTask && (<Button type="button" onClick={handleDelete}>Delete</Button>)}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskFormModal;