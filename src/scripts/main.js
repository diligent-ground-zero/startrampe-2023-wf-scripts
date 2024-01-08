import '../styles/global.css';

import { globalScripts } from './global';

document.addEventListener('DOMContentLoaded', () => {
  globalScripts();

  //check if page is home
  if (window.location.pathname === '/') {
    import('./home/index').then(({ initAnimations, initSwipers }) => {
      initSwipers();
      initAnimations();
    });
  }
});
