const router = require('express').Router();
const twitterRoutes = require('./twitter');

router.use('/twitter', twitterRoutes);

module.exports = router;
