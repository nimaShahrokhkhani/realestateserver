var express = require('express');
var router = express.Router();
var db = require('../../../helper/db');


router.post('/', function (request, response, next) {
    let dataObject = {
        username: request.body.username,
        name: request.body.name,
        lastName: request.body.lastName,
        userRole: request.body.userRole,
        password: request.body.password,
        shenaSName: request.body.shenaSName,
        nationalId: request.body.nationalId,
        birthDate: request.body.birthDate,
        birthPlace: request.body.birthPlace,
        address: request.body.address,
        tel: request.body.tel,
        recruitedDate: request.body.recruitedDate,
        profession: request.body.profession,
        minimumSalary: request.body.minimumSalary,
        comment: request.body.comment,
        priceFrom: request.body.priceFrom,
        priceTo: request.body.priceTo,
        priceFromMeter: request.body.priceFromMeter,
        priceToMeter: request.body.priceToMeter,
        insertFile: request.body.insertFile,
        deleteFile: request.body.deleteFile,
        editFile: request.body.editFile,
        userType: request.body.userType,

    };

    var filterData = {
        username: request.body.username
    };

    db.find(db.COLLECTIONS.USERS, filterData).then((users) => {
        if (_.isEmpty(users)) {
            db.insert(db.COLLECTIONS.USERS, dataObject).then((res) => {
                response.status(200).json(res);
            }).catch((error) => {
                response.status(409).send("User did not added");
            });
        } else {
            response.status(409).send("User did not added");
        }
    }).catch(() => {
        db.insert(db.COLLECTIONS.USERS, dataObject).then((res) => {
            response.status(200).json(res);
        }).catch(() => {
            response.status(409).send("User did not added");
        });
    });
});


module.exports = router;
