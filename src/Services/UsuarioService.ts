import axiosInstance from './axiosConfig';

export const getUsers = async (): Promise<unknown[]> => {
    const response = await axiosInstance.get('/Usuario/list');
    return response.data;
};


export const getUserById = async (id: string): Promise<unknown> => {
    const response = await axiosInstance.get(`/Usuario/list/${id}`);
    return response.data;
};


export const createUser = async (userData: unknown): Promise<unknown> => {
    const response = await axiosInstance.post('/Usuario/create', userData);
    return response.data;
};


export const updateUser = async (id: string, userData: unknown): Promise<unknown> => {
    const response = await axiosInstance.put(`/Usuario/update/${id}`, userData);
    return response.data;
};


export const deleteUser = async (id: string): Promise<unknown> => {
    const response = await axiosInstance.delete(`/Usuario/delete/${id}`);
    return response.data;
};
