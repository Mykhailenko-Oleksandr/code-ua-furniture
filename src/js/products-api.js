/**
 * У файлі products-api.js зберігай функції для запитів на бекенд
 * API Documentation: https://furniture-store.b.goit.study/api-docs/
 */

import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from './constants';

// Базовая настройка axios
axios.defaults.baseURL = API_BASE_URL;

/**
 * Получить все товары мебели с фильтрацией и пагинацией
 * @param {Object} params - параметры запроса
 * @param {string} params.category - категория мебели
 * @param {number} params.page - номер страницы
 * @param {number} params.limit - количество товаров на странице
 * @returns {Promise} - данные о товарах
 */
export async function getFurnitures(params = {}) {
  try {
    const response = await axios.get(API_ENDPOINTS.FURNITURES, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching furnitures:', error);
    throw error;
  }
}

/**
 * Получить все категории мебели
 * @returns {Promise} - список категорий
 */
export async function getCategories() {
  try {
    const response = await axios.get(API_ENDPOINTS.CATEGORIES);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

/**
 * Создать новый заказ
 * @param {Object} orderData - данные заказа
 * @param {string} orderData.name - имя клиента
 * @param {string} orderData.email - email клиента
 * @param {string} orderData.phone - телефон клиента
 * @param {string} orderData.address - адрес доставки
 * @param {Array} orderData.products - массив товаров
 * @returns {Promise} - данные созданного заказа
 */
export async function createOrder(orderData) {
  try {
    const response = await axios.post(API_ENDPOINTS.ORDERS, orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

/**
 * Получить отзывы
 * @returns {Promise} - список отзывов
 */
export async function getFeedbacks() {
  try {
    const response = await axios.get(API_ENDPOINTS.FEEDBACKS);
    return response.data;
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    throw error;
  }
}

/**
 * Создать новый отзыв
 * @param {Object} feedbackData - данные отзыва
 * @param {string} feedbackData.name - имя автора
 * @param {string} feedbackData.email - email автора
 * @param {string} feedbackData.comment - текст отзыва
 * @param {number} feedbackData.rating - оценка (1-5)
 * @returns {Promise} - данные созданного отзыва
 */
export async function createFeedback(feedbackData) {
  try {
    const response = await axios.post(API_ENDPOINTS.FEEDBACKS, feedbackData);
    return response.data;
  } catch (error) {
    console.error('Error creating feedback:', error);
    throw error;
  }
}