import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

function apiConfig(baseURL: string): AxiosRequestConfig{
    return {
        baseURL: baseURL,
    };
}

function initAxios(config: AxiosRequestConfig, token?: string): AxiosInstance {
    const defineInstance = axios.create(config);
    
    // Interceptores de requisição
    defineInstance.interceptors.request.use(
        (request) => {
            request.headers.Authorization = token??`Bearer ${process.env.VUE_APP_TOKEN}`
            return request;
        },
        (error) => Promise.reject(error)
    );

    // Interceptores de resposta
    defineInstance.interceptors.response.use (
        (response) => response, 
        (error: AxiosError) => {
            alert(error);
            return Promise.reject(error);
        }
    );
    return defineInstance;    
}

export default function api(baseURL="/api", token?:string){
    return initAxios(apiConfig(baseURL), token);
}