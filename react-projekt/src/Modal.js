// Modal.js
import { Modal } from 'antd';

// jednoduchá validace emailu
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateAndShow(values, showModal) {
    const { email, password } = values;

    // validace emailu
    if (!emailRegex.test(email)) {
        Modal.error({
            title: 'Chybný email',
            content: 'Zadejte prosím platný formát emailu.',
        });
        return;
    }

    // validace hesla
    if (!password || password.trim() === '') {
        Modal.error({
            title: 'Chybí heslo',
            content: 'Zadejte prosím heslo.',
        });
        return;
    }

    // pokud je vše OK → zobraz modal
    showModal();
}