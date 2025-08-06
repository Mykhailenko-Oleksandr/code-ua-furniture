/**
 * У файлі products-api.js зберігай функції для запитів на бекенд
 */

import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from './constants';

axios.defaults.baseURL = API_BASE_URL;

export async function getFeedback() {

    const results = await axios(`${API_ENDPOINTS.FEEDBACKS}`, {
        params: {
            limit: 10
        }
    });
    console.log(results.data.feedbacks);
    return results.data.feedbacks;
}