import Swiper from 'swiper';
import { Manipulation } from 'swiper/modules';
import 'swiper/css';

export const initSwipers = () => {
  let previousActiveSlideIndex = undefined;

  const swiper = new Swiper('.swiper-container', {
    modules: [Manipulation],
    slidesPerView: 'auto',
    centeredSlides: true,
    centeredSlidesBounds: true,
    centerInsufficientSlides: true,
    // allowTouchMove: false,
    slideToClickedSlide: true,
    breakpoints: {
      420: {
        initialSlide: 1,
        slidesPerView: 1,
        slidesPerGroup: 1,
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
        slidesOffsetAfter: 250,
      },
    },
  });

  if (window.matchMedia('(min-width: 992px)').matches) {
    swiper.on('click', (swiper, event) => {
      let currentSlide = swiper.slides[swiper.clickedIndex];
      let newSlide = document.createElement('div');
      newSlide.classList.add('swiper-slide');
      newSlide.dataset.dynamic = true; // Add custom attribute to new slides

      if (previousActiveSlideIndex === undefined) {
        currentSlide.dataset.open = true;
        swiper.addSlide(swiper.clickedIndex + 1, newSlide);
        //swiper.slideTo(swiper.clickedIndex + 1); // Navigate to the newly added slide
      } else if (previousActiveSlideIndex === swiper.clickedIndex) {
        if (currentSlide.dataset.open) {
          delete currentSlide.dataset.open;
          if (swiper.slides[swiper.clickedIndex + 1].dataset.dynamic) {
            // Check for custom attribute before removing
            swiper.removeSlide(swiper.clickedIndex + 1);
          }
        } else {
          currentSlide.dataset.open = true;
          swiper.addSlide(swiper.clickedIndex + 1, newSlide);
          //swiper.slideTo(swiper.clickedIndex + 1); // Navigate to the newly added slide
        }
      } else {
        delete swiper.slides[previousActiveSlideIndex].dataset.open;
        if (
          swiper.slides[previousActiveSlideIndex + 1] &&
          swiper.slides[previousActiveSlideIndex + 1].dataset.dynamic
        ) {
          // Check for custom attribute before removing
          swiper.removeSlide(previousActiveSlideIndex + 1);
        }
        currentSlide.dataset.open = true;
        swiper.addSlide(swiper.clickedIndex + 1, newSlide);
        //swiper.slideTo(swiper.clickedIndex + 1); // Navigate to the newly added slide
      }

      previousActiveSlideIndex = swiper.clickedIndex;
    });
  }
};
