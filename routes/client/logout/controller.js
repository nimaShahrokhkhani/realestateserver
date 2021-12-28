const router = require('express').Router();
const sessionManager = require('../../../helper/sessionManager');

router.get('/', (request, response, next) => {

    sessionManager.destroyClient(request, response).then(() => {
        response.status(200).json({});
    }).catch(error => {
        next(error);
    });
});

module.exports = router;
