/**
 * У файлі main.js логіка сторінки Index (index.html)
 */
import { openProductModal } from "./js/modal-product";

// у футері.хтмл поставила кнопку тест бтн
// Тестовая кнопка
const testBtn = document.querySelector('#test-modal-btn');
const tempProductId = '682f9bbf8acbdf505592ac36';

if (testBtn) {
    testBtn.addEventListener('click', () => {
        openProductModal(tempProductId);
    });
}