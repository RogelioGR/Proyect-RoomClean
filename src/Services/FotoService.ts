import axiosInstance from './axiosConfig';

export interface Photo {
    id: number;
    fotoUrl: string;
    fkEvidencia: number;
}

interface ApiResponse {
    succeded: boolean;
    message: string | null;
    result: Photo[];
}

export const getPhotos = async (): Promise<Photo[]> => {
    const response = await axiosInstance.get<ApiResponse>('/Foto/list');
    return response.data.result;
};

export const getPhotoById = async (id: number): Promise<Photo> => {
    const response = await axiosInstance.get<ApiResponse>(`/Foto/list/${id}`);
    return response.data.result[0];
};

export const uploadPhoto = async (photoData: Photo): Promise<Photo> => {
    const response = await axiosInstance.post<ApiResponse>('/Foto/create', photoData);
    return response.data.result[0];
};

export const updatePhoto = async (id: number, photoData: Photo): Promise<Photo> => {
    const response = await axiosInstance.put<ApiResponse>(`/Foto/update/${id}`, photoData);
    return response.data.result[0];
};

export const deletePhoto = async (id: number): Promise<void> => {
    await axiosInstance.delete<ApiResponse>(`/Foto/delete/${id}`);
};
