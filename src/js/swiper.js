import { refs } from "./refs";

import Swiper from 'swiper/bundle';

const mobileQuery = window.matchMedia('(max-width: 767px)');
const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1439px)');
const desktopQuery = window.matchMedia('(min-width: 1440px)');

mobileQuery.addEventListener('change', swiper);
tabletQuery.addEventListener('change', swiper);
desktopQuery.addEventListener('change', swiper);

export function swiper() {
    if (mobileQuery.matches) {
        new Swiper('.swiper', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
        })
    } else if (tabletQuery.matches) {
        new Swiper('.swiper', {
            slidesPerView: 2,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
        })
    } else if (desktopQuery.matches) {
        new Swiper('.swiper', {
            slidesPerView: 3,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
        })
    }
}
