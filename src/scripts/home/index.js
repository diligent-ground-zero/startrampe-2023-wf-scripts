import Swiper from 'swiper';
import 'swiper/css';

export const initSwipers = () => {
  const swiper = new Swiper('.swiper-container', {
    slidesPerGroup: 1,
    slidesPerView: 1,
    initialSlide: 1,
    breakpoints: {
      420: {
        slidesPerView: 1,
        spaceBetween: 25,
        centeredSlides: true,
        centeredSlidesBounds: true,
        centerInsufficientSlides: true,
        slidesOffsetAfter: 250,
        slidesPerGroup: 1,
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 100,
        slidesPerGroup: 1,
        slidesOffsetAfter: 250,
      },
      991: {
        slidesPerView: 3,
        spaceBetween: 0,
        slidesPerGroup: 2,
      },
      1440: {
        slidesOffsetAfter: 100,
        slidesPerView: 4,
        initialSlide: 1,
        spaceBetween: 0,
        slidesOffsetBefore: 150,
        slidesOffsetAfter: 350,
      },
    },
  });
};
