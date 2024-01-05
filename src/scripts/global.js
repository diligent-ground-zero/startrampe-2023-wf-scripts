export const globalScripts = () => {
  const headerContainer = document.querySelector('div.navbar');
  //create a function that listents to the scroll event, and adds a class to the header if the page is scrolled down
  const handleScroll = () => {
    if (window.scrollY > 0) {
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

  //create an interstection observer that ads a classs tothe header when the top of the page passes the seciont with class section_wer_wir_sind
  const sectionWerWirSind = document.querySelector('.section_wer_wir_sind');

  if (window.scrollY > sectionWerWirSind.offsetTop) {
    headerContainer.classList.add('crossed-wer-wir-sind');
  }

  const observerOptions = {
    rootMargin: '50% 0px 0px 0px',
    threshold: 1,
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
        headerContainer.classList.add('crossed-wer-wir-sind');
      } else if (!entry.isIntersecting && !isScrollingDown) {
        headerContainer.classList.remove('crossed-wer-wir-sind');
      }
    });
  };
  const interesctionObserver = new IntersectionObserver(observerCallback, observerOptions);
  interesctionObserver.observe(sectionWerWirSind);

  //add a mutation observer to the .navbar_menu-button.w-nav-button element so when the elements has the class .w--open it should do smt
  // const menuButton = document.querySelector('.navbar_menu-button.w-nav-button');
  // const mutationObserver = new MutationObserver(function (mutations) {
  //   mutations.forEach(function (mutation) {
  //     if (mutation.attributeName === 'class') {
  //       if (menuButton.classList.contains('w--open')) {
  //         headerContainer.classList.add('menu-open');
  //       } else {
  //         headerContainer.classList.remove('menu-open');
  //       }
  //     }
  //   });
  // });

  // mutationObserver.observe(menuButton, { attributes: true });
};
