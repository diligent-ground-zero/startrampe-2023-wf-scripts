import Swiper from 'swiper';
import { Manipulation } from 'swiper/modules';
import 'swiper/css';

export const initSwipers = () => {
  const wasWirTunSwiper = document.querySelector('section.section_was_wir_tun .swiper-container .swiper-wrapper');
  if (window.matchMedia('(max-width: 992px)').matches) {
    let previousActiveElementIndex;

    for (let i = 0; i < wasWirTunSwiper.children.length; i++) {
      wasWirTunSwiper.children[i].addEventListener('click', function () {
        let currentElement = wasWirTunSwiper.children[i];

        if (previousActiveElementIndex === undefined) {
          currentElement.dataset.open = true;
        } else if (previousActiveElementIndex === i) {
          if (currentElement.dataset.open) {
            delete currentElement.dataset.open;
          } else {
            currentElement.dataset.open = true;
          }
        } else {
          delete wasWirTunSwiper.children[previousActiveElementIndex].dataset.open;
          currentElement.dataset.open = true;
        }

        previousActiveElementIndex = i;
      });
    }
  }

  if (window.matchMedia('(min-width: 992px)').matches) {
    let previousActiveSlideIndex = undefined;
    const scrollbar = document.createElement('div');
    scrollbar.classList = 'swiper-scroller';

    document.querySelector('.section_was_wir_tun ').append(scrollbar);

    const swiper = new Swiper('.swiper-container', {
      modules: [Manipulation, Scrollbar],
      slidesPerView: 'auto',
      centeredSlides: true,
      allowTouchMove: true,
      // scrollbar: {
      //   el: '.swiper-scroller',
      //   hide: false,
      // },
      breakpoints: {
        420: {
          initialSlide: 1,
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        991: {
          initialSlide: 1,
          slidesOffsetBefore: -250,
        },
        1440: {
          slidesOffsetBefore: -250,
          initialSlide: 1,
        },
      },
    });

    swiper.on('click', (swiper, event) => {
      let currentSlide = swiper.slides[swiper.clickedIndex];
      let newSlide = document.createElement('div');
      newSlide.classList.add('swiper-slide');
      newSlide.dataset.dynamic = true; // Add custom attribute to new slides

      // Remove 'open' data attribute from all slides
      swiper.slides.forEach((slide) => {
        delete slide.dataset.open;
      });

      if (previousActiveSlideIndex === undefined) {
        currentSlide.dataset.open = true;
        swiper.addSlide(swiper.clickedIndex + 1, newSlide);
        swiper.slideTo(swiper.clickedIndex); // Navigate to the newly added slide
      } else if (previousActiveSlideIndex === swiper.clickedIndex) {
        if (swiper.slides[swiper.clickedIndex + 1]?.dataset.dynamic) {
          // Check for custom attribute before removing
          swiper.removeSlide(swiper.clickedIndex + 1);
        } else {
          currentSlide.dataset.open = true;
          swiper.addSlide(swiper.clickedIndex + 1, newSlide);
          swiper.slideTo(swiper.clickedIndex); // Navigate to the newly added slide
        }
      } else {
        if (
          swiper.slides[previousActiveSlideIndex + 1] &&
          swiper.slides[previousActiveSlideIndex + 1].dataset.dynamic
        ) {
          // Check for custom attribute before removing
          swiper.removeSlide(previousActiveSlideIndex + 1);
        }
        currentSlide.dataset.open = true;
        swiper.addSlide(swiper.clickedIndex + 1, newSlide);
        swiper.slideTo(swiper.clickedIndex); // Navigate to the newly added slide
      }

      previousActiveSlideIndex = swiper.clickedIndex;
    });
  }
};
