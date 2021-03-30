var express = require('express');
var router = express.Router();
/*const sessionManager = require('../helper/sessionManager');

router.use(sessionManager.initialize());
router.use((request, response, next) => {
    sessionManager.getSession(request)
        .then((session) => {
            next();
        })
        .catch((error) => {
            next(error);
        });
});*/
router.use('/users', require('./users'));
router.use('/login', require('./login'));
router.use('/register', require('./register'));
router.use('/files', require('./files'));
router.use('/configs', require('./configs'));

module.exports = router;
