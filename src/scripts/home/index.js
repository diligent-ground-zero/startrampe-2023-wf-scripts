import Swiper from 'swiper';
import { Manipulation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';

export const initSwipers = () => {
  const wasWirTunSwiper = document.querySelector('section.section_was_wir_tun .swiper-container .swiper-wrapper');

  const dasTeamSwiper = document.querySelector('section.section_unser_team .swiper-container .swiper-wrapper');

  // const slides = Array.from(dasTeamSwiper.querySelectorAll('.swiper-slide'));

  // slides.forEach(slide => {
  //   console.log(slide);
  //   const clonedSlide = slide.cloneNode(true);
  //   dasTeamSwiper.appendChild(clonedSlide);
  // });

  const swiperTeam = new Swiper('section.section_unser_team .swiper-container', {
    modules: [Manipulation],
    slidesPerView: 2.5,
    centeredSlides: true,
    loop: true,
    slideToClickedSlide: true,
    updateOnWindowResize: true,
    spaceBetween: 0,
    loopAdditionalSlides: 2,
    speed: 800,
    autoHeight: false,
    breakpoints: {
      768: {
        initialSlide: 10,
        slidesPerView: 2.5,
        spaceBetween: 50,
        loopAdditionalSlides: 2,
      },
      1280: {
        slidesPerView: 2.5,
        spaceBetween: 25,
      },
      1440: {
        slidesPerView: 2.5,
        spaceBetween: 100,
        loopAdditionalSlides: 4,
      },
      1640: {
        slidesPerView: 'auto',
        spaceBetween: 50,
        loopAdditionalSlides: 4,
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
      updateOnWindowResize: true,
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
