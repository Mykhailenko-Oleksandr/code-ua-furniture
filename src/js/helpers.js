/**
 * У файлі helpers.js зберігай допоміжні функції, які знадобляться для реалізації завдання
 */

import Raty from 'raty-js';
import { refs } from './refs';
import { handleLoadMore } from './handlers';
import { localStorageThemeToggle } from './local-storage';
import { feedbacksVar } from './render-function';

import iconSun from '../img/sun.png';
import iconMoon from '../img/moon.png';
import starOn from '../img/stars/star-on.svg';
import starOnWhite from '../img/stars/star-on-white.svg';
import starHalf from '../img/stars/star-half.svg';
import starHalfWhite from '../img/stars/star-half-white.svg';
import starOff from '../img/stars/star-off.svg';
import starOffWhite from '../img/stars/star-off-white.svg';

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
            const lowerColor = color.toLowerCase();
            const grayClass = (lowerColor === '#838584' || lowerColor === '#808080') ? 'grey-color' : '';
            return `
      <li class="modal-color-item">
        <input type="radio" name="color" id="color-${index}" value="${color}" class="modal-color-input" ${isChecked}>
        <label for="color-${index}" class="modal-color-label ${grayClass}" style="background-color: ${color};"></label>
      </li>
    ` }).join('');
}

export function ratyRenderStar(starContainer) {
    const score = Number(starContainer.dataset.score);
    const isDark = refs.body.classList.contains('theme-dark');

    new Raty(starContainer, {
        number: 5,
        score,
        readOnly: true,
        halfShow: true,
        starOn: isDark ? starOnWhite : starOn,
        starOff: isDark ? starOffWhite : starOff,
        starHalf: isDark ? starHalfWhite : starHalf
    }).init();
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
        <img src="${iconMoon}" alt="moon" />
        `;
    } else {
        refs.body.classList.add('theme-dark');
        refs.themeToggle.innerHTML = `
        <img src="${iconSun}" alt="sun" />
        `;
    }
    localStorageThemeToggle();

    feedbacksVar.forEach((_, index) => {
        const starContainer = document.getElementById(`stars-${index}`);
        starContainer.innerHTML = '';
        ratyRenderStar(starContainer);
    });
}