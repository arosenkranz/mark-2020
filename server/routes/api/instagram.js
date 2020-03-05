const router = require('express').Router();
const Instagram = require('node-instagram').default;

require('dotenv').config();

console.log(process.env.IG_ACCESSTOKEN);

/* 
FB.api(
  '/17843696329006350/recent_media',
  'GET',
  {"user_id":"17841402286920775","fields":"id,media_type,comments_count,like_count,media_url,caption"},
  function(response) {
      // Insert your code here
  }
);
*/

/* 
curl -i -X GET \
 "https://graph.facebook.com/v6.0/17843696329006350/recent_media?user_id=17841402286920775&fields=id%2Cmedia_type%2Ccomments_count%2Clike_count%2Cmedia_url%2Ccaption&access_token=EAAEeNNEmvlwBAFeubZBIG1XZB2wTPqH9bje4Mk2WXL0jFH6zXanrZAcCbahxddfXG4AF851v1a3H11DsOlJb0L8eKUyV7qtE6zTRcnFDrfCSNTYOZBxsbKhEUSXvBqzUD1jSalYrP2KdxdMeG0aKuFYfhhMomuRHG5CUeLfcsKWNZAaf1q34BhkyEZAZBlL0YcxViFdghhSYTqWQcA401LJGhZADA9rEFqYMmVEGSmyFggZDZD"
*/

// Create a new instance.
const instagram = new Instagram({
  clientId: process.env.IG_CLIENT_ID,
  accessToken: process.env.IG_ACCESSTOKEN
});

router.get('/', async (req, res) => {
  // Get a list of recently tagged media.
  try {
    const igData = await instagram.get('tags/rutgers/media/recent');

    res.json(igData);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

module.exports = router;
