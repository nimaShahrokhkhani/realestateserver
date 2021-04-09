var express = require('express');
var router = express.Router();
var db = require('../../helper/db');


router.get('/list', function(request, response, next) {

    let filterData = {
        agencyName:request.query.agencyName ,
        totalPrice: request.query.totalPrice,
        cost: request.query.cost,
        paymentDate: request.query.paymentDate,
        paymentReason: request.query.paymentReason,
    };

    Object.keys(filterData).forEach(key => filterData[key] === undefined && delete filterData[key]);
    db.find(db.COLLECTIONS.ACCOUNTANT, {}).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("Accountancy Board not found");
    });
});

router.post('/insert', function(request, response, next) {

    let dataObject = {
        agencyName:request.body.agencyName ,
        totalPrice: request.body.totalPrice,
        cost: request.body.cost,
        paymentDate: request.body.paymentDate,
        paymentReason: request.body.paymentReason,
    };
    db.insert(db.COLLECTIONS.ACCOUNTANT, dataObject).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("Accountancy Board  did not added");
    });
});

router.post('/edit', function(request, response, next) {
    let query = {
        _id : request.query._id ,
    };
    let newValues = {
        agencyName:request.body.agencyName ,
        totalPrice: request.body.totalPrice,
        cost: request.body.cost,
        paymentDate: request.body.paymentDate,
        paymentReason: request.body.paymentReason,
    };
    db.update(db.COLLECTIONS.ACCOUNTANT, query , newValues).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("Accountancy Board  not found");
    });
});

router.post('/delete', function(request, response, next) {

    let query = {
        _id : request.body._id,
    };
    db.deleteFunction(db.COLLECTIONS.ACCOUNTANT, query).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("Accountancy Board  not found");
    });
});

module.exports = router;
