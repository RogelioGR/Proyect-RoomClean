import axiosInstance from './axiosConfig';

export interface Photo {
    id?: number;
    fotoUrl: string;
    fkEvidencia?: number;
}

interface ApiResponse<T> {
    succeeded: boolean;
    message: string | null;
    result: T;
}

export const getPhotos = async (fkEvidencia: number): Promise<Photo[]> => {
    try {
        const response = await axiosInstance.get<ApiResponse<Photo[]>>(`/Foto/list/id?Id=${fkEvidencia}`);
        return response.data.result;
    } catch (error) {
        console.error("Error fetching photos:", error);
        throw error;
    }
};

export const getPhotoById = async (id: number): Promise<Photo> => {
    try {
        const response = await axiosInstance.get<ApiResponse<Photo>>(`/Foto/${id}`);
        return response.data.result;
    } catch (error) {
        console.error("Error fetching photo by id:", error);
        throw error;
    }
};

export const uploadPhoto = async (photoData: FormData): Promise<Photo> => {
    try {
        const response = await axiosInstance.post<ApiResponse<Photo>>('/Foto/create', photoData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.result;
    } catch (error) {
        console.error("Error uploading photo:", error);
        throw error;
    }
};

export const updatePhoto = async (id: number, photoData: Photo): Promise<Photo> => {
    try {
        const response = await axiosInstance.put<ApiResponse<Photo>>(`/Foto/update/${id}`, photoData);
        return response.data.result;
    } catch (error) {
        console.error("Error updating photo:", error);
        throw error;
    }
};

export const deletePhoto = async (id: number): Promise<void> => {
    try {
        await axiosInstance.delete<ApiResponse<void>>(`/Foto/delete/${id}`);
    } catch (error) {
        console.error("Error deleting photo:", error);
        throw error;
    }
};
