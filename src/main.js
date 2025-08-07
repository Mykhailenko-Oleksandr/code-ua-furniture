/**
 * У файлі main.js логіка сторінки Index (index.html)
 */

import { getFurnitures, getCategories, getFeedbacks } from './js/products-api.js';

// Инициализация приложения
document.addEventListener('DOMContentLoaded', initApp);

async function initApp() {
  console.log('🚀 Furniture Store App initialized');
  
  try {
    // Тестирование API подключения
    await testAPIConnection();
  } catch (error) {
    console.error('❌ API connection failed:', error);
  }
}

/**
 * Тестирование подключения к API
 */
async function testAPIConnection() {
  try {
    console.log('🔗 Testing API connection...');
    
    // Загружаем категории для проверки
    const categories = await getCategories();
    console.log('✅ Categories loaded:', categories);
    
    // Загружаем первые товары
    const furnitures = await getFurnitures({ limit: 4 });
    console.log('✅ Furnitures loaded:', furnitures);
    
    // Загружаем отзывы
    const feedbacks = await getFeedbacks();
    console.log('✅ Feedbacks loaded:', feedbacks);
    
    console.log('🎉 API connection successful!');
  } catch (error) {
    console.error('❌ API test failed:', error);
    throw error;
  }
}
