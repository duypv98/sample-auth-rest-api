const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/public', require('./public'));
router.use('/private', require('./private'));

module.exports = router;