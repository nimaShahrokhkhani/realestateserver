var express = require('express');
var router = express.Router();
var db = require('../../helper/db');


router.get('/list', function(request, response, next) {

    let filterData = {
        agencyId : request.query.agencyId ,
        agencyName:request.query.agencyName ,
        agencyAddress: request.query.agencyAddress,
        managementName: request.query.managementName,
        telephone: request.query.telephone,
        personalTelephone: request.query.personalTelephone,
        discount: request.query.discount,
        regionList: request.query.regionList,
        totalPrice: request.query.totalPrice,
        agencyCode : request.query.agencyCode,
        registration: request.query.registration,
        manualPending :  request.query.manualPending,
    };

    Object.keys(filterData).forEach(key => filterData[key] === undefined && delete filterData[key]);
    db.find(db.COLLECTIONS.AGENCY, {}).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("file not found");
    });
});

router.post('/insert', function(request, response, next) {

    let dataObject = {
        agencyId : request.query.agencyId ,
        agencyName:request.body.agencyName ,
        agencyAddress: request.body.agencyAddress,
        managementName: request.body.managementName,
        telephone: request.body.telephone,
        personalTelephone: request.body.personalTelephone,
        discount: request.body.discount,
        regionList: request.body.regionList,
        totalPrice: request.body.totalPrice,
        agencyCode : request.body.agencyCode,
        registration: request.body.registration,
        manualPending :  request.body.manualPending,
    };
    db.insert(db.COLLECTIONS.AGENCY, dataObject).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("File did not added");
    });
});

router.post('/edit', function(request, response, next) {
    let query = {
        agencyId : request.query.agencyId ,
    };
    let newValues = {
        agencyName:request.body.agencyName ,
        agencyAddress: request.body.agencyAddress,
        managementName: request.body.managementName,
        telephone: request.body.telephone,
        personalTelephone: request.body.personalTelephone,
        discount: request.body.discount,
        regionList: request.body.regionList,
        totalPrice: request.body.totalPrice,
        agencyCode : request.body.agencyCode,
        registration: request.body.registration,
        manualPending :  request.body.manualPending,
    };
    db.update(db.COLLECTIONS.AGENCY, query , newValues).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("File not found");
    });
});

router.post('/delete', function(request, response, next) {

    let query = {
        agencyId : request.body.agencyId ,
    };
    db.deleteFunction(db.COLLECTIONS.AGENCY, query).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("File not found");
    });
});

module.exports = router;
