const router = require('express').Router();
const twitterRoutes = require('./twitter.js');

router.use('/twitter', twitterRoutes);

module.exports = router;
