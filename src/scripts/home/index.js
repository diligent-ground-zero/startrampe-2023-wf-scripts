import Swiper from 'swiper';
import { Manipulation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';

export const initSwipers = () => {
  const wasWirTunSwiper = document.querySelector('section.section_was_wir_tun .swiper-container .swiper-wrapper');

  const swiperTeam = new Swiper('section.section_unser_team .swiper-container', {
    modules: [Manipulation],
    slidesPerView: 'auto',
    allowTouchMove: true,
    centeredSlides: true,
    initialSlide: 10,
    slideToClickedSlide: true,
    spaceBetween: 0,
    breakpoints: {
      420: {
        spaceBetween: 0,
        slidesPerView: 3,
      },
      620: {
        spaceBetween: 50,
        slidesPerView: 3,
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
        spaceBetween: 100,
      },
      1440: {
        slidesPerView: 6.5,
        spaceBetween: 200,
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
    const swiper = new Swiper('section.section_was_wir_tun .swiper-container', {
      modules: [Manipulation, Pagination, Autoplay],
      slidesPerView: 'auto',
      centeredSlides: true,
      allowTouchMove: true,
      initialSlide: 2,
      spaceBetween: 25,
      autoplay: {
        delay: 4000,
        pauseOnMouseEnter: true,
      },
      speed: 800,
      effect: 'fade',
      breakpoints: {
        992: {
          slidesOffsetBefore: -250,
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 3,
          centeredSlides: true,
        },
        1440: {
          slidesPerView: 3.5,
          centeredSlides: true,
        },
        1560: {
          slidesPerView: 4,
          centeredSlides: true,
        },
      },
    });

    let previousClickedIndex = null;

    swiper.on('click', (swiper, _event) => {
      let clickedIndex = swiper.clickedIndex;
      let currentSlide = swiper.slides[clickedIndex];

      // If the clicked slide is the same as the previously clicked slide, toggle its margin and 'open' attribute
      if (previousClickedIndex === clickedIndex) {
        if (currentSlide.dataset.open) {
          currentSlide.style.marginRight = '25px';
          delete currentSlide.dataset.open;
        } else {
          currentSlide.style.marginRight = '25%';
          currentSlide.dataset.open = true;
        }
      } else {
        // Remove 'open' data attribute and reset margin from all slides
        swiper.slides.forEach((slide) => {
          delete slide.dataset.open;
          slide.style.marginRight = '25px'; // Reset margin
        });

        // Add margin and 'open' attribute to the clicked slide
        currentSlide.style.marginRight = '25%';
        currentSlide.dataset.open = true;
      }
      swiper.updateSlidesClasses();
      swiper.slideTo(clickedIndex);

      // Update the previously clicked slide index
      previousClickedIndex = clickedIndex;
    });
  }
};
