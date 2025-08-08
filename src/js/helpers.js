/**
 * У файлі helpers.js зберігай допоміжні функції, які знадобляться для реалізації завдання
 */
import Raty from 'raty-js';

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