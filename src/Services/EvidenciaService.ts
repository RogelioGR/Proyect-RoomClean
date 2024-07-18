import axiosInstance from './axiosConfig';

export interface Evidence {
    id?: number;
    comentarios: string;
    fkTarea?: number;
    completedDescriptions: boolean[]; 
}

interface ApiResponse {
    succeeded: boolean;
    message: string | null;
    result: Evidence[] | Evidence;
}

export const getEvidences = async (fkTarea: number): Promise<Evidence[]> => {
    const response = await axiosInstance.get<ApiResponse>(`/Evidencia/list/id?Id=${fkTarea}`);
    return response.data.result as Evidence[];
};

export const getEvidenceById = async (id: string): Promise<Evidence> => {
    const response = await axiosInstance.get<ApiResponse>(`/Evidencia/list/${id}`);
    return response.data.result as Evidence;
};

export const createEvidence = async (evidenceData: Evidence): Promise<Evidence> => {
    const response = await axiosInstance.post<ApiResponse>('/Evidencia/create', evidenceData);
    return response.data.result as Evidence;
};

export const updateEvidence = async (id: number, evidenceData: Evidence): Promise<Evidence> => {
    const response = await axiosInstance.put<ApiResponse>(`/Evidencia/update/${id}`, evidenceData);
    return response.data.result as Evidence;
};

export const deleteEvidence = async (id: number): Promise<void> => {
    await axiosInstance.delete<ApiResponse>(`/Evidencia/delete/${id}`);
};
