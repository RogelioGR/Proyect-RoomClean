import axiosInstance from './axiosConfig';

export interface Evidence {
    id: number;
    comentarios: string;
    fkTarea: number;
}

interface ApiResponse {
    succeded: boolean;
    message: string | null;
    result: Evidence[];
}

export const getEvidences = async (): Promise<Evidence[]> => {
    const response = await axiosInstance.get<ApiResponse>('/Evidencia/list');
    return response.data.result;
};

export const getEvidenceById = async (id: number): Promise<Evidence> => {
    const response = await axiosInstance.get<ApiResponse>(`/Evidencia/list/${id}`);
    return response.data.result[0];
};

export const createEvidence = async (evidenceData: Evidence): Promise<Evidence> => {
    const response = await axiosInstance.post<ApiResponse>('/Evidencia/create', evidenceData);
    return response.data.result[0];
};

export const updateEvidence = async (id: number, evidenceData: Evidence): Promise<Evidence> => {
    const response = await axiosInstance.put<ApiResponse>(`/Evidencia/update/${id}`, evidenceData);
    return response.data.result[0];
};

export const deleteEvidence = async (id: number): Promise<void> => {
    await axiosInstance.delete<ApiResponse>(`/Evidencia/delete/${id}`);
};
