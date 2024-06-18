import axiosInstance from './axiosConfig';


export const getPhotos = async (): Promise<unknown[]> => {
    const response = await axiosInstance.get('/Foto/list');
    return response.data;
};


export const getPhotoById = async (id: string): Promise<unknown> => {
    const response = await axiosInstance.get(`/Foto/list/${id}`);
    return response.data;
};


export const uploadPhoto = async (photoData: unknown): Promise<unknown> => {
    const response = await axiosInstance.post('/Foto/create', photoData);
    return response.data;
};

// Actualizar una foto existente
export const updatePhoto = async (id: string, photoData: unknown): Promise<unknown> => {
    const response = await axiosInstance.put(`/Foto/update/${id}`, photoData);
    return response.data;
};

// Eliminar una foto
export const deletePhoto = async (id: string): Promise<unknown> => {
    const response = await axiosInstance.delete(`/Foto/delete/${id}`);
    return response.data;
};
