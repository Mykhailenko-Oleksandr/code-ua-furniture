/**
 * У файлі refs.js зберігай обʼєкт refs з посиланнями на елементи ДОМ
 */

export const refs = {
    body: document.querySelector('body'),
    modalProduct: document.querySelector('.modal-product'),
    modalDetailsContent: document.querySelector('.modal-details-content'),
    swiperWrapper: document.querySelector('.swiper-wrapper'),
    // furniture
    categories: document.querySelector(".categories"),
    furnitureList: document.querySelector(".furniture-list"),
    loader: document.querySelector(".loader"),
    loadMoreBtn: document.querySelector(".show-more-btn"),
    allCategoriesBtn: document.querySelector(".all-category"),
    // navbar
    openMenuBtn: document.querySelector('.header-burger-menu'),
    closeMenuBtn: document.querySelector('.modal-close-btn'),
    mobileMenu: document.querySelector('.modal-navbar'),
    navLinks: document.querySelectorAll('.mobile-link, .mobile-buy-btn'),

}