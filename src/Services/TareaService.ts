import axiosInstance from './axiosConfig';

export interface Task {
    id: number;
    nombre: string;
    descripcion: string;
    estatus: string;
    fkUsuario: number;
}

interface ApiResponse {
    succeded: boolean;
    message: string | null;
    result: Task[];
}

export const getTasks = async (): Promise<Task[]> => {
    const response = await axiosInstance.get<ApiResponse>('/Tarea/list');
    return response.data.result;
};

export const getTaskById = async (id: number): Promise<Task> => {
    const response = await axiosInstance.get<ApiResponse>(`/Tarea/list/${id}`);
    return response.data.result[0];
};

export const createTask = async (taskData: Task): Promise<Task> => {
    const response = await axiosInstance.post<ApiResponse>('/Tarea/create', taskData);
    return response.data.result[0];
};

export const updateTask = async (id: number, taskData: Task): Promise<Task> => {
    const response = await axiosInstance.put<ApiResponse>(`/Tarea/update/${id}`, taskData);
    return response.data.result[0];
};

export const deleteTask = async (id: number): Promise<void> => {
    await axiosInstance.delete<ApiResponse>(`/Tarea/delete/${id}`);
};
