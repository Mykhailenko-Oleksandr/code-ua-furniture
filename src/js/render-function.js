/**
 * У файлі render-functions.js зберігай функції для відображення елементів інтерфейсу
 */

import { refs } from "./refs";
import { createColorsMarkup, createGalleryThumbsMarkup, ratyRenderStar } from "./helpers";

export let feedbacksVar;
const categoriesList = [];

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
  feedbacksVar = feedbacks;

  feedbacks.forEach((_, index) => {
    const starContainer = document.getElementById(`stars-${index}`);
    ratyRenderStar(starContainer);
  });
}

export function renderCategories(arr) {
  refs.categories.insertAdjacentHTML("beforeend", arr.map(({ name, _id }) => {
    return `<li class="categories-item" ><button class="categories-btn" id="${_id}">${name}</button></li>`
  }).join(""))

  arr.forEach(({ _id }) => {
    categoriesList.push(_id)
  })

  const buttons = document.querySelectorAll(".categories-btn");
  buttons.forEach(btn => {
    switch (btn.textContent.trim()) {
      case "М'які меблі":
        btn.classList.add("soft-category")
        break;
      case "Шафи та системи зберігання":
        btn.classList.add("storage-category")
        break;
      case "Ліжка та матраци":
        btn.classList.add("beds-category")
        break;
      case "Столи":
        btn.classList.add("tabels-category")
        break;
      case "Стільці та табурети":
        btn.classList.add("chairs-category")
        break;
      case "Кухні":
        btn.classList.add("kitchens-category")
        break;
      case "Меблі для дитячої":
        btn.classList.add("nursery-category")
        break;
      case "Меблі для офісу":
        btn.classList.add("office-category")
        break;
      case "Меблі для передпокою":
        btn.classList.add("hallway-category")
        break;
      case "Меблі для ванної кімнати":
        btn.classList.add("bathroom-category")
        break;
      case "Садові та вуличні меблі":
        btn.classList.add("garden-category")
        break;
      case "Декор та аксесуари":
        btn.classList.add("decor-category")
        break;
      default:
        btn.classList.add("category")
    }
  });
}

export function renderFurnitureList(arr) {
  refs.furnitureList.insertAdjacentHTML("beforeend", arr.map(({ images, name, price, _id, color, description }) => {
    return `<li class="furniture-list-item">
        <img class="furniture-item-img" src="${images[0]}" alt="${description}">
        <h4 class="furniture-item-name">${name}</h4>
        <div class="furniture-colors">
        ${color.map(item => `<span class="item-color" style="background-color: ${item};"></span>`).join('')}
        </div>
        <p class="furniture-item-price">${price} грн</p>
        <button class="furniture-details-btn" id="${_id}">Детальніше</button>
        </li>`
  }).join(""))
}

export function clearFurnitureList() {
  refs.furnitureList.innerHTML = "";
}