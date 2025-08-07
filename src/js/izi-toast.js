/**
 * У файлі izi-toast.js зберігай функції зв'язані з бібліотекою iziToast
 */

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import iconError from './img/error.svg'

export function iziToastError(message) {
    return iziToast.error({
        message: message,
        messageColor: '#fff',
        messageSize: '16',
        messageLineHeight: '24',
        backgroundColor: '#ef4040',
        iconUrl: iconError,
        position: 'topRight',
        progressBarColor: '#b51b1b',
        theme: 'dark',
    });
}