export const globalScripts = () => {
  const headerContainer = document.querySelector('.navbar');
  //create a function that listents to the scroll event, and adds a class to the header if the page is scrolled down
  const handleScroll = () => {
    if (window.scrollY > headerContainer.offsetHeight) {
      headerContainer.classList.add('scrolled');
    } else {
      headerContainer.classList.remove('scrolled');
    }
  };

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });

      ticking = true;
    }
  });

  //call the function once on page load
  handleScroll();

  const pageSections = document.querySelectorAll('main.main-wrapper section');
  const secondSection = pageSections[1];

  const observerOptions = {
    rootMargin: '50% 0px -75% 0px',
    threshold: [0.5],
  };

  let lastScrollY = window.scrollY;
  let isScrollingDown = false;
  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      const currentScrollY = window.scrollY;
      isScrollingDown = currentScrollY > lastScrollY;
      lastScrollY = currentScrollY;
      //is intersecting is true when the top of the page passes the section and direction is down

      if (entry.isIntersecting && isScrollingDown) {
        headerContainer.classList.add('crossed-second-page-section');
      } else if (!entry.isIntersecting && !isScrollingDown) {
        headerContainer.classList.remove('crossed-second-page-section');
      }
    });
  };

  const interesctionObserver = new IntersectionObserver(observerCallback, observerOptions);
  interesctionObserver.observe(secondSection);

  //start after intersection obeserver first observes the second section
  setTimeout(() => {
    const scrollPositionRelativeToSecondSection = window.scrollY - secondSection.offsetTop;
    if (scrollPositionRelativeToSecondSection > secondSection.offsetHeight) {
      headerContainer.classList.add('crossed-second-page-section');
      console.log('add class');
    }
  }, 1);

  //add a mutation observer to the .navbar_menu-button.w-nav-button element so when the elements has the class .w--open it should do smt
  const menuButton = document.querySelector('.w-nav-button');
  const mutationObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === 'class') {
        if (menuButton.classList.contains('w--open')) {
          headerContainer.classList.add('menu-open');
        } else {
          headerContainer.classList.remove('menu-open');
        }
      }
    });
  });

  mutationObserver.observe(menuButton, { attributes: true });
};
