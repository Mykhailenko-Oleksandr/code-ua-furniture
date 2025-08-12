
import { refs } from './refs';
import { postOrder } from './products-api';
import { iziToastError, iziToastSuccess } from './izi-toast';
import { onBackdropClick, onEscapePress } from './helpers';
import { renderModalSuccess } from './render-function';

let furnitureId = null;
let furnitureColor = null;
let modalCloseBtn = null;
let closeInfoModalBtn = null;
let modalEmailInput = null;
let modalPhoneInput = null;
let modalTextarea = null;

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
const isValidPhone = phone => /^[0-9]{12}$/.test(phone);

export function openModalOrder(id = null, color = null) {
  furnitureId = id;
  furnitureColor = color;

  refs.modalOrder.classList.add('is-open');
  refs.body.classList.add('no-scroll');

  modalCloseBtn = document.querySelector('.close-order');
  modalEmailInput = refs.modalOrderForm.querySelector('#email');
  modalPhoneInput = refs.modalOrderForm.querySelector('#phone');
  modalTextarea = refs.modalOrderForm.querySelector('#comment');

  modalEmailInput.classList.remove('is-invalid', 'is-valid');
  modalPhoneInput.classList.remove('is-invalid', 'is-valid');
  modalTextarea.classList.remove('is-invalid', 'is-valid');

  modalCloseBtn.addEventListener('click', closeModalOrder);
  refs.modalOrder.addEventListener('click', onBackdropClick);
  document.addEventListener('keydown', onEscapePress);

  modalEmailInput.addEventListener('input', handleEmailValidation);
  modalPhoneInput.addEventListener('input', handlePhoneValidation);
  modalTextarea.addEventListener('input', handleCommentValidation);
  refs.modalOrderForm.addEventListener('submit', handleFormSubmit);
}

export function closeModalOrder(event) {
  modalCloseBtn.removeEventListener('click', closeModalOrder);
  refs.modalOrder.removeEventListener('click', onBackdropClick);
  document.removeEventListener('keydown', onEscapePress);
  modalEmailInput.removeEventListener('input', handleEmailValidation);
  modalPhoneInput.removeEventListener('input', handlePhoneValidation);
  modalTextarea.removeEventListener('input', handleCommentValidation);

  refs.modalOrder.classList.remove('is-open');
  refs.body.classList.remove('no-scroll');
  refs.modalOrderForm.reset();
}

function handleEmailValidation(event) {
  if (isValidEmail(modalEmailInput.value.trim())) {
    modalEmailInput.classList.add('is-valid');
    modalEmailInput.classList.remove('is-invalid');
  } else {
    modalEmailInput.classList.add('is-invalid');
    modalEmailInput.classList.remove('is-valid');
  }

}

function handlePhoneValidation(event) {
  modalPhoneInput.value = modalPhoneInput.value
    .replace(/\D/g, '')
    .slice(0, 12);

  if (isValidPhone(modalPhoneInput.value)) {
    modalPhoneInput.classList.add('is-valid');
    modalPhoneInput.classList.remove('is-invalid');
  } else {
    modalPhoneInput.classList.add('is-invalid');
    modalPhoneInput.classList.remove('is-valid');
  }
}

function handleCommentValidation(event) {
  if (modalTextarea.value.length >= 5) {
    modalTextarea.classList.add('is-valid');
    modalTextarea.classList.remove('is-invalid');
  } else {
    modalTextarea.classList.add('is-invalid');
    modalTextarea.classList.remove('is-valid');
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const emailValue = modalEmailInput.value.trim()
  const phoneValue = modalPhoneInput.value.trim()
  const commentValue = modalTextarea.value.trim()

  if (!emailValue || !phoneValue || !commentValue) {
    iziToastError('Заповніть всі поля форми')
    return;
  }

  if (!isValidEmail(emailValue)) {
    iziToastError('Некоректний e-mail');
    modalEmailInput.classList.add('is-invalid');
    return;
  }
  if (!isValidPhone(phoneValue)) {
    iziToastError('Телефон має бути у форматі 380XXXXXXXXX');
    modalPhoneInput.classList.add('is-invalid');
    return;
  }
  if (commentValue.length < 5) {
    iziToastError('Коментар не може бути меньним за 5 символів')
    modalTextarea.classList.add('is-invalid');
    return;
  }

  const order = {
    email: emailValue,
    phone: phoneValue,
    modelId: furnitureId,
    color: furnitureColor,
    comment: commentValue
  }

  try {
    const orderSuccess = await postOrder(order);

    iziToastSuccess(`Ваше замовлення успішно прийнято`);
    closeModalOrder();

    renderModalSuccess(orderSuccess);
  } catch (error) {
    iziToastError(error.message);
    return;
  }

  refs.modalOrderSuccess.classList.add('is-open');

  closeInfoModalBtn = refs.modalOrderSuccess.querySelector('.close-order-info');

  closeInfoModalBtn.addEventListener('click', onCloseInfoModal);
  refs.modalOrderSuccess.addEventListener('click', onBackdropClick);
  document.addEventListener('keydown', onEscapePress);

}

export function onCloseInfoModal() {
  refs.modalOrderSuccess.classList.remove('is-open');

  closeInfoModalBtn.removeEventListener('click', onCloseInfoModal);
  refs.modalOrderSuccess.removeEventListener('click', onBackdropClick);
  document.removeEventListener('keydown', onEscapePress);
}