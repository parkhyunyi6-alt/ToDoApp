import axios from "axios";
import type { ApiResponse } from "../types/api";
import type {PageResponse} from "../types/page";
import type {
    CreateTaskRequest,
    TaskQueryParams,
    TaskResponse,
    UpdateTaskRequest,
    UpdateTaskStateRequest
} from "../types/task";

const taskApi = axios.create({
    baseURL: "http://localhost:8080"
});

export async function getTasks(
    params?: TaskQueryParams
): Promise<PageResponse<TaskResponse>> {
    const response = await taskApi.get<ApiResponse<PageResponse<TaskResponse>>>(
        "/api/tasks", { params }
    );
    return response.data.data;
}

export async function getTask(taskId: string): Promise<TaskResponse> {
    const response = await taskApi.get<ApiResponse<TaskResponse>>(
        `/api/tasks/${taskId}`
    );
    return response.data.data;
}

export async function createTask(
    request: CreateTaskRequest
): Promise<TaskResponse> {
    const response = await taskApi.post<ApiResponse<TaskResponse>>(
        "/api/tasks", request
    );
    return response.data.data;
}

export async function updateTask(
    taskId: string,
    request: UpdateTaskRequest
): Promise<TaskResponse> {
    const response = await taskApi.patch<ApiResponse<TaskResponse>>(
        `/api/tasks/${taskId}`, request
    );
    return response.data.data;
}

export async function updateTaskState(
    taskId: string,
    request: UpdateTaskStateRequest
): Promise<TaskResponse> {
    const response = await taskApi.patch<ApiResponse<TaskResponse>>(
        `/api/tasks/${taskId}/state`, request
    );
    return response.data.data;
}

export async function deleteTasks(taskId: string): Promise<void> {
    const response = await taskApi.delete(`/api/tasks/${taskId}`);
    return response.data;
}

export async function deleteTask(taskId: string): Promise<void> {
    await taskApi.delete(`/api/tasks/${taskId}`);
}

