/**
 * У файлі render-functions.js зберігай функції для відображення елементів інтерфейсу
 */
import Raty from 'raty-js';

import { refs } from "./refs";


export async function renderFeedback(feedbacks) {
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