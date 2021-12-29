var express = require('express');
var router = express.Router();
const sessionManager = require('../helper/sessionManager');

router.use('/api/base',sessionManager.initialize('/api/base'));
router.use('/api/client',sessionManager.initialize('/api/client'));

router.use('/api/client', require('./client'));
router.use('/api/base', require('./base'));


module.exports = router;
