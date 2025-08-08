import { refs } from './refs';
import { renderProductDetailsMarkup } from './render-function';
import { iziToastError } from './izi-toast';
import { allLaodProduct } from './handlers';

let activeProductId = null;
let modalCloseBtn = null;
let modalOrderBtn = null;

// --- ФУНКЦІЯ ВІДКРИТТЯ ВІКНА ---
export function openProductModal(productId) {
  const product = allLaodProduct.find(item => item._id === productId);

  activeProductId = productId;
  renderProductDetailsMarkup(product);

  refs.modalProduct.classList.add('is-open');
  refs.body.classList.add('no-scroll');

  modalCloseBtn = refs.modalProduct.querySelector('.modal-close-btn');
  modalOrderBtn = refs.modalProduct.querySelector('.modal-order-btn');

  modalCloseBtn.addEventListener('click', closeProductModal);
  refs.modalProduct.addEventListener('click', onBackdropClick);
  document.addEventListener('keydown', onEscapePress);
  modalOrderBtn.addEventListener('click', onOrderBtnClick)
}

function onBackdropClick(event) {
  if (event.target === refs.modalProduct) {
    closeProductModal();
  }
}

function onEscapePress(event) {
  if (event.key === 'Escape' && refs.modalProduct.classList.contains('is-open')) {
    closeProductModal();
  }
}

// --- ФУНКЦІЯ ЗАКРИТТЯ ВІКНА ---
function closeProductModal() {
  modalCloseBtn.removeEventListener('click', closeProductModal);
  refs.modalProduct.removeEventListener('click', onBackdropClick);
  document.removeEventListener('keydown', onEscapePress);
  modalOrderBtn.addEventListener('click', onOrderBtnClick);
  refs.modalProduct.classList.remove('is-open');
  refs.body.classList.remove('no-scroll');
  refs.modalDetailsContent.innerHTML = '';
  activeProductId = null;
  modalCloseBtn = null;
  modalOrderBtn = null;
}

function onOrderBtnClick() {
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
    iziToastError('Будь ласка, оберіть колір')
  }
}







// тестовий продукт ліст
// const productsList = document.querySelector('.products-list');
// if (productsList) {
//   productsList.addEventListener('click', event => {
//     const productCard = event.target.closest('.product-card');
//     if (productCard) {
//       const productId = productCard.dataset.id;
//       openProductModal(productId);
//     }
//   });
// }