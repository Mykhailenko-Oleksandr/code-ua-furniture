import { refs } from "./refs";

export function localStorageThemeToggle() {
    if (localStorage.getItem('theme')) {
        localStorage.removeItem('theme');
    } else {
        localStorage.setItem('theme', 'theme-dark');
    }
}

export function deployThemeToggle() {
    if (localStorage.getItem('theme')) {
        refs.body.classList.add(localStorage.getItem('theme'));
        refs.themeToggle.innerHTML = `
        <img src="./img/sun.png" alt="sun" />
        `;
    } else {
        refs.themeToggle.innerHTML = `
        <img src="./img/moon.png" alt="moon" />
        `;
    }
}
