import { handleClick, initHomePage } from "./js/handlers";
import { refs } from "./js/refs";
import { openModalNavbar } from "./js/modal-navbar";
import { ontTemeToggleClick } from "./js/helpers";

document.addEventListener('DOMContentLoaded', initHomePage);

refs.openMenuBtn.addEventListener('click', openModalNavbar);
refs.categories.addEventListener("click", handleClick);
refs.themeToggle.addEventListener('click', ontTemeToggleClick);