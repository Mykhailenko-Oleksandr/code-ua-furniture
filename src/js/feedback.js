import { iziToastError } from "./izi-toast";
import { getFeedback } from "./products-api";
import { renderFeedback } from "./render-function";

// document.addEventListener('DOMContentLoaded', initHomePage);

// export async function initHomePage() {
//     try {
//         const feedbacks = await getFeedback();
//         renderFeedback(feedbacks);
//     } catch (error) {
//         iziToastError(error.massege)
//     }
// }