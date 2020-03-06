const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

if (process.env.NODE_ENV === 'production') {
  router.get('/mobile', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/mobile.html'));
  });

  router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
}

module.exports = router;
