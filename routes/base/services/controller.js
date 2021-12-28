var express = require('express');
var router = express.Router();
var db = require('../../../helper/db');
var _ = require('underscore');

router.get('/totalCount', function (request, response, next) {
    db.getCountOfDocumentV2(db.COLLECTIONS.SERVICES, {}).then((services) => {
        response.status(200).json(services + 1);
    }).catch(() => {
        response.status(409).send("services not found");
    });
});

router.get('/list', function (request, response, next) {
    let filterData = {
        agencyName: request.query.agencyName,
        agencyAddress: request.query.agencyAddress,
        agencyCode: request.query.agencyCode,
        managementName: request.query.managementName,
        agencyTelephone: request.query.agencyTelephone,
        expertName: request.query.expertName,
        expertLastName: request.query.expertLastName,
        expertUsername: request.query.expertUsername,
        expertTel: request.query.expertTel,
        serviceType: request.query.serviceType,
        serviceRegistrationDate: {
            $gte: !_.isEmpty(request.query.fromServiceRegistrationDate) ? parseInt(request.query.fromCoordinatedDate) : undefined,//greater than or equal query
            $lte: !_.isEmpty(request.query.fromServiceRegistrationDate) ? parseInt(request.query.toCoordinatedDate) : undefined,
        },
        serviceCode: request.query.serviceCode,
        caller: request.query.caller,
        coordinationTelNumber: request.query.coordinationTelNumber,
        coordinationMobileNumber: request.query.coordinationMobileNumber,
        Marketer: request.query.Marketer,
        serviceStatusColor: request.query.serviceStatusColor,
        serviceStatus: request.query.serviceStatus,
        currentServiceStatus: request.query.currentServiceStatus,
        coordinatedTime: request.query.coordinatedTime,
        coordinatedDate: {
            $gte: !_.isEmpty(request.query.fromCoordinatedDate) ? parseInt(request.query.fromCoordinatedDate) : undefined,//greater than or equal query
            $lte: !_.isEmpty(request.query.toCoordinatedDate) ? parseInt(request.query.toCoordinatedDate) : undefined,
        },
        coordinatedFee: request.query.coordinatedFee,
        paymentFee: request.query.paymentFee,
        factorNumber: request.query.factorNumber,
        description: request.query.description,
    };


    Object.keys(filterData).forEach(key => !_.isEmpty(filterData[key]) && _.isEmpty(filterData[key].$gte) && delete filterData[key].$gte);
    Object.keys(filterData).forEach(key => !_.isEmpty(filterData[key]) && _.isEmpty(filterData[key].$lte) && delete filterData[key].$lte);
    Object.keys(filterData).forEach(key => _.isEmpty(filterData[key]) && delete filterData[key]);
    db.find(db.COLLECTIONS.SERVICES, filterData, request.query.offset, request.query.length).then((services) => {
        response.status(200).json(services);
    }).catch(() => {
        response.status(409).send("services not found");
    });
});

router.get('/monthPriceList', function (request, response, next) {
    let today = new Date();
    let todayBase = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    const yesterday = new Date(todayBase.getTime() - 604800000);

    let priceList = [];
    let filterData = {
        serviceRegistrationDate: {
            $gte: yesterday.getTime(),
            $lte: todayBase.getTime(),
        }
    };


    Object.keys(filterData).forEach(key => filterData[key] === undefined && delete filterData[key]);
    db.find(db.COLLECTIONS.SERVICES, filterData).then((services) => {
        for (let day = yesterday.getTime(); day <= todayBase.getTime(); day += 86400000) {
            let dayServices = services.filter(service => service.serviceRegistrationDate >= day && service.serviceRegistrationDate < day + 86400);
            let totalDayPrice = 0;
            for (let dayService of dayServices) {
                totalDayPrice += parseInt(dayService.paymentFee);
            }
            priceList.push(totalDayPrice);
        }
        response.status(200).json(priceList);
    }).catch(() => {
        response.status(409).send("services not found");
    });
});


router.post('/insert', function (request, response, next) {
    let dataObject = {
        agencyName: request.body.agencyName,
        agencyAddress: request.body.agencyAddress,
        agencyCode: request.body.agencyCode,
        managementName: request.body.managementName,
        agencyTelephone: request.body.agencyTelephone,
        expertName: request.body.expertName,
        expertLastName: request.body.expertLastName,
        expertUsername: request.body.expertUsername,
        expertTel: request.body.expertTel,
        serviceType: request.body.serviceType,
        serviceRegistrationDate: request.body.serviceRegistrationDate,
        serviceCode: request.body.serviceCode,
        caller: request.body.caller,
        coordinationTelNumber: request.body.coordinationTelNumber,
        coordinationMobileNumber: request.body.coordinationMobileNumber,
        Marketer: request.body.Marketer,
        serviceStatusColor: request.body.serviceStatusColor,
        serviceStatus: request.body.serviceStatus,
        currentServiceStatus: request.body.currentServiceStatus,
        coordinatedTime: request.body.coordinatedTime,
        coordinatedDate: request.body.coordinatedDate,
        coordinatedFee: request.body.coordinatedFee,
        paymentFee: request.body.paymentFee,
        factorNumber: request.body.factorNumber,
        description: request.body.description,
    };


    db.insert(db.COLLECTIONS.SERVICES, dataObject).then((services) => {
        response.status(200).json(services);
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
        agencyAddress: request.body.agencyAddress,
        agencyCode: request.body.agencyCode,
        managementName: request.body.managementName,
        agencyTelephone: request.body.agencyTelephone,
        expertName: request.body.expertName,
        expertLastName: request.body.expertLastName,
        expertUsername: request.body.expertUsername,
        expertTel: request.body.expertTel,
        serviceType: request.body.serviceType,
        serviceRegistrationDate: request.body.serviceRegistrationDate,
        serviceCode: request.body.serviceCode,
        caller: request.body.caller,
        coordinationTelNumber: request.body.coordinationTelNumber,
        coordinationMobileNumber: request.body.coordinationMobileNumber,
        Marketer: request.body.Marketer,
        serviceStatusColor: request.body.serviceStatusColor,
        serviceStatus: request.body.serviceStatus,
        currentServiceStatus: request.body.currentServiceStatus,
        coordinatedTime: request.body.coordinatedTime,
        coordinatedDate: request.body.coordinatedDate,
        coordinatedFee: request.body.coordinatedFee,
        paymentFee: request.body.paymentFee,
        factorNumber: request.body.factorNumber,
        description: request.body.description,
    };
    Object.keys(newValuesObject).forEach(key => newValuesObject[key] === undefined && delete newValuesObject[key]);
    let newValues = {
        $set: newValuesObject
    };
    db.update(db.COLLECTIONS.SERVICES, query, newValues).then((services) => {
        response.status(200).json(services);
    }).catch(() => {
        response.status(409).send("Services not found");
    });
});

router.post('/delete', function (request, response, next) {
    let query = {
        serviceCode: request.body.serviceCode,
    };
    db.deleteFunction(db.COLLECTIONS.SERVICES, query).then((services) => {
        response.status(200).json(services);
    }).catch(() => {
        response.status(409).send("Services not found");
    });
});

module.exports = router;
