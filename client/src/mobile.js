import io from 'socket.io-client';
import './templates/mobile.css';
import logo from './images/mark-conference-logo-full-color.png';

const $markForm = document.querySelector('#mark-form');
const $inputName = document.querySelector('[name="name"]');
const $markMessage = document.querySelector('[name="mark-message"]');

const $logo = document.querySelector('#logo');

const logoImg = document.createElement('img');
logoImg.setAttribute('src', logo);
logoImg.classList.add('w-50', 'mx-auto');
$logo.appendChild(logoImg);

const socket = io(
  location.hostname === 'localhost' ? 'http://localhost:3001' : ''
);

const submitFormHandler = event => {
  event.preventDefault();

  const formData = {
    name: $inputName.value.trim(),
    message: $markMessage.value.trim()
  };
  console.log(formData);
  socket.emit('incoming-message', formData);
};

$markForm.addEventListener('submit', submitFormHandler);
