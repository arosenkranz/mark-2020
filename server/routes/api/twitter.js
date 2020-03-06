const Twit = require('twit');
const Filter = require('bad-words');
const router = require('express').Router();
require('dotenv').config();

const filter = new Filter();

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
      q: '#myMark OR #markconf OR #rutgers'
    },
    (err, data, response) => {
      if (err) {
        console.log(err);
        return res.end();
      }
      const filteredTweets = data.statuses
        .filter(status => {
          return status.lang === 'en' && !filter.isProfane(status.text);
        })
        .map(status => {
          return {
            id: status.id_str,
            text: status.text,
            name: status.user.screen_name
          };
        });

      res.json(filteredTweets);
    }
  );
});

module.exports = router;
