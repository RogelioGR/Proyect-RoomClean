import axiosInstance from './axiosConfig';

export interface Item {
    id?: number;
    nombre: string;
    descripcion: string;
    cantidad: number;
}
interface ApiResponse {
    succeded: boolean;
    message: string | null;
    result: Item | Item[];
}

export const getItems = async (): Promise<Item[]> => {
    const response = await axiosInstance.get<ApiResponse>('/Inventario/list');
    return response.data.result as Item[];
};

export const getItemById = async (id: number): Promise<Item> => {
    const response = await axiosInstance.get<ApiResponse>(`/Inventario/${id}`);
    return response.data.result as Item;
};   

export const createItem = async (ItemData: Item): Promise<Item> => {
    const response = await axiosInstance.post<ApiResponse>('/Inventario/create', ItemData);
    return response.data.result as Item;
};

export const updateItem = async (id: number, ItemData: Item): Promise<Item> => {
    const response = await axiosInstance.put<ApiResponse>(`/Inventario/update/${id}`, ItemData);
    return response.data.result as Item;
};

export const deleteItem = async (id: number): Promise<void> => {
    await axiosInstance.delete<ApiResponse>(`/Inventario/delete/${id}`);
};