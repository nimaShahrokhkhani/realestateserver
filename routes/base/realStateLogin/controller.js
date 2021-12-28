var express = require('express');
var router = express.Router();
var db = require('../../../helper/db');
const sessionManager = require('../../../helper/sessionManager');

router.post('/', function(request, response, next) {
    let username = request.body.username;
    let password = request.body.password;
    db.find(db.COLLECTIONS.AGENCY,{username: username, password: password}).then((agencies) => {
        if (agencies.length !== 0 && agencies[0].activeWebsiteType) {
            sessionManager.regenerate(request).then((session) => {
                delete agencies[0]["password"];
                response.status(200).json(agencies[0]);
           });
        } else {
            response.status(409).send("Username not found");
        }
    }).catch(() => {
        response.status(409).send();
    });
});

router.post('/mobile', function(request, response, next) {
    let agencyCode = request.body.agencyCode;
    let username = request.body.username;
    let password = request.body.password;
    db.find(db.COLLECTIONS.AGENCY,{agencyCode: agencyCode}).then((agencies) => {
        if (agencies.length !== 0 && agencies[0].activeMobileType) {
            let mobileUserList = agencies[0].mobileUserList ? agencies[0].mobileUserList : [];
            let user = mobileUserList.filter(user => user.username === username && user.password === password);
            if (user && user.length === 1) {
                sessionManager.regenerate(request).then((session) => {
                    delete agencies[0]["password"];
                    user.agencyCode = agencyCode;
                    response.status(200).json(user);
                });
            } else {
                response.status(407).send("Username not found");
            }
        } else {
            response.status(408).send("device is not active");
        }
    }).catch(() => {
        response.status(409).send("agency is not available");
    });
});

router.post('/session', function(request, response, next) {
    sessionManager.regenerate(request).then((session) => {
        response.status(200).json('');
    }).catch((error) => {
        next(error);
    });
});

module.exports = router;
