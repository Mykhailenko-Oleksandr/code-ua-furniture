

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let furnitureId = null;
let furnitureMarker = null;

export function openModal(id = null, marker = null) {
  const modalOverlay = document.querySelector('.modal-overlay');
  const form = document.querySelector('.modal-form');

  furnitureId = id;
  furnitureMarker = marker;

  modalOverlay?.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  form?.reset();

  const phoneInput = document.getElementById('phone');
  if (phoneInput) phoneInput.value = '+380';
}

function closeModal() {
  const modalOverlay = document.querySelector('.modal-overlay');
  const form = document.querySelector('.modal-form');
  modalOverlay?.classList.add('hidden');
  document.body.style.overflow = '';
  form?.reset();
}

document.addEventListener('DOMContentLoaded', () => {
  iziToast.success({ title: 'OK', message: 'Все працює!' });

  const modalOverlay = document.querySelector('.modal-overlay');
  const closeButton = document.querySelector('.modal-close');
  const form = document.querySelector('.modal-form');
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');

  // Додавання тимчасової кнопки
  const openModalTestBtn = document.getElementById('openModalTestBtn');
  openModalTestBtn?.addEventListener('click', () => openModal());

  closeButton?.addEventListener('click', closeModal);

  modalOverlay?.addEventListener('click', e => {
    if (e.target.classList.contains('modal-overlay')) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  function isValidPhone(phone) {
    return /^\+380\d{9}$/.test(phone);
  }

  function isValidName(name) {
    return /^[A-Za-zА-Яа-яІіЇїЄєҐґ\sʼ’\-]{2,}$/.test(name.trim());
  }

  nameInput?.addEventListener('input', () => {
    nameInput.value = nameInput.value.replace(/[^A-Za-zА-Яа-яІіЇїЄєҐґ\sʼ’\-]/g, '');
  });

  phoneInput?.addEventListener('beforeinput', event => {
    const selectionStart = phoneInput.selectionStart;
    const selectionEnd = phoneInput.selectionEnd;

    if (
      selectionStart === 0 &&
      selectionEnd === phoneInput.value.length &&
      event.inputType === 'deleteContentBackward'
    ) return;

    if (
      selectionStart <= 4 &&
      event.inputType === 'deleteContentBackward'
    ) event.preventDefault();
  });

  phoneInput?.addEventListener('paste', e => {
    e.preventDefault();
    const pastedData = (e.clipboardData || window.clipboardData).getData('text');
    let digits = pastedData.replace(/\D/g, '');

    if (digits.startsWith('380')) digits = digits.slice(3);
    else if (digits.startsWith('0')) digits = digits.slice(1);

    digits = digits.slice(0, 9);
    phoneInput.value = '+380' + digits;
  });

  phoneInput?.addEventListener('input', () => {
    let raw = phoneInput.value.replace(/\D/g, '');

    if (raw.length === 0) {
      phoneInput.value = '+380';
      return;
    }

    if (raw.startsWith('380')) raw = raw.slice(3);
    else if (raw.startsWith('0')) raw = raw.slice(1);

    raw = raw.slice(0, 9);
    phoneInput.value = '+380' + raw;
  });

  form?.addEventListener('submit', async e => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const comment = form.elements['comment'].value.trim();

    if (!isValidName(name)) {
      iziToast.error({ title: 'Помилка', message: 'Ім’я повинно містити хоча б 2 літери й бути без цифр' });
      return;
    }

    if (!isValidPhone(phone)) {
      iziToast.error({ title: 'Помилка', message: 'Телефон має бути у форматі +380XXXXXXXXX' });
      return;
    }

    const payload = { name, phone, comment, furnitureId, furnitureMarker };

    try {
      const response = await fetch('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Серверна помилка');
      iziToast.success({ title: 'Успішно', message: 'Заявку надіслано!' });
      closeModal();
    } catch (err) {
      iziToast.error({ title: 'Помилка', message: err.message });
    }
  });
});
