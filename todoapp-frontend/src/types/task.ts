export type TaskCategory = "GENERAL" | "WORK" | "PERSONAL" | "STUDY" | "HEALTH" | "FINANCE";
export type TaskState = "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED" | "ARCHIVED";

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
    description?: string;
    taskDate?: string | null;
    category?: TaskCategory;
    state?: TaskState;
}

export interface UpdateTaskRequest {
    title?: string;
    description?: string;
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
