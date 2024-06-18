import axiosInstance from './axiosConfig';

// Obtener todos los usuarios
export const getUsers = async (): Promise<unknown[]> => {
    const response = await axiosInstance.get('/api/Admin/users');
    return response.data;
};

// Obtener un usuario por ID
export const getUserById = async (id: string): Promise<unknown> => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
};

// Crear un nuevo usuario
export const createUser = async (userData: unknown): Promise<unknown> => {
    const response = await axiosInstance.post('/Tarea/list/${id}', userData);
    return response.data;
};

// Actualizar un usuario existente
export const updateUser = async (id: string, userData: unknown): Promise<unknown> => {
    const response = await axiosInstance.put(`/users/${id}`, userData);
    return response.data;
};

// Eliminar un usuario
export const deleteUser = async (id: string): Promise<unknown> => {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
};
