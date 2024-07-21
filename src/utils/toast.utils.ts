/* eslint-disable @typescript-eslint/no-explicit-any */
export class ToastsMessages {
    static showSuccessToast(message: string, summary: string, context: any) {
        context.$toast.add({ severity: 'success', summary: summary, detail: message, life: 3000 });
    }

    static showErrorToast() {
       return { severity: 'error', summary: 'Erro', detail: 'Erro de conexão, tente novamente.', life: 3000 };
    }
}