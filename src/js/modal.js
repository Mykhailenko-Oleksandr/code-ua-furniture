import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let furnitureId = null;
let furnitureMarker = null;
let closeTimer = null;

export function openModal(id = null, marker = null) {
  const overlay = document.querySelector('.modal-overlay');
  const form = document.querySelector('.modal-form');

  furnitureId = id;
  furnitureMarker = marker;

  overlay?.classList.add('is-active');
  document.body.style.overflow = 'hidden';

  if (form && form.querySelector('.thank-you-message')) {
    form.innerHTML = `
      <div class="modal-field">
        <div class="input-wrap">
          <label for="email" class="modal-label">
            <p>E-mail*</p>
            <input type="text" name="email" id="email" class="modal-input" placeholder="Ваш e-mail" autocomplete="email" required />
          </label>
          <span class="text-valid" style="display: none;">Дані введено вірно</span>
          <span class="text-invalid" style="display: none;">Некоректний e-mail, спробуйте знову</span>
        </div>
      </div>
      <div class="modal-field">
        <div class="input-wrap">
          <label for="phone" class="modal-label">
            <p>Телефон*</p>
            <input name="phone" id="phone" type="tel" class="modal-input" placeholder="+380" required />
          </label>
          <span class="text-valid" style="display: none;">Дані введено вірно</span>
          <span class="text-invalid" style="display: none;">Некоректний номер, спробуйте знову</span>
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
  
  form?.reset();

  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');

  if (phoneInput) {
    phoneInput.value = '+380';
    phoneInput.classList.remove('is-invalid', 'is-valid');
  }
  if (emailInput) {
    emailInput.classList.remove('is-invalid', 'is-valid');
  }

  document.querySelectorAll('.text-valid, .text-invalid').forEach(el => el.style.display = 'none');
}

function closeModal() {
  const overlay = document.querySelector('.modal-overlay');

  overlay?.classList.remove('is-active');
  document.body.style.overflow = '';

  if (closeTimer) {
    clearTimeout(closeTimer);
    closeTimer = null;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('.modal-overlay');
  const closeBtn = document.querySelector('.modal-close');
  const testBtn = document.getElementById('openModalTestBtn');

  testBtn?.addEventListener('click', () => openModal());
  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isValidPhone = (phone) => /^\+380\d{9}$/.test(phone);

  document.addEventListener('input', (e) => {
    const form = e.target.closest('.modal-form');
    if (!form || form.querySelector('.thank-you-message')) {
      return;
    }
    
    if (e.target.id === 'email') {
      const emailInput = e.target;
      const wrapper = emailInput.closest('.input-wrap');
      const validMsg = wrapper.querySelector('.text-valid');
      const invalidMsg = wrapper.querySelector('.text-invalid');

      validMsg.style.display = 'none';
      invalidMsg.style.display = 'none';
      emailInput.classList.remove('is-valid', 'is-invalid');

      if (emailInput.value.trim() === '') return;

      if (isValidEmail(emailInput.value)) {
        emailInput.classList.add('is-valid');
        validMsg.style.display = 'block';
      } else {
        emailInput.classList.add('is-invalid');
        invalidMsg.style.display = 'block';
      }
    }

    if (e.target.id === 'phone') {
      const phoneInput = e.target;
      const PURE_PREFIX = '+380';
      const wrapper = phoneInput.closest('.input-wrap');
      const validMsg = wrapper.querySelector('.text-valid');
      const invalidMsg = wrapper.querySelector('.text-invalid');

      if (phoneInput.value.length < PURE_PREFIX.length || !phoneInput.value.startsWith(PURE_PREFIX)) {
        phoneInput.value = PURE_PREFIX;
      }

      let phoneNumber = phoneInput.value.replace(/\D/g, '').substring(3);
      if (phoneNumber.length > 9) phoneNumber = phoneNumber.substring(0, 9);
      phoneInput.value = PURE_PREFIX + phoneNumber;

      validMsg.style.display = 'none';
      invalidMsg.style.display = 'none';
      phoneInput.classList.remove('is-valid', 'is-invalid');

      if (phoneInput.value === PURE_PREFIX) return;
      
      if (isValidPhone(phoneInput.value)) {
        phoneInput.classList.add('is-valid');
        validMsg.style.display = 'block';
      } else {
        phoneInput.classList.add('is-invalid');
        invalidMsg.style.display = 'block';
      }
    }
  });

  document.addEventListener('submit', async (e) => {
    const form = e.target;
    if (!form.classList.contains('modal-form')) {
      return;
    }
    
    e.preventDefault();
    
    if (form.querySelector('.thank-you-message')) {
      return;
    }
    
    const emailInput = form.querySelector('#email');
    const phoneInput = form.querySelector('#phone');
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const comment = form.querySelector('#comment')?.value.trim() ?? '';

    if (!isValidEmail(email)) {
      iziToast.error({ title: 'Помилка', message: 'Некоректний e-mail' });
      return;
    }
    if (!isValidPhone(phone)) {
      iziToast.error({ title: 'Помилка', message: 'Телефон має бути у форматі +380XXXXXXXXX' });
      return;
    }

    console.log('Заявка успішно відправлена. Дані:', {
      email,
      phone,
      comment,
      furnitureId,
      furnitureMarker,
    });
    
    form.innerHTML = `
      <div class="thank-you-message">
        <h3>Дякуємо за довіру!</h3>
        <p>Очікуйте на зворотний зв'язок.</p>
      </div>
    `;

    closeTimer = setTimeout(closeModal, 5000);
  });
});