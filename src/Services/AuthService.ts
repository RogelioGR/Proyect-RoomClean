import axiosInstance from './axiosConfig';

interface LoginData {
    correo: string;
    contraseña: string; 
}

interface AuthResponse {
    token: string;
    rol: string; 
}

export const login = async (loginData: LoginData): Promise<void> => {
    try {
        const response = await axiosInstance.post<AuthResponse>('/Usuario/login', loginData);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('rol', response.data.rol); 
        console.log('Inicio de sesión exitoso');
    } catch (error) {
        console.error('Ocurrio un error en el inicio de sesión:', error);
        throw new Error('Error de inicio de sesion');
    }
};
