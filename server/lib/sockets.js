const Twit = require('twit');
require('dotenv').config();

const T = new Twit({
  consumer_key: process.env.TWITTER_APIKEY,
  consumer_secret: process.env.TWITTER_APISECRET,
  access_token: process.env.TWITTER_ACCESSTOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESSTOKEN_SECRET
});

const nj = [-74.441416, 40.518744];

const stream = T.stream('statuses/filter', {
  track: ['markconf', '#mymark', '#markconf', 'mediacutlet']
  // locations: nj
});
module.exports = io => {
  io.on('connection', socket => {
    console.log('a user connected');

    socket.on('incoming-message', message => {
      console.log(message);
      socket.emit('new-message', message);
    });

    stream.on('tweet', tweet => {
      console.log(tweet);
      socket.emit('new-tweet', tweet);
    });
  });
};
