/**
 * У файлі handlers.js зберігай хендлери, які передаються в addEventListener.
 */

import { iziToastError } from "./izi-toast";
import { getFeedback } from "./products-api";
import { renderFeedback } from "./render-function";
import { swiper } from "./swiper";

export async function initHomePage() {
    try {
        const feedbacks = await getFeedback();
        renderFeedback(feedbacks);
        swiper();
    } catch (error) {
        iziToastError(error.massege)
    }
}