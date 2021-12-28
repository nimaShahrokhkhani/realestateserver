var express = require('express');
var router = express.Router();
const sessionManager = require('../../helper/sessionManager');

// router.use('/base', sessionManager.initialize('/base'));

router.use('/login', require('./login'));
router.use('/logout', require('./logout'));
router.use('/realStateLogin', require('./realStateLogin'));
router.use('/register', require('./register'));
router.use('/clientConfig', require('./clientConfig'));
router.use('/clientFiles', require('./clientFiles'));
router.use('/getFiles', require('./getFiles'));
router.use('/blogList', require('./blogList'));
router.use('/bestAgencies', require('./bestAgencies'));

// router.use((request, response, next) => {
//     sessionManager.getSession(request)
//         .then((session) => {
//             next();
//         })
//         .catch((error) => {
//             response.status(403).send("session not found");
//         });
// });
router.use('/users', require('./users'));
router.use('/accountant', require('./accountant'));
router.use('/files', require('./files'));
router.use('/configs', require('./configs'));
router.use('/regionPrice', require('./regionPrice'));
router.use('/agency', require('./agency'));
router.use('/agencyProfile', require('./agencyProfile'));
router.use('/payments', require('./payments'));
router.use('/services', require('./services'));
router.use('/agencyFiles', require('./agencyFiles'));
router.use('/advertise', require('./advertising'));
router.use('/blogManager', require('./blogManager'));


module.exports = router;
