import Swiper from 'swiper';
import 'swiper/css';

export const initSwipers = () => {
  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    centeredSlides: true,
    centeredSlidesBounds: true,
    centerInsufficientSlides: true,
    breakpoints: {
      420: {
        initialSlide: 1,
        slidesPerView: 1,
        slidesPerGroup: 1,
        // slidesOffsetAfter: 250,
        // slidesPerView: 1,
        // spaceBetween: 0,
      },
      767: {
        initialSlide: 1,
        slidesPerView: 2,
        spaceBetween: 50,
        slidesPerGroup: 1,
        slidesOffsetAfter: 100,
        slidesOffsetBefore: 100,
      },
      991: {
        initialSlide: 1,
        spaceBetween: 50,
        slidesOffsetAfter: 100,
        slidesOffsetBefore: 100,
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      1280: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      1440: {
        slidesPerView: 3,
        slidesPerGroup: 1,
      },
    },
  });
};
