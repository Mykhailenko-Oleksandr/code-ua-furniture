import { refs } from "./refs";

import iconSun from '../img/sun.png';
import iconMoon from '../img/moon.png';

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
        <img src="${iconSun}" alt="sun" />
        `;
    } else {
        refs.themeToggle.innerHTML = `
        <img src="${iconMoon}" alt="moon" />
        `;
    }
}
