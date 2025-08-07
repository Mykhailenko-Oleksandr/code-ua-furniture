// --- ІМПОРТИ ---
import Raty from 'raty-js';
import { API_BASE_URL, API_ENDPOINTS } from './constants';
import axios from 'axios';
import iziToast from 'izitoast';

// --- ЕЛЕМЕНТИ DOM (Тепер всі статичні елементи шукаємо одразу) ---
const modalProduct = document.querySelector('.modal-product');
const modalDetailsContent = document.querySelector('.modal-details-content');
const modalCloseBtn = document.querySelector('.modal-close-btn');
const modalOrderBtn = document.querySelector('.modal-order-btn');
const body = document.querySelector('body');

let activeProductId = null;

// --- ДОПОМІЖНІ ФУНКЦІЇ ---
function createColorsMarkup(colors) {
  return colors
    .map((color, index) => {
      const isChecked = index === 0 ? 'checked' : '';
      return `
      <li class="modal-color-item">
        <input type="radio" name="color" id="color-${index}" value="${color}" class="modal-color-input" ${isChecked}>
        <label for="color-${index}" class="modal-color-label" style="background-color: ${color};"></label>
      </li>
    `;
    })
    .join('');
}

function createGalleryThumbsMarkup(images) {
  return images
    .slice(1)
    .map(
      image => `
    <div class="modal-gallery-thumb">
      <img src="${image}" alt="Мініатюра товару" class="modal-thumb-image">
    </div>
  `
    )
    .join('');
}

// --- ФУНКЦІЯ ДЛЯ ГЕНЕРАЦІЇ HTML-РОЗМІТКИ ТОВАРУ ---
function createProductDetailsMarkup(product) {
  const mainImage = product.images[0];
  const galleryThumbs =
    product.images.length > 1 ? createGalleryThumbsMarkup(product.images) : '';
  return `
    <div class="modal-body-content">
      <div class="modal-gallery">
        <div class="modal-main-image-wrap">
          <img class="modal-main-image" src="${mainImage}" alt="${
    product.name
  }">
        </div>
        
        <div class="modal-gallery-thumbs-list">
          ${galleryThumbs}
        </div>
      </div>
      
      <div class="modal-details-info">
        <h2 class="modal-product-name">${product.name}</h2>
        <p class="modal-product-category">${product.category.name}</p>

        <div class="modal-price-rating-wrap">
          <span class="modal-product-price">${product.price} грн</span>
          <div class="modal-rating">
            <div id="product-rating"></div>
          </div>
        </div>

        <div class="modal-colors-wrap">
          <p class="modal-colors-label">Доступні кольори:</p>
          <ul class="modal-colors-list">
            ${createColorsMarkup(product.color)}
          </ul>
        </div>
        
        <div class="modal-description-dimensions">
          <p class="modal-product-description">${product.description}</p>
          <ul class="modal-dimensions-list">
            <li class="modal-dimension-item">Розміри: <span class="modal-product-dimensions">${
              product.sizes
            }</span></li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

// --- ФУНКЦІЯ ДЛЯ ОТРИМАННЯ ДАНИХ ТА ВІДКРИТТЯ МОДАЛКИ ---
async function fetchProductDetails(id) {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINTS.FURNITURES}`;
    const response = await axios.get(url);
    const furnitures = response.data.furnitures;
    const product = furnitures.find(item => item._id === id);
    return product;
  } catch (error) {
    console.error(`Помилка при отриманні даних про товар:`, error);
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити інформацію про товар. Спробуйте ще раз.',
      position: 'topRight',
    });
    return null;
  }
}

// --- ФУНКЦІЯ ВІДКРИТТЯ ВІКНА ---
async function openProductModal(productId) {
  const product = await fetchProductDetails(productId);
  if (!product) {
    return;
  }
  activeProductId = productId;
  const markup = createProductDetailsMarkup(product);
  modalDetailsContent.innerHTML = markup;

  modalProduct.classList.add('is-open');
  body.classList.add('no-scroll');

  const ratingElement = document.querySelector('#product-rating');
  if (ratingElement) {
    new Raty(ratingElement, {
      readOnly: true,
      score: product.rate,
      starHalf: './images/star-half.svg',
      starOff: './images/star-off.svg',
      starOn: './images/star-on.svg',
    });
  }
}

// --- ФУНКЦІЯ ЗАКРИТТЯ ВІКНА ---
function closeProductModal() {
  modalProduct.classList.remove('is-open');
  body.classList.remove('no-scroll');
  modalDetailsContent.innerHTML = '';
  activeProductId = null;
}

// --- ОБРОБНИКИ ПОДІЙ
// у футері.хтмл поставила кнопку тест бтн
// Тестовая кнопка
const testBtn = document.querySelector('#test-modal-btn');
const tempProductId = '682f9bbf8acbdf505592ac36';

if (testBtn) {
  testBtn.addEventListener('click', () => {
    openProductModal(tempProductId);
  });
}
// тестовий продукт ліст
const productsList = document.querySelector('.products-list');
if (productsList) {
  productsList.addEventListener('click', event => {
    const productCard = event.target.closest('.product-card');
    if (productCard) {
      const productId = productCard.dataset.id;
      openProductModal(productId);
    }
  });
}

// Обработчик для закрытия по кнопке
if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeProductModal);
}

// Обработчик для закрытия по оверлею
modalProduct.addEventListener('click', event => {
  if (event.target === modalProduct) {
    closeProductModal();
  }
});

// Обработчик для закрытия по клавише Esc
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modalProduct.classList.contains('is-open')) {
    closeProductModal();
  }
});

//обробка події кліку на відкриття кнопки ордера
if (modalOrderBtn) {
  modalOrderBtn.addEventListener('click', () => {
    const selectedColorInput = document.querySelector(
      'input[name="color"]:checked'
    );
    const selectedColor = selectedColorInput ? selectedColorInput.value : null;

    if (activeProductId && selectedColor) {
      // зараз вивела в консоль ці данні
      console.log(`Обрано товар з ID: ${activeProductId}`);
      console.log(`Обрано колір: ${selectedColor}`);

      closeProductModal();
      // openOrderModal(); - фукнція відкриття модалки ордера
    } else {
      iziToast.error({
        title: 'Помилка',
        message: 'Будь ласка, оберіть колір.',
        position: 'topRight',
      });
    }
  });
}
