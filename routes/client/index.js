var express = require('express');
var router = express.Router();
const sessionManager = require('../../helper/sessionManager');
// router.use('/client',sessionManager.initialize('/client'));

router.use('/login', require('./login'));
router.use('/register', require('./register'));
router.use('/logout', require('./logout'));
router.use('/advertise', require('./advertise'));

// router.use((request, response, next) => {
//     sessionManager.getSession(request)
//         .then((session) => {
//             next();
//         })
//         .catch((error) => {
//             response.status(403).send("session not found");
//         });
// });
router.use('/clientUsers', require('./clientUsers'));
router.use('/advertising', require('./advertising'));


module.exports = router;
