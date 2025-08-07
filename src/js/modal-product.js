// --- ІМПОРТИ ---
import Raty from 'raty-js';
import { API_BASE_URL, API_ENDPOINTS } from './constants';
import axios from 'axios';
import iziToast from 'izitoast';
import { refs } from './refs';
import { fetchProductDetails } from './products-api';
import { renderProductDetailsMarkup } from './render-function';

let activeProductId = null;


// --- ФУНКЦІЯ ВІДКРИТТЯ ВІКНА ---
export async function openProductModal(productId) {
  const product = await fetchProductDetails(productId);
  if (!product) {
    return;
  }

  activeProductId = productId;
  renderProductDetailsMarkup(product);

  refs.modalProduct.classList.add('is-open');
  refs.body.classList.add('no-scroll');

  // const ratingElement = document.querySelector('#product-rating');
  // if (ratingElement) {
  //   new Raty(ratingElement, {
  //     readOnly: true,
  //     score: product.rate,
  //     starHalf: './images/star-half.svg',
  //     starOff: './images/star-off.svg',
  //     starOn: './images/star-on.svg',
  //   });
  // }
}


















// --- ФУНКЦІЯ ЗАКРИТТЯ ВІКНА ---
function closeProductModal() {
  refs.modalProduct.classList.remove('is-open');
  refs.body.classList.remove('no-scroll');
  refs.modalDetailsContent.innerHTML = '';
  activeProductId = null;
}

// --- ОБРОБНИКИ ПОДІЙ


// Обработчик для закрытия по кнопке
if (refs.modalCloseBtn) {
  refs.modalCloseBtn.addEventListener('click', closeProductModal);
}

// Обработчик для закрытия по оверлею
refs.modalProduct.addEventListener('click', event => {
  if (event.target === refs.modalProduct) {
    closeProductModal();
  }
});

// Обработчик для закрытия по клавише Esc
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && refs.modalProduct.classList.contains('is-open')) {
    closeProductModal();
  }
});

//обробка події кліку на відкриття кнопки ордера
if (refs.modalOrderBtn) {
  refs.modalOrderBtn.addEventListener('click', () => {
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