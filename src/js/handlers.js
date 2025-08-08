/**
 * У файлі handlers.js зберігай хендлери, які передаються в addEventListener.
 */

import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
import { iziToastError } from "./izi-toast";
import { swiper } from "./swiper";

import { refs } from "./refs";
import { getAllItemsByQuery, getCategoriesByQuery, getItemsByQuery, getFeedback } from "./products-api";
import { clearFurnitureList, renderCategories, renderFurnitureList, renderFeedback } from "./render-function";
import { hideLoader, hideLoadMore, showLoader, showLoadMore } from "./helpers";
import { openProductModal } from './modal-product';

let query = "";
let page = 1;
let totalCounter;
export let allLaodProduct = [];

export async function initHomePage() {

    getCategoriesByQuery().then(data => {
        renderCategories(data);
    })

    getAllItemsByQuery(page).then(data => {
        totalCounter = data.totalItems - data.furnitures.length;

        allLaodProduct.push(...data.furnitures);

        renderFurnitureList(data.furnitures);
        refs.furnitureList.addEventListener('click', onBtnDetalsProduct);
        hideLoader();
        showLoadMore();
    })

    new Accordion('.accordion-container', {
        duration: 400,
        showMultiple: false,
    });

    try {
        const feedbacks = await getFeedback();
        renderFeedback(feedbacks);
        swiper();
    } catch (error) {
        iziToastError(error.message)
    }
}

export async function handleLoadMore(event) {
    hideLoadMore();
    showLoader();
    page++;
    refs.loadMoreBtn.blur();
    if (refs.allCategoriesBtn.classList.contains("accent")) {
        try {
            const response = await getAllItemsByQuery(page);
            allLaodProduct.push(...response.furnitures);
            renderFurnitureList(response.furnitures);
            refs.furnitureList.addEventListener('click', onBtnDetalsProduct);
            hideLoader();
            showLoadMore();
            totalCounter -= response.furnitures.length
            if (!totalCounter) {
                hideLoadMore();
            }

        } catch (error) {
            iziToastError(error.message)
        }
    } else {
        try {
            const response = await getItemsByQuery(query, page);
            allLaodProduct.push(...response.furnitures);
            renderFurnitureList(response.furnitures);
            refs.furnitureList.addEventListener('click', onBtnDetalsProduct);
            hideLoader();
            showLoadMore();
            totalCounter -= response.furnitures.length
            if (!totalCounter) {
                hideLoadMore();
            }

        } catch (error) {
            iziToastError(error.message)
        }
    }
}

export async function handleClick(event) {
    event.preventDefault();
    clearFurnitureList();
    allLaodProduct = [];
    page = 1;
    showLoader();
    hideLoadMore();
    if (event.target.classList.contains('categories-btn')) {
        document.querySelectorAll('.categories-btn.accent').forEach(btn => {
            btn.classList.remove('accent');
        });
        event.target.classList.add('accent');
    }

    if (event.target !== event.currentTarget) {
        if (event.target.id === "all-categories") {
            try {
                const response = await getAllItemsByQuery(page);
                totalCounter = response.totalItems - response.furnitures.length;
                allLaodProduct.push(...response.furnitures);
                renderFurnitureList(response.furnitures);
                refs.furnitureList.addEventListener('click', onBtnDetalsProduct);
                hideLoader();
                showLoadMore();
            } catch (error) {
                iziToastError(error.message);
            }
        } else {
            query = event.target.id;

            try {
                const response = await getItemsByQuery(event.target.id, page);
                totalCounter = response.totalItems - response.furnitures.length;
                allLaodProduct.push(...response.furnitures);
                renderFurnitureList(response.furnitures);
                refs.furnitureList.addEventListener('click', onBtnDetalsProduct);
                hideLoader();
                showLoadMore();
                if (!totalCounter) {
                    hideLoadMore();
                }
            } catch (error) {
                iziToastError(error.message);
            }
        }
    }
}

function onBtnDetalsProduct(event) {

    if (!event.target.classList.contains('furniture-details-btn')) {
        return;
    }
    const idProduct = event.target.id;
    openProductModal(idProduct);
}