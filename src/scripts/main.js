import '../styles/global.css';

import { globalScripts } from './global';

const init = () => {
  globalScripts();
  

  //dinamicaly import these scripts only on the home page

if (window.location.pathname === '/') {
  import('./home').then(module => {
    module.initSwipers();
    module.initAnimations();
  });
}
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
}
else {
  init();
}