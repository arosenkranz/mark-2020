const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3001;

app.use(express.static('client/dist'));

require('./server/lib/sockets')(io);
app.use(require('./server/routes'));

http.listen(PORT, () => console.log(`Listening on ${PORT}.`));
