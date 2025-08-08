import { refs } from "./refs";



export function openModalNavbar() {
    refs.mobileMenu.classList.add('navbar-is-open');
    refs.closeMenuBtn.addEventListener('click', closeModalNavbar);
    document.addEventListener('keydown', pressEscape);

    refs.navLinks.forEach(link => {
        link.addEventListener('click', closeModalNavbar);
    });

    document.body.classList.add('no-scroll');
};

function closeModalNavbar() {
    refs.mobileMenu.classList.remove('navbar-is-open');
    refs.closeMenuBtn.removeEventListener('click', closeModalNavbar);
    document.removeEventListener('keydown', pressEscape);

    refs.navLinks.forEach(link => {
        link.removeEventListener('click', closeModalNavbar);
    });

    document.body.classList.remove('no-scroll');
};

function pressEscape(e) {
    if (e.key === 'Escape' && refs.mobileMenu.classList.contains('navbar-is-open')) {
        closeModalNavbar();
    }
}