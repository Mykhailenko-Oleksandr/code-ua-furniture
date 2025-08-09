import { onBackdropClick, onEscapePress } from "./helpers";
import { refs } from "./refs";



export function openModalNavbar() {
    refs.mobileMenu.classList.add('navbar-is-open');
    refs.closeMenuBtn.addEventListener('click', closeModalNavbar);
    document.addEventListener('keydown', onEscapePress);
    refs.mobileMenu.addEventListener('click', onBackdropClick)

    refs.navLinks.forEach(link => {
        link.addEventListener('click', closeModalNavbar);
    });

    document.body.classList.add('no-scroll');
};

export function closeModalNavbar() {
    refs.mobileMenu.classList.remove('navbar-is-open');
    refs.closeMenuBtn.removeEventListener('click', closeModalNavbar);
    document.removeEventListener('keydown', onEscapePress);

    refs.navLinks.forEach(link => {
        link.removeEventListener('click', closeModalNavbar);
    });

    document.body.classList.remove('no-scroll');
};