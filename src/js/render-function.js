/**
 * У файлі render-functions.js зберігай функції для відображення елементів інтерфейсу
 */

import Raty from 'raty-js';

import { refs } from "./refs";
import { createColorsMarkup, createGalleryThumbsMarkup, ratyRenderStar } from "./helpers";

// --- ФУНКЦІЯ ДЛЯ ГЕНЕРАЦІЇ HTML-РОЗМІТКИ ТОВАРУ ---
export function renderProductDetailsMarkup(product) {
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
          <p class="modal-colors-label">Колір</p>
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
    <div class="btn-wrapper">
      <button type="button" class="modal-order-btn">
        Перейти до замовлення
      </button>
    </div>
    </div>
  `;

  refs.modalDetailsContent.innerHTML = markup;

  const starContainer = document.querySelector(`.product-rating`);
  ratyRenderStar(starContainer);
}

export function renderFeedback(feedbacks) {
    const markup = feedbacks.map(({ descr, name, rate }, index) => `
    <div class="feedback-box swiper-slide">
        <div class="feedback-stars-box" data-score="${rate}" id="stars-${index}"></div>
        <div class="feedback-box-text">${descr}</div>
        <div class="feedback-box-name">${name}</div>
 </div>
 `).join("");

    refs.swiperWrapper.innerHTML = markup;

    feedbacks.forEach((_, index) => {
        const starContainer = document.getElementById(`stars-${index}`);

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
    });
}
