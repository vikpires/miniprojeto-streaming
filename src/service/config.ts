import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { ToastsMessages } from "@/utils/toast.utils";
import { ToastMessageOptions } from "primevue/toast";
import app from "../main";

function apiConfig(config: { baseURL?: string; } = {}): AxiosRequestConfig {
    const baseURL = config.baseURL || process.env.VUE_APP_BASE_URL;

    return {
        baseURL: baseURL || "/api",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    };
}

function initAxios(config: AxiosRequestConfig, token?: string): AxiosInstance {
    const defineInstance = axios.create(config);

    // Interceptores de requisição
    defineInstance.interceptors.request.use(
        (request) => {
            const bearerToken = process.env.VUE_APP_TOKEN || "";
            request.headers.Authorization = token ?? `Bearer ${bearerToken}`;
            return request;
        },
        (error) => {
            if (app?.config?.globalProperties?.$toast) {
                app.config.globalProperties.$toast.add(ToastsMessages.showErrorToast() as ToastMessageOptions);
            }
            return Promise.reject(error);
        }
    );

    // Interceptores de resposta
    defineInstance.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            if (app?.config?.globalProperties?.$toast) {
                app.config.globalProperties.$toast.add(ToastsMessages.showErrorToast() as ToastMessageOptions);
            }
            return Promise.reject(error);
        }
    );

    return defineInstance;
}

export default function api(baseURL: string = process.env.VUE_APP_BASE_URL || "/api", token?: string) {
    return initAxios(apiConfig({ baseURL }), token);
}
