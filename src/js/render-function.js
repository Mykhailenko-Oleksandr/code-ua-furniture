/**
 * У файлі render-functions.js зберігай функції для відображення елементів інтерфейсу
 */
import Raty from 'raty-js';

import { createColorsMarkup, createGalleryThumbsMarkup } from "./helpers";
import { refs } from "./refs";

// --- ФУНКЦІЯ ДЛЯ ГЕНЕРАЦІЇ HTML-РОЗМІТКИ ТОВАРУ ---
export function renderProductDetailsMarkup(product) {
    console.log(product);

    const mainImage = product.images[0];
    const galleryThumbs =
        product.images.length > 1 ? createGalleryThumbsMarkup(product.images) : '';
    const markup = `
      <div class="modal-gallery">
          <img class="modal-main-image" src="${mainImage}" alt="${product.name
        }">
        
        <div class="modal-gallery-thumbs-list">
          ${galleryThumbs}
        </div>
      </div>
      
      <div class="modal-details-info">
        <h2 class="modal-product-name">${product.name}</h2>
        <p class="modal-product-category">${product.category.name}</p>

        <div class="modal-price-rating-wrap">
          <span class="modal-product-price">${product.price} грн</span>
          <div class="modal-rating">
            <div class="product-rating" data-score="${product.rate}"></div>
          </div>
        </div>

        <div class="modal-colors-wrap">
          <p class="modal-colors-label">Доступні кольори:</p>
          <ul class="modal-colors-list">
            ${createColorsMarkup(product.color)}
          </ul>
        </div>
        
        <div class="modal-description-dimensions">
          <p class="modal-product-description">${product.description}</p>
          <ul class="modal-dimensions-list">
            <li class="modal-dimension-item">Розміри: <span class="modal-product-dimensions">${product.sizes
        }</span></li>
          </ul>
        </div>
      </div>
  `;

    refs.modalDetailsContent.innerHTML = markup;




    const starContainer = document.querySelector(`.product-rating`);

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


