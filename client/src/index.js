import './templates/style.css';
import logo from './images/mark-conference-logo-full-color.png';

if (
  /Mobi|Android/i.test(navigator.userAgent) ||
  process.env.NODE_ENV === 'production'
) {
  location.replace('/mobile');
}

{
  const $logo = document.querySelector('#logo-area');
  const logoImg = document.createElement('img');
  logoImg.setAttribute('src', logo);
  $logo.appendChild(logoImg);
}

import './app.js';
