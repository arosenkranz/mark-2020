import io from 'socket.io-client';

const socket = io(
  location.hostname === 'localhost' ? 'http://localhost:3001' : ''
);

export default socket;
