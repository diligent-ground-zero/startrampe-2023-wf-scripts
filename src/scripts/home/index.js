import Swiper from 'swiper';
import { Manipulation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import { timeline, inView } from 'motion';

export const initSwipers = () => {
  const wasWirTunSwiper = document.querySelector('section.section_was_wir_tun .swiper-container .swiper-wrapper');

  const swiperTeam = new Swiper('section.section_unser_team .swiper-container', {
    modules: [Manipulation],
    centeredSlides: true,
    slidesPerView: 2,
    allowTouchMove: false,
    loop: true,
    slideToClickedSlide: true,
    updateOnWindowResize: true,
    spaceBetween: 0,
    loopAdditionalSlides: 2,
    initialSlide: 10,
    speed: 800,
    autoHeight: false,
    breakpoints: {
      768: {
        slidesPerView: 2.5,
        spaceBetween: 50,
        loopAdditionalSlides: 2,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 100,
        loopAdditionalSlides: 2,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 25,
        loopAdditionalSlides: 2,
      },
      1640: {
        slidesPerView: 3.5,
        spaceBetween: 100,
        loopAdditionalSlides: 3,
      },
    },
  });

  swiperTeam.on('beforeSlideChangeStart', (swiper) => {
    swiper.updateSize();
  });

  swiperTeam.on('transitionEnd', (swiper) => {
    swiper.el.classList.remove('swiping');
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

export const initAnimations = () => {
  const getTranslateValues = () => {
    const width = window.innerWidth;
    let x, y;

    if (width <= 1280) {
      // Mobile viewport
      x = '-100%';
      y = '60px';
    } else {
      // Desktop viewport
      x = '-50%';
      y = '100px';
    }

    return `translate(${x},${y})`;
  };

  const easingAndDuration = { easing: 'cubic-bezier(0.36, 0, 0.66, -0.56)' };

  //desktop sequence
  let sequence = [
    [
      '.hero-heading.wir-bringen',
      { opacity: 1, transform: [`${getTranslateValues()} rotate(-7.5deg)`, 'translate(0) rotate(-7.5deg)'] },
    ],
    [
      '.hero-heading.nachhaltige',
      { opacity: 1, transform: [`${getTranslateValues()} rotate(-7.5deg)`, 'translate(0) rotate(-7.5deg)'] },
    ],
    [
      '.hero-heading.mobilitat',
      { opacity: 1, transform: [`${getTranslateValues()} rotate(-7.5deg)`, 'translate(0) rotate(-7.5deg)'] },
      { at: '-0.2' },
    ],
    [
      '.hero_background-image > img',
      { opacity: [0, 1], clipPath: ['polygon(0 0, 100% 0, 100% 0, 0 0)', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'] },
      { at: '-0.3' },
    ],
    [
      '.hero-heading.an-den-start',
      { opacity: 1, transform: [`${getTranslateValues()} rotate(-7.5deg)`, 'translate(0) rotate(-7.5deg)'] },
      { at: '-0.2' },
    ],
    ['.hero_buttons-section', { opacity: 1 }, { at: '<' }],
  ];

  if (window.innerWidth <= 1280) {
    // mobile sequence
    sequence = [
      [
        '.hero-heading.wir-bringen',
        { opacity: 1, transform: [`${getTranslateValues()} rotate(-7.5deg)`, 'translate(0) rotate(-7.5deg)'] },
      ],
      [
        '.hero-heading.nachhaltige',
        { opacity: 1, transform: [`${getTranslateValues()} rotate(-7.5deg)`, 'translate(0) rotate(-7.5deg)'] },
      ],
      [
        '.hero-heading.mobilitat',
        { opacity: 1, transform: [`${getTranslateValues()} rotate(-7.5deg)`, 'translate(0) rotate(-7.5deg)'] },
        { at: '-0.2' },
      ],
      [
        '.hero_background-image > img',
        { opacity: [0, 1], clipPath: ['polygon(0 0, 100% 0, 100% 0, 0 0)', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'] },
        { at: '-0.2' },
      ],
      [
        '.hero-heading.an-den-start',
        { opacity: 1, transform: [`${getTranslateValues()} rotate(-7.5deg)`, 'translate(0) rotate(-7.5deg)'] },
        { at: '-0.25' },
      ],
      ['.hero_buttons-section', { opacity: 1 }, { at: '-0.5' }],
    ];
  }

  timeline(sequence, { duration: 3.5, easingAndDuration });

  inView('section.section_wer_wir_sind', ({ target }) => {
    const sequence = [
      [
        target.querySelector('.x-images-wrapper .x-wws-image-wrapper.image-1'),
        { opacity: [0, 1], transform: ['translate(-100%, 15%) rotate(5deg)', 'translate(0,0) rotate(-5deg)'] },
        { duration: 1, at: '-0.5' },
      ],
      [
        target.querySelector('.x-images-wrapper .x-wws-image-wrapper.image-2'),
        { opacity: [0, 1], transform: ['translate(-100%, 15%) rotate(5deg)', 'translate(0,0) rotate(-7.5deg)'] },
        { duration: 1, at: '-0.5' },
      ],
      [
        target.querySelector('.x-images-wrapper .x-wws-image-wrapper.image-3'),
        { opacity: [0, 1], transform: ['translate(-100%, 15%) rotate(5deg)', 'translate(0,0) rotate(-8.5deg)'] },
        { duration: 1, at: '-0.5' },
      ],
      [
        target.querySelector('.x-images-wrapper .x-wws-image-wrapper.image-4'),
        { opacity: [0, 1], transform: ['translate(-100%, 15%) rotate(5deg)', 'translate(0,0) rotate(-10deg)'] },
        { duration: 1, at: '-0.5' },
      ],
    ];
    timeline(sequence, { easingAndDuration });
  });
};
