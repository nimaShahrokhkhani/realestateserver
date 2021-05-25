var express = require('express');
var router = express.Router();
var db = require('../../helper/db');


router.get('/totalCount', function(request, response, next) {
    db.getCountOfDocument(db.COLLECTIONS.AGENCY, {}).then((agencies) => {
        response.status(200).json(agencies);
    }).catch(() => {
        response.status(409).send("agency not found");
    });
});


router.get('/list', function(request, response, next) {

    let filterData = {
        agencyName:request.query.agencyName ,
        agencyAddress: request.query.agencyAddress,
        managementName: request.query.managementName,
        telephone: request.query.telephone,
        personalTelephone: request.query.personalTelephone,
        discount: request.query.discount,
        regionList: request.query.regionList,
        totalPrice: request.query.totalPrice,
        agencyCode : request.query.agencyCode,
        registrationCode: request.query.registrationCode,
        manualPending :  request.query.manualPending,
        serviceStatus :  request.query.serviceStatus,
        expirationDate :  request.query.expirationDate,
        registrationDate :  request.query.registrationDate,
        nationalId :  request.query.nationalId,
        startDate :  request.query.startDate,
        allowGetFileFrom: request.query.allowGetFileFrom,
        allowGetFileTo: request.query.allowGetFileTo,
    };

    Object.keys(filterData).forEach(key => filterData[key] === undefined && delete filterData[key]);
    db.find(db.COLLECTIONS.AGENCY, filterData).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("agency not found");
    });
});

router.post('/insert', function(request, response, next) {

    let dataObject = {
        agencyName:request.body.agencyName ,
        agencyAddress: request.body.agencyAddress,
        managementName: request.body.managementName,
        telephone: request.body.telephone,
        personalTelephone: request.body.personalTelephone,
        discount: request.body.discount,
        regionList: request.body.regionList,
        totalPrice: request.body.totalPrice,
        agencyCode : request.body.agencyCode,
        registrationCode: request.body.registrationCode,
        manualPending :  request.body.manualPending,
        serviceStatus :  request.body.serviceStatus,
        expirationDate :  request.body.expirationDate,
        registrationDate :  request.body.registrationDate,
        nationalId :  request.body.nationalId,
        startDate :  request.body.startDate,
        allowGetFileFrom: request.body.allowGetFileFrom,
        allowGetFileTo: request.body.allowGetFileTo,
    };
    db.insert(db.COLLECTIONS.AGENCY, dataObject).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("agency did not added");
    });
});

router.post('/edit', function(request, response, next) {
    let query = {
        agencyCode : request.body.agencyCode ,
    };
    let newValuesObject = {
        agencyName:request.body.agencyName ,
        agencyAddress: request.body.agencyAddress,
        managementName: request.body.managementName,
        telephone: request.body.telephone,
        personalTelephone: request.body.personalTelephone,
        discount: request.body.discount,
        regionList: request.body.regionList,
        totalPrice: request.body.totalPrice,
        registrationCode: request.body.registrationCode,
        manualPending :  request.body.manualPending,
        serviceStatus :  request.body.serviceStatus,
        expirationDate :  request.body.expirationDate,
        registrationDate :  request.body.registrationDate,
        nationalId :  request.body.nationalId,
        startDate :  request.body.startDate,
        allowGetFileFrom: request.body.allowGetFileFrom,
        allowGetFileTo: request.body.allowGetFileTo,
    };
    Object.keys(newValuesObject).forEach(key => newValuesObject[key] === undefined && delete newValuesObject[key]);
    let newValues = {
        $set: newValuesObject
    };
    db.update(db.COLLECTIONS.AGENCY, query , newValues).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("agency not found");
    });
});

router.post('/registerAgency', function(request, response, next) {
    let query = {
        agencyCode : request.body.agencyCode,
    };
    db.find(db.COLLECTIONS.AGENCY, query).then((agencies) => {
        if (agencies[0].registrationCode === request.body.registrationCode) {
            let newValuesObject = {
                manualPending : 'active',
            };
            Object.keys(newValuesObject).forEach(key => newValuesObject[key] === undefined && delete newValuesObject[key]);
            let newValues = {
                $set: newValuesObject
            };
            db.update(db.COLLECTIONS.AGENCY, query , newValues).then((agencies) => {
                response.status(200).json(agencies);
            }).catch(() => {
                response.status(409).send("agency not found");
            });
        } else {
            response.status(409).send("agency temporary code not found");
        }
    }).catch(() => {
        response.status(409).send("agency not found");
    });
});

router.post('/delete', function(request, response, next) {

    let query = {
        agencyCode : request.body.agencyCode,
    };
    db.deleteFunction(db.COLLECTIONS.AGENCY, query).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("agency not found");
    });
});

module.exports = router;
