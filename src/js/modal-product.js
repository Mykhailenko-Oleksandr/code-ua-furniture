import { refs } from './refs';
import { renderProductDetailsMarkup } from './render-function';
import { iziToastError } from './izi-toast';
import { allLaodProduct } from './handlers';
import { onBackdropClick, onEscapePress } from './helpers';
import { openModalOrder } from './modal-order';

let activeProductId = null;
let modalCloseBtn = null;
let modalOrderBtn = null;

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

export function closeProductModal() {
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
    openModalOrder(activeProductId, selectedColor);
    closeProductModal();
  } else {
    iziToastError('Будь ласка, оберіть колір')
  }
}

