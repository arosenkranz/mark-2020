const router = require('express').Router();
const twitterRoutes = require('./twitter.js');
const igRoutes = require('./instagram');

router.use('/twitter', twitterRoutes);
router.use('/instagram', igRoutes);

module.exports = router;
