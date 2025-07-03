import { create } from 'zustand';

type AlertState = {
    isOpen: boolean;
    message: string;
};

type AlertStore = AlertState & {
    show: (message: string) => void;
    hide: () => void;
};

export const useAlertStore = create<AlertStore>((set) => ({
    isOpen: false,
    message: '',
    show: (message) => set({ isOpen: true, message: message }),
    hide: () => {
        set({ isOpen: false, message: '' });
        document.body.focus();
    }
}));

// 어디서든 alertBox.show('메시지') 형태로 호출할 수 있는 객체
export const alertBox = {
    show: (message: string) => useAlertStore.getState().show(message)
};
