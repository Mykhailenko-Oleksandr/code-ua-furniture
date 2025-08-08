/**
 * У файлі products-api.js зберігай функції для запитів на бекенд
 */

import axios from 'axios';
import { iziToastError } from './izi-toast';
import { API_BASE_URL, API_ENDPOINTS } from './constants';

axios.defaults.baseURL = API_BASE_URL;

// --- ФУНКЦІЯ ДЛЯ ОТРИМАННЯ ДАНИХ ТА ВІДКРИТТЯ МОДАЛКИ ---
export async function fetchProductDetails(id) {
    try {
        const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.FURNITURES}`);
        const furnitures = response.data.furnitures;
        const product = furnitures.find(item => item._id === id);
        return product;
    } catch (error) {
        iziToastError('Не вдалося завантажити інформацію про товар. Спробуйте ще раз');
        return null;
    }
}

export async function getFeedback() {
    const results = await axios(`${API_ENDPOINTS.FEEDBACKS}`, {
        params: {
            limit: 10
        }
    });
    return results.data.feedbacks;
}

