import { getFeedback } from "./products-api";
import { renderFeedback } from "./render-function";

document.addEventListener('DOMContentLoaded', initHomePage);

async function initHomePage() {
    try {
        const feedbacks = await getFeedback();
        renderFeedback(feedbacks);
    } catch (error) {
        console.log(error.massege);

    }
}