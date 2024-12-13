type ToastType = 'success' | 'error';

interface ToastBase {
    severity?: ToastType;
    summary?: string;
    detail?: string;
    life?: number;
}

interface ToastContext {
    $toast: {
        add: (message: ToastBase) => void;
    };
}

export class ToastMessages {
    public static showSuccessToast(message: string, summary: string, context: ToastContext): void {
        context.$toast.add({
            severity: 'success',
            summary: summary,
            detail: message,
            life: 3000
        });
    }

    public static showErrorToast(): ToastBase {
        return {
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro de conexão, tente novamente.',
            life: 3000
        };
    }
}
