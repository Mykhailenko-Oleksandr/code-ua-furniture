import { refs } from "./refs";

// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';


export function swiper() {
    new Swiper('.swiper', {

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',

            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },


            direction: 'vertical',
            loop: true,
        }
    })

}