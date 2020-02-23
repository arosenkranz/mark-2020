const Twit = require('twit');
const router = require('express').Router();
require('dotenv').config();

const T = new Twit({
  consumer_key: process.env.TWITTER_APIKEY,
  consumer_secret: process.env.TWITTER_APISECRET,
  access_token: process.env.TWITTER_ACCESSTOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESSTOKEN_SECRET
});

router.get('/', (req, res) => {
  T.get(
    'search/tweets',
    {
      q: '#mymark OR #markconf OR "mark conference" OR rutgers'
    },
    (err, data, response) => {
      if (err) {
        console.log(err);
        return res.end();
      }
      res.json(data);
    }
  );
});

module.exports = router;
