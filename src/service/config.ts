import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { ToastsMessages } from "@/utils/toast.utils";
import { ToastMessageOptions } from "primevue/toast";
import app from "../main"

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
        (error) => {
            app.config.globalProperties.$toast.add(ToastsMessages.showErrorToast() as ToastMessageOptions)
            return Promise.reject(error)
        }
    );

    // Interceptores de resposta
    defineInstance.interceptors.response.use (
        (response) => response, 
        (error: AxiosError) => {
            app.config.globalProperties.$toast.add(ToastsMessages.showErrorToast() as ToastMessageOptions)
            return Promise.reject(error);
        }
    );
    return defineInstance;    
}

export default function api(baseURL="/api", token?:string){
    return initAxios(apiConfig(baseURL), token);
}