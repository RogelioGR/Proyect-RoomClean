import axiosInstance from './axiosConfig';

export interface User {
    id?: number;
    nombre: string;
    apellido: string;
    número: string;
    correo: string;
    contraseña: string;
    foto: string | null;
    fkRol: number;
}

interface ApiResponse {
    succeded: boolean;
    message: string | null;
    result: User[];
}

export const getUsers = async (): Promise<User[]> => {
    const response = await axiosInstance.get<ApiResponse>('/Usuario/list');
    return response.data.result;
};

export const getUserById = async (id: number): Promise<User> => {
    const response = await axiosInstance.get<ApiResponse>(`/Usuario/list/${id}`);
    return response.data.result[0];
};

export const createUser = async (userData: User): Promise<User> => {
    const response = await axiosInstance.post<ApiResponse>('/Usuario/create', userData);
    console.log(response.data); // Aquí se imprime la respuesta del servidor
    return response.data.result[0];
};

export const updateUser = async (id: number, userData: User): Promise<User> => {
    const response = await axiosInstance.put<ApiResponse>(`/Usuario/update/${id}`, userData);
    return response.data.result[0];
};

export const deleteUser = async (id: number): Promise<void> => {
    await axiosInstance.delete<ApiResponse>(`/Usuario/delete/${id}`);
};
