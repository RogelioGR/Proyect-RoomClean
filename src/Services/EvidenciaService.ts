import axiosInstance from './axiosConfig';

export const getEvidences = async (): Promise<unknown[]> => {
    const response = await axiosInstance.get('/Evidencia/list');
    return response.data;
};

export const getEvidenceById = async (id: string): Promise<unknown> => {
    const response = await axiosInstance.get(`/Evidencia/list/${id}`);
    return response.data;
};


export const createEvidence = async (evidenceData: unknown): Promise<unknown> => {
    const response = await axiosInstance.post('/Evidencia/create', evidenceData);
    return response.data;
};


export const updateEvidence = async (id: string, evidenceData: unknown): Promise<unknown> => {
    const response = await axiosInstance.put(`/Evidencia/update/${id}`, evidenceData);
    return response.data;
};


export const deleteEvidence = async (id: string): Promise<unknown> => {
    const response = await axiosInstance.delete(`/Evidencia/delete/${id}`);
    return response.data;
};
