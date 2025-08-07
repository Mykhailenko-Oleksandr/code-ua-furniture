
const openMenuBtn = document.querySelector('.header-burger-menu');
const closeMenuBtn = document.querySelector('.modal-close-btn');
const mobileMenu = document.querySelector('.modal-navbar');
const navLinks = document.querySelectorAll('.mobile-link, .mobile-buy-btn');


const toggleModal = () => {
  mobileMenu.classList.toggle('navbar-is-open'); 
  document.body.classList.toggle('no-scroll');
};

openMenuBtn.addEventListener('click', toggleModal);
closeMenuBtn.addEventListener('click', toggleModal);

mobileMenu.addEventListener('click', (e) => {
  if (e.target === mobileMenu) {
    toggleModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('navbar-is-open')) {
    toggleModal();
  }
});

navLinks.forEach(link => {
  link.addEventListener('click', toggleModal);
});