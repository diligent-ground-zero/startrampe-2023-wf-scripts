export const globalScripts = () => {
  const headerContainer = document.querySelector('.navbar');

  const hamburgerMenu = document.querySelector('.navbar_button-menu-button-hamburger-toggle');
  //create a function that listents to the scroll event, and adds a class to the header if the page is scrolled down

  //create a global click listener for links that have the class .navbar_nav-link
  const navLinks = document.querySelectorAll('.navbar_nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      hamburgerMenu.click();
    });
  });

  let lastScrollY = window.scrollY;
  let isScrollingDown = false;
  let ticking = false;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    isScrollingDown = currentScrollY > lastScrollY;
    lastScrollY = currentScrollY;
    if (currentScrollY > 0) {
      headerContainer.classList.add('scrolled');
    } else {
      headerContainer.classList.remove('scrolled');
      headerContainer.classList.remove('crossed-second-page-section');
    }
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });

      ticking = true;
    }
  });

  const observerOptions = {
    rootMargin: '50% 0px 0px 0px',
    threshold: [0.5],
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      const idToClassMap = {
        'wer-wir-sind-section': 'crossed-second-page-section',
      };
      if (entry.isIntersecting && idToClassMap.hasOwnProperty(entry.target.id) && isScrollingDown) {
        headerContainer.classList.add(idToClassMap[entry.target.id]);
      } else if (!entry.isIntersecting && idToClassMap.hasOwnProperty(entry.target.id) && !isScrollingDown) {
        headerContainer.classList.remove(idToClassMap[entry.target.id]);
      }
    });
  };

  const pageSections = document.querySelectorAll('section');
  const secondSection = pageSections[1];

  const interesctionObserver = new IntersectionObserver(observerCallback, observerOptions);
  pageSections.forEach((section) => {
    interesctionObserver.observe(section);
  });

  setTimeout(() => {
    const scrollPositionRelativeToSecondSection = window.scrollY - secondSection.offsetTop;
    if (scrollPositionRelativeToSecondSection > secondSection.offsetHeight) {
      headerContainer.classList.add('crossed-second-page-section');
      headerContainer.classList.add('scrolled');
    }
  }, 500);

  //add a mutation observer to the .navbar_menu-button.w-nav-button element so when the elements has the class .w--open
  const menuButton = document.querySelector('.w-nav-button');
  const mutationObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === 'class') {
        headerContainer.classList.toggle('menu-open');
      }
    });
  });

  mutationObserver.observe(menuButton, { attributes: true });
};
