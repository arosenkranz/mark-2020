const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.get((req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, '../client/dist'));
    return;
  }
  res.json({ message: 'In dev, go to http://localhost:3000' });
});

module.exports = router;
