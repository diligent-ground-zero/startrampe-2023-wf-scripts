import Swiper from 'swiper';
import 'swiper/css';

const initSwipers = () => {
    const swiper = new Swiper('.swiper-container', {
        slidesPerView:3,
        centeredSlides:true,
        centeredSlidesBounds:true,
        initialSlide:2,
        spaceBetween: 200,
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 200
          },
          767: {
            slidesPerView: 2,
            spaceBetween: 100
          },
          991: {
            slidesPerView:3,
            spaceBetween: 100,
          },
        }
      })
}

document.addEventListener('DOMContentLoaded', () => {
    initSwipers()
});
  