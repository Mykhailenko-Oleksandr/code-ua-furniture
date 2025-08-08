/**
 * У файлі izi-toast.js зберігай функції зв'язані з бібліотекою iziToast
 */

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import iconError from '../img/error.svg'

export function iziToastError(message) {
    return iziToast.error({
        message: message,
        messageColor: '#fff',
        messageSize: '16',
        messageLineHeight: '24',
        backgroundColor: '#6b0609',
        iconUrl: iconError,
        position: 'topRight',
        progressBarColor: '#420406ff',
        theme: 'dark',
    });
}