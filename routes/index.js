var express = require('express');
var router = express.Router();
const sessionManager = require('../helper/sessionManager');

router.use(sessionManager.initialize());
 router.use('/login', require('./login'));
router.use('/register', require('./register'));
router.use('/clientConfig', require('./clientConfig'));

router.use((request, response, next) => {
    sessionManager.getSession(request)
        .then((session) => {
            next();
        })
        .catch((error) => {
         response.status(409).send("session not found");
        });
});
router.use('/users', require('./users'));
router.use('/accountant', require('./accountant'));
router.use('/files', require('./files'));
router.use('/configs', require('./configs'));
router.use('/regionPrice', require('./regionPrice'));
router.use('/agency', require('./agency'));
router.use('/services', require('./services'));


module.exports = router;
