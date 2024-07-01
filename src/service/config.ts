import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

function apiConfig(baseURL: string): AxiosRequestConfig{
    return {
        baseURL: baseURL,
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function initAxios(config: AxiosRequestConfig, token?: any): AxiosInstance {
    const defineInstance = axios.create(config);
    
    // Interceptores de requisição
    defineInstance.interceptors.request.use(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (request: any) => {
            console.log(request)
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function api(baseURL="/api", token?: any){
    return initAxios(apiConfig(baseURL), token);
}