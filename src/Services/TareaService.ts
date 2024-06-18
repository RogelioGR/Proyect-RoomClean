import axiosInstance from './axiosConfig';


export const getTasks = async (): Promise<unknown[]> => {
    const response = await axiosInstance.get('/Tarea/list');
    return response.data;
};


export const getTaskById = async (id: string): Promise<unknown> => {
    const response = await axiosInstance.get(`/Tarea/list/${id}`);
    return response.data;
};


export const createTask = async (taskData: unknown): Promise<unknown> => {
    const response = await axiosInstance.post('/Tarea/create', taskData);
    return response.data;
};


export const updateTask = async (id: string, taskData: unknown): Promise<unknown> => {
    const response = await axiosInstance.put(`/Tarea/update/${id}`, taskData);
    return response.data;
};


export const deleteTask = async (id: string): Promise<unknown> => {
    const response = await axiosInstance.delete(`/Tarea/delete/${id}`);
    return response.data;
};
