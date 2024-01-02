export const globalScripts = () => {
  const headerContainer = document.querySelector('header.navigation');
  //create a function that listents to the scroll event, and adds a class to the header if the page is scrolled down
  const handleScroll = () => {
    if (window.scrollY > 0) {
      headerContainer.classList.add('scrolled');
    } else {
      headerContainer.classList.remove('scrolled');
    }
  };
  //add an event listener to the scroll event
  let debounceTimer;
  window.addEventListener('scroll', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(handleScroll, 50);
  });

  //add a mutation observer to the .navbar_menu-button.w-nav-button element so when the elements has the class .w--open it should do smt
  const menuButton = document.querySelector('.navbar_menu-button.w-nav-button');
  const observer = new MutationObserver(function (mutations) {
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
  observer.observe(menuButton, { attributes: true });
  //call the function once on page load
  handleScroll();
};
