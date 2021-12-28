var express = require('express');
var router = express.Router();
var db = require('../../../helper/db');
var multer = require('multer');
var path = require('path');
var mime = require('mime');
var fs = require('fs');

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

router.post('/edit', upload.single('file'), function(request, response, next) {
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
        activeAdvertiseType: request.body.activeWebsiteType,
        marketer: request.body.marketer,
        visitor: request.body.visitor,
        postalCode: request.body.postalCode,
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

module.exports = router;
