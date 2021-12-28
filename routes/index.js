var express = require('express');
var router = express.Router();
const sessionManager = require('../helper/sessionManager');

router.use('/base',sessionManager.initialize('/base'));
router.use('/client',sessionManager.initialize('/client'));

router.use('/client', require('./client'));
router.use('/base', require('./base'));


module.exports = router;
