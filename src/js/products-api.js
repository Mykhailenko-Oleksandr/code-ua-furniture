/**
 * У файлі products-api.js зберігай функції для запитів на бекенд
 */

import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS, ITEMS_PER_PAGE } from './constants';

axios.defaults.baseURL = API_BASE_URL;

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
    const response = await axios.get(`${API_ENDPOINTS.FURNITURES}`, {
        params: {
            category,
            page,
            limit: `${ITEMS_PER_PAGE}`
        }
    })
    return response.data;
}

export async function getPopulatProduct() {
    const response = await axios.get(`${API_ENDPOINTS.FURNITURES}`, {
        params: {
            type: 'popular',
            limit: 15
        }
    })
    return response.data;
}

export function postOrder(obj) {
    const jsonObj = JSON.stringify(obj)
    console.log(jsonObj);

    // const response = axios.get(`${API_ENDPOINTS.ORDERS}`)
}