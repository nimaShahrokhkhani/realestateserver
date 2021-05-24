var express = require('express');
var router = express.Router();
var db = require('../../helper/db');


router.post('/', function (request, response, next) {
    let filterData = {
        username: request.body.username,
        password: request.body.password,
        email: request.body.email,
    };
    db.find(db.COLLECTIONS.USERS, filterData).then((users) => {
        response.status(200).json(users);
    }).catch(() => {
        response.status(409).send("Username not found");
    });
});


module.exports = router;
