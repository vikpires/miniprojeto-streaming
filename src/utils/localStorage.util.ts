import { MediaType } from "@/model/mediaType.model";

export class LocalStorage {
    static getItem<T>(key: string): T | null {
        const item = localStorage.getItem(key);
        if (item) {
            const decodedItem = new TextDecoder().decode(Uint8Array.from(atob(item), c => c.charCodeAt(0)));
            return JSON.parse(decodedItem);
        }
        return null;
    }
    static setItem(key: string, value: MediaType): void {
        const encodedItem = btoa(new TextEncoder().encode(JSON.stringify(value)).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        localStorage.setItem(key, encodedItem);
    }          
    static removeItem(key: string): void {
        localStorage.removeItem(key);  
    }    
    static clear(): void {
        localStorage.clear();
    }
} 