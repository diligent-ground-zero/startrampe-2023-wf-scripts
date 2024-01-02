
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
}