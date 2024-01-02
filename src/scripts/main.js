import '../styles/global.css';

import { initSwipers } from './home/index';
import { globalScripts } from './global';

document.addEventListener('DOMContentLoaded', () => {
  initSwipers();
  globalScripts()
});
