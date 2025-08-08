/**
 * У файлі main.js логіка сторінки Index (index.html)
 */


import { handleClick, initHomePage } from "./js/handlers";
import { refs } from "./js/refs";
import { openProductModal } from "./js/modal-product";
import { openModalNavbar } from "./js/modal-navbar";

document.addEventListener('DOMContentLoaded', initHomePage);

refs.openMenuBtn.addEventListener('click', openModalNavbar);
refs.categories.addEventListener("click", handleClick);

