import '../styles/global.css';

import { globalScripts } from './global';
import { initAnimations, initSwipers } from './home';

const init = () => {
  globalScripts();
  initSwipers();
  initAnimations();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
}
else {
  init();
}