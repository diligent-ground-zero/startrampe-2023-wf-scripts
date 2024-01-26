import '../styles/global.css';

import { globalScripts } from './global';

const init = () => {
  globalScripts();

  if (window.location.pathname) {
    import('./home').then((module) => {
      // module.initSwipers();
      // module.initAnimations();
      module.netwzerkScripts();
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
