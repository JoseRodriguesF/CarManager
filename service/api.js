import axios from 'axios';

// Criando uma instância do axios com a URL base da sua API
const api = axios.create({
    baseURL: 'https://carmanager-jftp.onrender.com/api',
    timeout: 30000, // 30 segundos de timeout
    headers: {
        'Accept': '*/*'
    }
});

// Interceptor para retry em caso de erro de rede
api.interceptors.response.use(undefined, async (err) => {
    const { config } = err;
    if (!config || !config.retry) {
        return Promise.reject(err);
    }
    config.retry -= 1;
    const delayRetry = new Promise(resolve => setTimeout(resolve, 1000));
    await delayRetry;
    return api(config);
});

// Funções para operações CRUD
export const getAllCars = () => {
    return api.get('/carros');
};

export const getCarById = (id) => {
    return api.get(`/carros/${id}`);
};

export const createCar = (formData) => {
    // Garantir que o Content-Type seja definido corretamente
    const headers = {
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        'Accept': 'application/json'
    };

    return api.post('/carros', formData, {
        headers,
        transformRequest: [(data) => data], // Impede o Axios de tentar transformar o FormData
        retry: 3
    });
};

export const updateCar = async (id, formData) => {
    // Garantir que o Content-Type seja definido corretamente
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Accept': '*/*'
    };

    try {
        const response = await api.put(`/carros/${id}`, formData, {
            headers,
            transformRequest: [(data) => data], // Impede o Axios de tentar transformar o FormData
            timeout: 10000, // 10 segundos de timeout
            retry: 3,
            retryDelay: 1000
        });
        return response;
    } catch (error) {
        if (error.message === 'Network Error') {
            throw new Error('Erro de conexão. Por favor, verifique sua internet e tente novamente.');
        }
        throw error;
    }
};

export const deleteCar = (id) => {
    return api.delete(`/carros/${id}`);
};

export default api;