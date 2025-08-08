/**
 * У файлі helpers.js зберігай допоміжні функції, які знадобляться для реалізації завдання
 */

import Raty from 'raty-js';
import { refs } from './refs';
import { handleLoadMore } from './handlers';
import { localStorageThemeToggle } from './local-storage';

export function createGalleryThumbsMarkup(images) {
    return images
        .slice(1)
        .map(
            image => `
      <img src="${image}" alt="Мініатюра товару" class="modal-thumb-image">
  `).join('');
}

export function createColorsMarkup(colors) {
    return colors
        .map((color, index) => {
            const isChecked = index === 0 ? 'checked' : '';
            return `
      <li class="modal-color-item">
        <input type="radio" name="color" id="color-${index}" value="${color}" class="modal-color-input" ${isChecked}>
        <label for="color-${index}" class="modal-color-label" style="background-color: ${color};"></label>
      </li>
    ` }).join('');
}

export function ratyRenderStar(starContainer) {
    const score = Number(starContainer.dataset.score);

    if (refs.body.classList.contains('theme-dark')) {
        const raty = new Raty(starContainer, {
            number: 5,
            score: score,
            readOnly: true,
            halfShow: true,
            path: './img/stars/',
            starOn: 'star-on-white.svg',
            starOff: 'star-off-white.svg',
            starHalf: 'star-half-white.svg'
        });
        raty.init();
    } else {
        const raty = new Raty(starContainer, {
            number: 5,
            score: score,
            readOnly: true,
            halfShow: true,
            path: './img/stars/',
            starOn: 'star-on.svg',
            starOff: 'star-off.svg',
            starHalf: 'star-half.svg'
        });
        raty.init();
    }
}

export function showLoader() {
    refs.loader.classList.remove("visually-hidden");
}

export function hideLoader() {
    refs.loader.classList.add("visually-hidden");
}

export function showLoadMore() {
    refs.loadMoreBtn.classList.remove("visually-hidden");
    refs.loadMoreBtn.addEventListener("click", handleLoadMore);
}

export function hideLoadMore() {
    refs.loadMoreBtn.classList.add("visually-hidden");
    refs.loadMoreBtn.removeEventListener("click", handleLoadMore);
}

export function ontTemeToggleClick() {
    if (refs.body.classList.contains('theme-dark')) {
        refs.body.classList.remove('theme-dark');
        refs.themeToggle.innerHTML = `
        <img src="./img/moon.png" alt="moon" />
        `;
    } else {
        refs.body.classList.add('theme-dark');
        refs.themeToggle.innerHTML = `
        <img src="./img/sun.png" alt="sun" />
        `;
    }
    localStorageThemeToggle();
}