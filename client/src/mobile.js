import crypto from 'crypto';
import socket from './api/sockets';

import './templates/mobile.css';
import logo from './images/mark-conference-logo-full-color.png';

const $markForm = document.querySelector('#mark-form');
const $inputName = document.querySelector('[name="name"]');
const $markMessage = document.querySelector('[name="mark-message"]');

const $logo = document.querySelector('#logo');

const logoImg = document.createElement('img');
logoImg.setAttribute('src', logo);
logoImg.classList.add('w-75', 'mx-auto');
$logo.appendChild(logoImg);

const submitFormHandler = event => {
  event.preventDefault();

  const formData = {
    id: crypto.randomBytes(16).toString('hex'),
    name: $inputName.value.trim(),
    message: $markMessage.value.trim()
  };

  if (!formData.name || !formData.message) {
    return false;
  }

  console.log(formData);
  socket.emit('incoming-message', formData);

  document.querySelector(
    '#app'
  ).innerHTML = `<h2>Check out the galaxy above to see your mark!</h2>`;
};

$markForm.addEventListener('submit', submitFormHandler);
