var _ = require('underscore');
var express = require('express');
var router = express.Router();
var db = require('../../../helper/db');
const fs = require('fs');

router.get('/totalCount', function(request, response, next) {
    db.getCountOfDocumentV2(db.COLLECTIONS.PAYMENTS, {}).then((payments) => {
        response.status(200).json(payments + 1);
    }).catch(() => {
        response.status(409).send("Payments not found");
    });
});

router.get('/list', function (request, response, next) {
    let filterData = {
        agencyId: request.query.agencyId,
        chargeAmount: request.query.chargeAmount,
        discountAmount: request.query.discountAmount,
        adsAmount: request.query.adsAmount,
        credit: request.query.credit,
        billPaymentDate: request.query.billPaymentDate,
        refrenceNumber: request.query.refrenceNumber,
        cardNumber: request.query.cardNumber,
        payCacheToVisitor: request.query.payCacheToVisitor,
        paymentStatus: request.query.paymentStatus,
        subscriptionStatus: request.query.subscriptionStatus,
        description: request.query.description
    };

    Object.keys(filterData).forEach(key => _.isEmpty(filterData[key]) && delete filterData[key]);
    db.find(db.COLLECTIONS.PAYMENTS, filterData, request.query.offset, request.query.length).then((payments) => {
        response.status(200).json(payments);
    }).catch(() => {
        response.status(409).send("Payments not found");
    });
});

router.get('/last', function (request, response, next) {
    let filterData = {
        agencyId: request.query.agencyId,
    };

    db.findLastRecord(db.COLLECTIONS.PAYMENTS, filterData).then((payments) => {
        response.status(200).json(payments);
    }).catch(() => {
        response.status(409).send("Payments not found");
    });
});


router.post('/insert', function (request, response, next) {
    let dataObject = {
        agencyId: request.body.agencyId,
        chargeAmount: request.body.chargeAmount,
        discountAmount: request.body.discountAmount,
        adsAmount: request.body.adsAmount,
        credit: request.body.credit,
        billPaymentDate: request.body.billPaymentDate,
        refrenceNumber: request.body.refrenceNumber,
        cardNumber: request.body.cardNumber,
        payCacheToVisitor: request.body.payCacheToVisitor,
        paymentStatus: request.body.paymentStatus,
        subscriptionStatus: request.body.subscriptionStatus,
        description: request.body.description
    };

    db.insert(db.COLLECTIONS.PAYMENTS, dataObject).then((payments) => {
        response.status(200).json(payments);
    }).catch((error) => {
        response.status(409).send("Payments did not added");
    });
});

router.post('/edit', function (request, response, next) {
    let query = {
        agencyId: request.body.agencyId,
    };
    let newValuesObject = {
        chargeAmount: request.body.chargeAmount,
        discountAmount: request.body.discountAmount,
        adsAmount: request.body.adsAmount,
        credit: request.body.credit,
        billPaymentDate: request.body.billPaymentDate,
        refrenceNumber: request.body.refrenceNumber,
        cardNumber: request.body.cardNumber,
        payCacheToVisitor: request.body.payCacheToVisitor,
        paymentStatus: request.body.paymentStatus,
        subscriptionStatus: request.body.subscriptionStatus,
        description: request.body.description
    };
    Object.keys(newValuesObject).forEach(key => newValuesObject[key] === undefined && delete newValuesObject[key]);
    let newValues = {
        $set: newValuesObject
    };
    db.update(db.COLLECTIONS.PAYMENTS, query, newValues).then((payments) => {
        response.status(200).json(payments);
    }).catch(() => {
        response.status(409).send("Payments not found");
    });
});

router.post('/delete', function (request, response, next) {
    let query = {
        agencyId: request.body.agencyId,
    };
    db.deleteFunction(db.COLLECTIONS.PAYMENTS, query).then((payments) => {
        response.status(200).json(payments);
    }).catch(() => {
        response.status(409).send("Payments not found");
    });
});

module.exports = router;
