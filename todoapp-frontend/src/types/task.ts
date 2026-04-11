export type TaskCategory =
    | "GENERAL"
    | "WORK"
    | "PERSONAL"
    | "STUDY"
    | "HEALTH"
    | "FINANCE";

export type TaskState =
    | "TODO"
    | "IN_PROGRESS"
    | "DONE"
    | "CANCELLED"
    | "ARCHIVED";

export interface TaskResponse {
    id: string;
    title: string;
    description?: string | null;
    taskDate?: string | null;
    category: TaskCategory;
    state: TaskState;
    createdAt: string;
    updatedAt: string | null;
}

export interface CreateTaskRequest {
    title: string;
    description?: string | null;
    taskDate?: string | null;
    category?: TaskCategory;
    state?: TaskState;
}

export interface UpdateTaskRequest {
    title?: string;
    description?: string | null;
    taskDate?: string | null;
    category?: TaskCategory;
    state?: TaskState;
}

export interface UpdateTaskStateRequest {
    state: TaskState;
}

export interface TaskQueryParams {
    page?: number;
    size?: number;
    keyword?: string;
    category?: TaskCategory;
    state?: TaskState;
}

export interface TaskOption<T extends string> {
    value: T;
    label: string;
}

export const TASK_CATEGORY_OPTIONS: TaskOption<TaskCategory>[] = [
    { value: "GENERAL", label: "General" },
    { value: "WORK", label: "Work" },
    { value: "PERSONAL", label: "Personal" },
    { value: "STUDY", label: "Study" },
    { value: "HEALTH", label: "Health" },
    { value: "FINANCE", label: "Finance" },
];

export const TASK_STATE_OPTIONS: TaskOption<TaskState>[] = [
    { value: "TODO", label: "To do" },
    { value: "IN_PROGRESS", label: "In progress" },
    { value: "DONE", label: "Done" },
    { value: "CANCELLED", label: "Cancelled" },
    { value: "ARCHIVED", label: "Archived" },
];