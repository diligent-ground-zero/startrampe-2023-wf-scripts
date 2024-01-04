import Swiper from 'swiper';
import { Manipulation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';

export const initSwipers = () => {
  const wasWirTunSwiper = document.querySelector('section.section_was_wir_tun .swiper-container .swiper-wrapper');

  const swiperTeam = new Swiper('section.section_unser_team .swiper-container', {
    modules: [Manipulation],
    slidesPerView: 2,
    allowTouchMove: true,
    centeredSlides: true,
    initialSlide: 10,
    slideToClickedSlide: true,
    spaceBetween: 25,
    breakpoints: {
      420: {
        spaceBetween: 25,
        slidesPerView: 3,
      },
      620: {
        spaceBetween: 50,
        slidesPerView: 2.5,
      },
      768: {
        spaceBetween: 25,
        slidesPerView: 3,
      },
      991: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
      1280: {
        spaceBetween: 150,
      },
    },
  });

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

    document.querySelector('.section_was_wir_tun').append(scrollbar);

    const toggleScrollbarVisibility = () => {
      if (scrollbar.classList.contains('hidden')) {
        scrollbar.classList.remove('hidden');
      } else {
        scrollbar.classList.add('hidden');
      }
    };

    const swiper = new Swiper('section.section_was_wir_tun .swiper-container', {
      modules: [Manipulation, Pagination, Autoplay],
      slidesPerView: 'auto',
      centeredSlides: true,
      allowTouchMove: true,
      pagination: {
        el: '.swiper-scroller',
        clickable: true,
      },
      autoplay: {
        delay: 5000,
        pauseOnMouseEnter: true,
      },
      breakpoints: {
        992: {
          initialSlide: 1,
          slidesOffsetBefore: -250,
        },
        1280: {
          initialSlide: 1,
          slidesPerView: 'auto',
          centeredSlides: true,
          spaceBetween: 25,
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
      toggleScrollbarVisibility();
      previousActiveSlideIndex = swiper.clickedIndex;
    });
  }
};
