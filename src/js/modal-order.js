
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { refs } from './refs';
import { postOrder } from './products-api';

let furnitureId = null;
let furnitureColor = null;

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
            <input type="text" name="email" id="email" class="modal-input" placeholder="Ваш e-mail" autocomplete="email" required />
          </label>
          <span class="text-valid">Дані введено вірно</span>
          <span class="text-invalid">Некоректний e-mail, спробуйте знову</span>
        </div>
      </div>
      <div class="modal-field">
        <div class="input-wrap">
          <label for="phone" class="modal-label">
            <p>Телефон*</p>
            <input name="phone" id="phone" type="tel" class="modal-input" placeholder="+380" required />
          </label>
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
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');

  refs.overlayOrderModal.classList.remove('hidden');
  refs.body.style.overflow = 'hidden';

  closeBtn?.addEventListener('click', closeModal);
  refs.overlayOrderModal.addEventListener('click', onBackdropClick);
  document.addEventListener('keydown', onEscapePress);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isValidPhone = (phone) => /^\+380\d{9}$/.test(phone);

  if (phoneInput) {
    phoneInput.value = '+380';
    phoneInput.classList.remove('is-invalid', 'is-valid');
  }
  if (emailInput) {
    emailInput.classList.remove('is-invalid', 'is-valid');
  }

  document.addEventListener('input', (e) => {
    const form = e.target.closest('.modal-form');
    if (!form || form.querySelector('.thank-you-message')) {
      return;
    }

    const emailInput = form.querySelector('#email');
    const phoneInput = form.querySelector('#phone');

    if (e.target === emailInput) {
      if (isValidEmail(emailInput.value)) {
        emailInput.classList.add('is-valid');
        emailInput.classList.remove('is-invalid');
      } else {
        emailInput.classList.add('is-invalid');
        emailInput.classList.remove('is-valid');
      }
    }

    if (e.target === phoneInput) {
      let digits = phoneInput.value.replace(/\D/g, '');
      if (digits.startsWith('380')) digits = digits.slice(3);
      else if (digits.startsWith('0')) digits = digits.slice(1);
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
  });

  form.addEventListener('submit', async (e) => {
    const form = e.target;
    if (!form.classList.contains('modal-form')) {
      return;
    }


    if (form.querySelector('.thank-you-message')) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    const emailInput = form.querySelector('#email');
    const phoneInput = form.querySelector('#phone');

    if (!emailInput || !phoneInput) {
      console.error('Помилка: Елементи форми не знайдено.');
      return;
    }

    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const comment = form.querySelector('#comment')?.value.trim() ?? '';

    if (!isValidEmail(email)) {
      iziToast.error({ title: 'Помилка', message: 'Некоректний e-mail' });
      emailInput.classList.add('is-invalid');
      return;
    }
    if (!isValidPhone(phone)) {
      iziToast.error({ title: 'Помилка', message: 'Телефон має бути у форматі +380XXXXXXXXX' });
      phoneInput.classList.add('is-invalid');
      return;
    }

    postOrder({
      email,
      phone,
      modelId: furnitureId,
      color: furnitureColor,
      comment,
    })

    form.innerHTML = `
      <div class="thank-you-message">
        <h3>Дякуємо за довіру!</h3>
        <p>Очікуйте на зворотний зв'язок.</p>
      </div>
    `;

    setTimeout(closeModal, 5000);
  });
}

function closeModal() {

  const form = document.querySelector('.modal-form');

  if (refs.overlayOrderModal.classList.contains('hidden')) {
    return
  }

  console.log('ok');
  refs.overlayOrderModal.classList.add('hidden');
  refs.body.style.overflow = '';
  form?.reset();
}



function onBackdropClick(e) {
  if (e.target.classList.contains('modal-overlay')) closeModal();
}

function onEscapePress(e) {
  if (e.key === 'Escape') closeModal();
}
