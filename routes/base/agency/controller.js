var express = require('express');
var router = express.Router();
var db = require('../../../helper/db');
var multer = require('multer');
var path = require('path');
var mime = require('mime');
var fs = require('fs');
var _ = require('underscore');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
var upload = multer({storage: storage});

router.get('/download', function (req, res) {

    var file = './uploads/' + req.query.fileName;

    var filename = path.basename(file);
    var mimetype = mime.lookup(file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
});

router.get('/totalCount', function(request, response, next) {
    db.getCountOfDocumentV2(db.COLLECTIONS.AGENCY, {}).then((agencies) => {
        response.status(200).json(agencies + 1);
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
        username: request.query.username,
        password: request.query.password,
        activePrintType: request.query.activePrintType,
        activeSoftwareType: request.query.activeSoftwareType,
        activeWebsiteType: request.query.activeWebsiteType,
        activeMobileType: request.query.activeMobileType,
        activeAdvertiseType: request.query.activeAdvertiseType,
        mobileUserList: request.query.mobileUserList,
        marketer: request.query.marketer,
        visitor: request.query.visitor,
        postalCode: request.query.postalCode,
        bestAgency: request.query.bestAgency,
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
        username: request.body.username,
        password: request.body.password,
        activePrintType: request.body.activePrintType,
        activeSoftwareType: request.body.activeSoftwareType,
        activeWebsiteType: request.body.activeWebsiteType,
        activeAdvertiseType: request.body.activeAdvertiseType,
        activeMobileType: request.body.activeMobileType,
        mobileUserList: request.body.mobileUserList,
        marketer: request.body.marketer,
        visitor: request.body.visitor,
        postalCode: request.body.postalCode,
        bestAgency: request.body.bestAgency,
        image: request.body.image,
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
        username: request.body.username,
        password: request.body.password,
        activePrintType: request.body.activePrintType,
        activeSoftwareType: request.body.activeSoftwareType,
        activeWebsiteType: request.body.activeWebsiteType,
        activeAdvertiseType: request.body.activeAdvertiseType,
        activeMobileType: request.body.activeMobileType,
        mobileUserList: request.body.mobileUserList,
        marketer: request.body.marketer,
        visitor: request.body.visitor,
        postalCode: request.body.postalCode,
        bestAgency: request.body.bestAgency,
        image: request.body.image,
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

router.post('/insertV2', upload.single('file'), function(request, response, next) {
    request.body.image = request.file ? request.file.filename : undefined;
    let dataObject = {
        image: request.body.image,
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
        username: request.body.username,
        password: request.body.password,
        activePrintType: request.body.activePrintType,
        activeSoftwareType: request.body.activeSoftwareType,
        activeWebsiteType: request.body.activeWebsiteType,
        activeAdvertiseType: request.body.activeAdvertiseType,
        activeMobileType: request.body.activeMobileType,
        mobileUserList: request.body.mobileUserList,
        marketer: request.body.marketer,
        visitor: request.body.visitor,
        postalCode: request.body.postalCode,
        bestAgency: request.body.bestAgency,
    };
    db.insert(db.COLLECTIONS.AGENCY, dataObject).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("agency did not added");
    });
});

router.post('/editV2', upload.single('file'), function(request, response, next) {
    request.body.image = request.file ? request.file.filename : undefined;
    let query = {
        agencyCode : request.body.agencyCode ,
    };
    let newValuesObject = {
        image: request.body.image,
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
        username: request.body.username,
        password: request.body.password,
        activePrintType: request.body.activePrintType,
        activeSoftwareType: request.body.activeSoftwareType,
        activeWebsiteType: request.body.activeWebsiteType,
        activeAdvertiseType: request.body.activeAdvertiseType,
        activeMobileType: request.body.activeMobileType,
        mobileUserList: request.body.mobileUserList,
        marketer: request.body.marketer,
        visitor: request.body.visitor,
        postalCode: request.body.postalCode,
        bestAgency: request.body.bestAgency,
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

router.post('/registerAgencyMobileUser', function(request, response, next) {
    let query = {
        agencyCode : request.body.agencyCode,
    };
    db.find(db.COLLECTIONS.AGENCY, query).then((agencies) => {
        if (agencies[0].activeMobileType === 'active') {
            let mobileUsers = agencies[0].mobileUserList ? agencies[0].mobileUserList : [];
            let mobileUserList = mobileUsers.filter(user => user.username === request.body.username);
            if (mobileUserList && mobileUserList.length > 0) {
                response.status(406).send("username is already taken");
            } else {
                let newUserObject = {
                    agencyCode : request.body.agencyCode,
                    agencyName : agencies[0].agencyName,
                    deviceId : request.body.deviceId,
                    name : request.body.name,
                    lastName : request.body.lastName,
                    username : request.body.username,
                    password : request.body.password,
                    active: true
                };
                let newValuesObject = {
                    mobileUserList: agencies[0].mobileUserList ? agencies[0].mobileUserList : []
                };
                newValuesObject.mobileUserList.push(newUserObject);
                Object.keys(newValuesObject).forEach(key => newValuesObject[key] === undefined && delete newValuesObject[key]);
                let newValues = {
                    $set: newValuesObject
                };
                db.update(db.COLLECTIONS.AGENCY, query , newValues).then((agencies) => {
                    response.status(200).json(agencies);
                }).catch(() => {
                    response.status(407).send("agency not found");
                });
            }
        } else {
            response.status(408).send("agency is not active for mobile devices");
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
