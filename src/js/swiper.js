import Swiper from 'swiper/bundle';

const mobileQuery = window.matchMedia('(max-width: 767px)');
const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1439px)');
const desktopQuery = window.matchMedia('(min-width: 1440px)');

mobileQuery.addEventListener('change', swiperFeedback);
tabletQuery.addEventListener('change', swiperFeedback);
desktopQuery.addEventListener('change', swiperFeedback);

mobileQuery.addEventListener('change', swiperPoppular);
tabletQuery.addEventListener('change', swiperPoppular);
desktopQuery.addEventListener('change', swiperPoppular);

export function swiperFeedback() {
    if (mobileQuery.matches) {
        new Swiper('.feedback-all-box.swiper', {
            spaceBetween: 24,
            navigation: {
                nextEl: '.feedback-btn-next',
                prevEl: '.feedback-btn-prev',
            },
            pagination: {
                el: '.feedback-points-box',
                clickable: true,
                dynamicBullets: true,
            },
        })
    } else if (tabletQuery.matches) {
        new Swiper('.feedback-all-box.swiper', {
            slidesPerView: 2,
            spaceBetween: 24,
            navigation: {
                nextEl: '.feedback-btn-next',
                prevEl: '.feedback-btn-prev',
            },
            pagination: {
                el: '.feedback-points-box',
                clickable: true,
                dynamicBullets: true,
            },
        })
    } else if (desktopQuery.matches) {
        new Swiper('.feedback-all-box.swiper', {
            slidesPerView: 3,
            spaceBetween: 24,
            navigation: {
                nextEl: '.feedback-btn-next',
                prevEl: '.feedback-btn-prev',
            },
            pagination: {
                el: '.feedback-points-box',
                clickable: true,
                dynamicBullets: true,
            },
        })
    }
}

export function swiperPoppular() {
    if (mobileQuery.matches) {
        new Swiper('.popular-all-box.swiper', {
            spaceBetween: 24,
            navigation: {
                nextEl: '.popular-btn-next',
                prevEl: '.popular-btn-prev',
            },
            pagination: {
                el: '.popular-points-box',
                clickable: true,
                dynamicBullets: true,
            },
        })
    } else if (tabletQuery.matches) {
        new Swiper('.popular-all-box.swiper', {
            slidesPerView: 2,
            spaceBetween: 24,
            navigation: {
                nextEl: '.popular-btn-next',
                prevEl: '.popular-btn-prev',
            },
            pagination: {
                el: '.popular-points-box',
                clickable: true,
                dynamicBullets: true,
            },
        })
    } else if (desktopQuery.matches) {
        new Swiper('.popular-all-box.swiper', {
            slidesPerView: 4,
            spaceBetween: 24,
            navigation: {
                nextEl: '.popular-btn-next',
                prevEl: '.popular-btn-prev',
            },
            pagination: {
                el: '.popular-points-box',
                clickable: true,
                dynamicBullets: true,
            },
        })
    }
}
