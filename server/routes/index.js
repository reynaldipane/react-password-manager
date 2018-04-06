const express   = require('express');
const router    = express.Router();
const users     = require('./users');
const passwords = require('./passwords')

router.get('/', function(req, res) {
  res.send('Api Work')
});

router.use('/api/users', users)
router.use('/api/passwords', passwords)

module.exports = router;
