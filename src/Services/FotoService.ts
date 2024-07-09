import axiosInstance from './axiosConfig';

export interface Photo {
    id?: number;
    fotoUrl: string;
    fkEvidencia?: number;
}

interface ApiResponse{
    succeeded: boolean;
    message: string | null;
    result: Photo | Photo[];
}

export const getPhotos = async (fkEvidencia: number): Promise<Photo[]> => {
    try {
        const response = await axiosInstance.get<ApiResponse>(`/Foto/list/id?Id=${fkEvidencia}`);
        return response.data.result as Photo[];
    } catch (error) {
        console.error("Error fetching photos:", error);
        throw error;
    }
};

export const getPhotoById = async (id: number): Promise<Photo> => {
    try {
        const response = await axiosInstance.get<ApiResponse>(`/Foto/${id}`);
        return response.data.result as Photo;
    } catch (error) {
        console.error("Error fetching photo by id:", error);
        throw error;
    }
};

export const uploadPhoto = async (photoData: FormData): Promise<Photo> => {
    try {
        const response = await axiosInstance.post<ApiResponse>('/Foto/create', photoData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.result as Photo;
    } catch (error) {
        console.error("Error uploading photo:", error);
        throw error;
    }
};

export const updatePhoto = async (id: number, photoData: Photo): Promise<Photo> => {
    try {
        const response = await axiosInstance.put<ApiResponse>(`/Foto/update/${id}`, photoData);
        return response.data.result as Photo;
    } catch (error) {
        console.error("Error updating photo:", error);
        throw error;
    }
};

export const deletePhoto = async (id: number): Promise<void> => {
    try {
        await axiosInstance.delete<ApiResponse>(`/Foto/delete/${id}`);
    } catch (error) {
        console.error("Error deleting photo:", error);
        throw error;
    }
};
