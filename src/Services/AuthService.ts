import axiosInstance from './axiosConfig';


interface LoginData {
    correo: string;
    contraseña: string; 
}

interface AuthResponse {
    token: string;
}

export const login = async (loginData: LoginData): Promise<void> => {
    try {
        const response = await axiosInstance.post<AuthResponse>('/Usuario/login', loginData);
        localStorage.setItem('token', response.data.token);
        console.log('Login successful');
    } catch (error) {
        console.error('Login failed:', error);
        throw new Error('Login failed');
    }
};

