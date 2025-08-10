
import { refs } from './refs';
import { postOrder } from './products-api';
import { iziToastError, iziToastSuccess } from './izi-toast';

let furnitureId = null;
let furnitureColor = null;
let closeTimer = null;
let isCloseBtn = null;
let isEmailInput = null;
let isPhoneInput = null;

export function openModalOrder(id = null, color = null) {
  furnitureId = id;
  furnitureColor = color;
  const form = document.querySelector('.modal-form');


  if (form && form.querySelector('.thank-you-message')) {
    form.innerHTML = `
       <div class="modal-field">
        <div class="input-wrap">
          <label for="email" class="modal-label">
            <p>E-mail*</p>
          </label>
          <input
            type="text"
            name="email"
            id="email"
            class="modal-input"
            placeholder="Ваш e-mail"
            autocomplete="email"
            required
          />

          <span class="text-valid">Дані введено вірно</span>
          <span class="text-invalid">Некоректний e-mail, спробуйте знову</span>
        </div>
      </div>
      <div class="modal-field">
        <div class="input-wrap">
          <label for="phone" class="modal-label">
            <p>Телефон*</p>
                      </label>
            <input name="phone" id="phone" type="tel" class="modal-input" placeholder="+380" required />

          <span class="text-valid">Дані введено вірно</span>
          <span class="text-invalid">Некоректний номер, спробуйте знову</span>
        </div>
      </div>
      <div class="modal-comment-field">
        <label for="comment" class="modal-comment-label">
          <p>Коментар</p>
          <textarea name="comment" id="comment" class="modal-comment-input modal-comment-textarea" placeholder="Введіть ваше повідомлення..."></textarea>
        </label>
      </div>
      <button type="submit" class="modal-submit-btn">Надіслати заявку</button>
    `;
  }

  const closeBtn = document.querySelector('.modal-close');
  const emailInput = form.querySelector('#email');
  const phoneInput = form.querySelector('#phone');

  isCloseBtn = closeBtn;
  isEmailInput = emailInput;
  isPhoneInput = phoneInput;

  refs.overlayOrderModal.classList.remove('hidden');
  refs.body.style.overflow = 'hidden';

  closeBtn?.addEventListener('click', closeModal);
  refs.overlayOrderModal.addEventListener('click', onBackdropClick);
  document.addEventListener('keydown', onEscapePress);




  if (phoneInput) {
    phoneInput.value = '+380';
    phoneInput.classList.remove('is-invalid', 'is-valid');
  }

  if (emailInput) {
    emailInput.classList.remove('is-invalid', 'is-valid');
  }

  emailInput.addEventListener('input', handleEmailValidation);
  phoneInput.addEventListener('input', handlePhoneValidation);
  form.addEventListener('submit', handleFormSubmit);
}

function closeModal() {

  const form = document.querySelector('.modal-form');

  if (refs.overlayOrderModal.classList.contains('hidden')) {
    return
  }

  refs.overlayOrderModal.classList.add('hidden');
  refs.body.style.overflow = '';
  form?.reset();

  if (closeTimer) {
    clearTimeout(closeTimer);
    closeTimer = null;
  }

  isCloseBtn?.removeEventListener('click', closeModal);
  refs.overlayOrderModal.removeEventListener('click', onBackdropClick);
  document.removeEventListener('keydown', onEscapePress);
  isEmailInput.removeEventListener('input', handleEmailValidation);
  isPhoneInput.removeEventListener('input', handlePhoneValidation);
  form.removeEventListener('submit', handleFormSubmit);

}



function onBackdropClick(e) {
  if (e.target.classList.contains('modal-overlay')) closeModal();
}

function onEscapePress(e) {
  if (e.key === 'Escape') closeModal();
}


function handleEmailValidation(e) {
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const emailInput = e.target;

  if (isValidEmail(emailInput.value.trim())) {
    emailInput.classList.add('is-valid');
    emailInput.classList.remove('is-invalid');
  } else {
    emailInput.classList.add('is-invalid');
    emailInput.classList.remove('is-valid');
  }
}

function handlePhoneValidation(e) {
  const phoneInput = e.target;
  const isValidPhone = phone => /^\+380\d{9}$/.test(phone);

  let value = phoneInput.value;
  let digits = value.slice(4).replace(/\D/g, '');
  digits = digits.slice(0, 9);
  phoneInput.value = '+380' + digits;

  if (isValidPhone(phoneInput.value)) {
    phoneInput.classList.add('is-valid');
    phoneInput.classList.remove('is-invalid');
  } else {
    phoneInput.classList.add('is-invalid');
    phoneInput.classList.remove('is-valid');
  }
}

async function handleFormSubmit(e) {
  const form = e.target;
  const email = form.elements.email.value.trim();
  const phone = form.elements.phone.value.trim();
  const comment = form.querySelector('#comment')?.value.trim() ?? '';
  const isValidPhone = (phone) => /^\+380\d{9}$/.test(phone);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  if (!form.classList.contains('modal-form')) {
    return;
  }
  e.preventDefault();

  if (form.querySelector('.thank-you-message')) {
    return;
  }

  if (!email || !phone) {
    iziToastError('Помилка: Елементи форми не знайдено')
    return;
  }


  if (!isValidEmail(email)) {
    iziToastError('Некоректний e-mail');
    isEmailInput.classList.add('is-invalid');
    return;
  }
  if (!isValidPhone(phone)) {
    iziToastError('Телефон має бути у форматі +380XXXXXXXXX');
    isPhoneInput.classList.add('is-invalid');
    return;
  }

  try {
    await awaitpostOrder({
      email,
      phone,
      modelId: furnitureId,
      color: furnitureColor,
      comment,
    });

    iziToastSuccess('Ваше замовлення успішно прийнято');

    form.innerHTML = `
      <div class="thank-you-message">
        <h3>Дякуємо за довіру!</h3>
        <p>Очікуйте на зворотний зв'язок.</p>
      </div>
    `;

    closeTimer = setTimeout(closeModal, 5000);
  } catch (error) {
    iziToastError('Помилка при відправці замовлення:', error)
  }
}
