const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));
}

require('./lib/sockets')(io);
app.use(require('./routes'));

http.listen(PORT, () => console.log(`Listening on ${PORT}.`));
