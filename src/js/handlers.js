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

let query = "";
let page = 1;
let totalCounter;

export async function initHomePage() {

    refs.loadMoreBtn.addEventListener("click", handleLoadMore);

    getCategoriesByQuery().then(data => {
        renderCategories(data);
    })

    getAllItemsByQuery(page).then(data => {
        totalCounter = data.totalItems - data.furnitures.length

        renderFurnitureList(data.furnitures)
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

async function handleLoadMore(event) {
    hideLoadMore();
    showLoader();
    page++;
    refs.loadMoreBtn.blur();
    if (refs.allCategoriesBtn.classList.contains("accent")) {
        try {
            const response = await getAllItemsByQuery(page);
            renderFurnitureList(response.furnitures);
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
            renderFurnitureList(response.furnitures);
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
                renderFurnitureList(response.furnitures);
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
                renderFurnitureList(response.furnitures);
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

