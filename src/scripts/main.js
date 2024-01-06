import '../styles/global.css';

import { globalScripts } from './global';
import { initSwipers } from './home';

document.addEventListener('DOMContentLoaded', () => {
  globalScripts();
  initSwipers();
});
