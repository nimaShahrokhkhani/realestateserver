const sessionManager = require('../../../helper/sessionManager');
var express = require('express');
var router = express.Router();
var db = require('../../../helper/db');


router.post('/', function (request, response, next) {
    let dataObject = {
        username: request.body.username,
        password: request.body.password,
        email: request.body.email,
    };

    var filterData = {
        username: request.body.username
    };

    db.find(db.COLLECTIONS.CLIENT_USERS, filterData).then((users) => {
        if (_.isEmpty(users)) {
            db.insert(db.COLLECTIONS.CLIENT_USERS, dataObject).then((res) => {
                sessionManager.regenerate(request).then((session) => {
                    response.status(200).json(res);
                });
            }).catch((error) => {
                response.status(409).send("User did not added");
            });
        } else {
            response.status(409).send("User did not added");
        }
    }).catch(() => {
        db.insert(db.COLLECTIONS.CLIENT_USERS, dataObject).then((res) => {
            sessionManager.regenerate(request).then((session) => {
                response.status(200).json(res);
            });
        }).catch(() => {
            response.status(409).send("User did not added");
        });
    });
});


module.exports = router;
