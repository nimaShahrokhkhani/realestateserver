var express = require('express');
var router = express.Router();
var db = require('../../helper/db');


router.get('/list', function (request, response, next) {
    let filterData = {

        Id: request.query.Id,
        agencyName: request.query.agencyName,
        expert: request.query.expert,
        serviceType: request.query.serviceType,
        coordinatedMoney: request.query.coordinatedMoney,
        receivedMoney: request.query.receivedMoney,
        debt: request.query.debt,
        description: request.query.description,
        date: request.query.date,

    };


    Object.keys(filterData).forEach(key => filterData[key] === undefined && delete filterData[key]);
    db.find(db.COLLECTIONS.SERVICES, filterData, request.query.offset, request.query.length).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("services not found");
    });
});


router.post('/insert', function (request, response, next) {
    let dataObject = {

        Id: request.body.Id,
        agencyName: request.body.agencyName,
        expert: request.body.expert,
        serviceType: request.body.serviceType,
        coordinatedMoney: request.body.coordinatedMoney,
        receivedMoney: request.body.receivedMoney,
        debt: request.body.debt,
        description: request.body.description,
        date: request.body.date,

    };


    db.insert(db.COLLECTIONS.SERVICES, dataObject).then((files) => {
        response.status(200).json(files);
    }).catch((error) => {
        response.status(409).send("services did not added");
    });
});

router.post('/edit', function (request, response, next) {
    let query = {
        Id: request.body.Id,
    };
    let newValuesObject = {

        agencyName: request.body.agencyName,
        expert: request.body.expert,
        serviceType: request.body.serviceType,
        coordinatedMoney: request.body.coordinatedMoney,
        receivedMoney: request.body.receivedMoney,
        debt: request.body.debt,
        description: request.body.description,
        date: request.body.date,

    };
    Object.keys(newValuesObject).forEach(key => newValuesObject[key] === undefined && delete newValuesObject[key]);
    let newValues = {
        $set: newValuesObject
    };
    db.update(db.COLLECTIONS.SERVICES, query, newValues).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("Services not found");
    });
});

router.post('/delete', function (request, response, next) {
    let query = {
        Id: request.body.Id,
    };
    db.deleteFunction(db.COLLECTIONS.SERVICES, query).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("Services not found");
    });
});

module.exports = router;
