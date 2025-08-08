/**
 * У файлі main.js логіка сторінки Index (index.html)
 */


import { initHomePage } from "./js/handlers";
import { refs } from "./js/refs";
import { openProductModal } from "./js/modal-product";

document.addEventListener('DOMContentLoaded', initHomePage);

// у футері.хтмл поставила кнопку тест бтн
// Тестовая кнопка
const testBtn = document.querySelector('#test-modal-btn');
const tempProductId = '682f9bbf8acbdf505592ac36';

if (testBtn) {
    testBtn.addEventListener('click', () => {
        openProductModal(tempProductId);
    });
}
