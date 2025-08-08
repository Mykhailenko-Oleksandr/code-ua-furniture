/**
 * У файлі products-api.js зберігай функції для запитів на бекенд
 */

import axios from 'axios';
import { iziToastError } from './izi-toast';
import { API_BASE_URL, API_ENDPOINTS, ITEMS_PER_PAGE } from './constants';

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

export async function getCategoriesByQuery() {
    const response = await axios.get(`${API_ENDPOINTS.CATEGORIES}`)
    return response.data
}

export async function getAllItemsByQuery(page) {
    const response = await axios.get(`${API_ENDPOINTS.FURNITURES}`, {
        params: {
            limit: `${ITEMS_PER_PAGE}`,
            page
        }
    })
    return response.data
}

export async function getItemsByQuery(category, page) {
    const response = await axios.get('https://furniture-store.b.goit.study/api/furnitures', {
        params: {
            category,
            page,
            limit: 8
        }
    })
    return response.data
}