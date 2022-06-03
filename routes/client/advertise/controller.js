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

router.get('/totalCount', function (request, response, next) {
    db.getCountOfDocumentV2(db.COLLECTIONS.ADVERTISING, {}).then((files) => {
        let finalResult = files + 1;
        response.status(200).json(finalResult);
    }).catch(() => {
        response.status(409).send("file not found");
    });
});

router.get('/list', function (request, response, next) {

    let filterData = {
        advertisingCode: request.query.advertisingCode,
        tel: request.query.tel,
        owner: request.query.owner,
        iranDate: request.query.iranDate,
        date: {
            $gte: parseInt(request.query.fromDate),//greater than or equal query
            $lte: parseInt(request.query.toDate),
        },
        address: !_.isEmpty(request.query.address) ? {$in: request.query.address} : undefined,
        city: !_.isEmpty(request.query.city) ? {$in: request.query.city} : undefined,//contain query
        province: !_.isEmpty(request.query.province) ? {$in: request.query.province} : undefined,
        postalCode: request.query.postalCode,
        sale: !_.isEmpty(request.query.sale) ? {$in: request.query.sale} : undefined,
        rent: {
            $gte: parseInt(request.query.fromRent),
            $lte: parseInt(request.query.toRent),
        },
        mortgage: {
            $gte: parseInt(request.query.fromMortgage),
            $lte: parseInt(request.query.toMortgage),
        },
        apartment: request.query.apartment === "true" ? {$exists: true, $ne: ""} : request.query.apartment,
        land: request.query.land === "true" ? {$exists: true, $ne: ""} : request.query.land,
        vila: request.query.vila === "true" ? {$exists: true} : request.query.vila,
        building: request.query.building === "true" ? {$exists: true, $ne: ""} : request.query.building,
        home: request.query.home,
        oldHouse: request.query.oldHouse === "true" ? {$exists: true, $ne: ""} : request.query.oldHouse,
        office: request.query.office === "true" ? {$exists: true, $ne: ""} : request.query.office,
        store: request.query.store,
        suit: request.query.suit,
        north: request.query.north,
        south: request.query.south,
        east: request.query.east,
        west: request.query.west,
        unitFloor: request.query.unitFloor,
        unitRoom: request.query.unitRoom,
        unitBalcony: request.query.unitBalcony,
        unitTelephone: request.query.unitTelephone,
        unitWC: request.query.unitWC,
        unitFloorCovering: request.query.unitFloorCovering,
        unitKitchen: request.query.unitKitchen,
        unitBuiltUpArea: request.query.unitBuiltUpArea,
        unitOpen: request.query.unitOpen,
        unitMetri: request.query.unitMetri,
        unitTotalAmount: request.query.unitTotalAmount,
        type: request.query.type,
        floorNo: {
            $gte: parseInt(request.query.fromFloorNo),
            $lte: parseInt(request.query.toFloorNo),
        },
        unitNo: {
            $gte: parseInt(request.query.fromUnitNo),
            $lte: parseInt(request.query.toUnitNo),
        },
        totalUnit: request.query.totalUnit,
        unitComment: request.query.unitComment,
        totalPrice: {
            $gte: parseInt(request.query.fromTotalPrice),
            $lte: parseInt(request.query.toTotalPrice),
        },
        unitPrice: {
            $gte: parseInt(request.query.fromUnitPrice),
            $lte: parseInt(request.query.toUnitPrice),
        },
        priceComment: request.query.priceComment,
        pool: request.query.pool,
        sona: request.query.sona,
        jakozi: request.query.jakozi,
        area: {
            $gte: parseInt(request.query.fromArea),
            $lte: parseInt(request.query.toArea),
        },
        density: request.query.density,
        front: {
            $gte: parseInt(request.query.fromFront),
            $lte: parseInt(request.query.toFront),
        },
        height: {
            $gte: parseInt(request.query.fromHeight),
            $lte: parseInt(request.query.toHeight),
        },
        modify: request.query.modify,
        yard: request.query.yard,
        smallYard: request.query.smallYard,
        underGround: request.query.underGround,
        employeeService: request.query.employeeService,
        patio: request.query.patio,
        residential: request.query.residential,
        empty: request.query.empty,
        rented: request.query.rented,
        age: {
            $gte: parseInt(request.query.fromAge),
            $lte: parseInt(request.query.toAge),
        },
        frontKind: request.query.frontKind,
        source: request.query.source,
        publisher: request.query.publisher,
        ownerInHouse: request.query.ownerInHouse,
        documentKind: request.query.documentKind,
        comment: request.query.comment,
        caseKind: request.query.caseKind,
        Number: {
            $gte: parseInt(request.query.fromNumber),
            $lte: parseInt(request.query.toNumber),
        },
        inHurry: request.query.inHurry,
        equipments: !_.isEmpty(request.query.equipments) ? {$in: request.query.equipments} : undefined,
        archive: request.query.archive,
        participation: request.query.participation,
        exchange: request.query.exchange,
        username: request.query.username,
        noOwnerAccess: request.query.noOwnerAccess,
        realStateAccess: request.query.realStateAccess,
        title: request.query.title,
        contactInfoName: request.query.contactInfoName,
        contactInfoEmail: request.query.contactInfoEmail,
        contactInfoTel: request.query.contactInfoTel,
        images: request.query.images,
        showOnSite: 'true',
    };

    Object.keys(filterData).forEach(key => !_.isEmpty(filterData[key]) && Number.isNaN(filterData[key].$gte) && delete filterData[key].$gte);
    Object.keys(filterData).forEach(key => !_.isEmpty(filterData[key]) && Number.isNaN(filterData[key].$lte) && delete filterData[key].$lte);
    Object.keys(filterData).forEach(key => _.isEmpty(filterData[key]) && delete filterData[key]);
    Object.keys(filterData).forEach(key => filterData[key] === 'true' && (filterData[key] = true));
    Object.keys(filterData).forEach(key => filterData[key] === 'false' && (filterData[key] = false));
    db.findWithSort(db.COLLECTIONS.ADVERTISING, filterData, request.query.offset, request.query.length, {'date': -1}).then((advertises) => {
        response.status(200).json(advertises);
    }).catch(() => {
        response.status(409).send("ADs not found");
    });
});

router.get('/latestList', function (request, response, next) {

    let filterData = {
        advertisingCode: request.query.advertisingCode,
        tel: request.query.tel,
        owner: request.query.owner,
        iranDate: request.query.iranDate,
        date: {
            $gte: parseInt(request.query.fromDate),//greater than or equal query
            $lte: parseInt(request.query.toDate),
        },
        address: !_.isEmpty(request.query.address) ? {$in: request.query.address} : undefined,
        city: !_.isEmpty(request.query.city) ? {$in: request.query.city} : undefined,//contain query
        province: !_.isEmpty(request.query.province) ? {$in: request.query.province} : undefined,
        postalCode: request.query.postalCode,
        sale: !_.isEmpty(request.query.sale) ? {$in: request.query.sale} : undefined,
        rent: {
            $gte: parseInt(request.query.fromRent),
            $lte: parseInt(request.query.toRent),
        },
        mortgage: {
            $gte: parseInt(request.query.fromMortgage),
            $lte: parseInt(request.query.toMortgage),
        },
        apartment: request.query.apartment === "true" ? {$exists: true, $ne: ""} : request.query.apartment,
        land: request.query.land === "true" ? {$exists: true, $ne: ""} : request.query.land,
        vila: request.query.vila === "true" ? {$exists: true} : request.query.vila,
        building: request.query.building === "true" ? {$exists: true, $ne: ""} : request.query.building,
        home: request.query.home,
        oldHouse: request.query.oldHouse === "true" ? {$exists: true, $ne: ""} : request.query.oldHouse,
        office: request.query.office === "true" ? {$exists: true, $ne: ""} : request.query.office,
        store: request.query.store,
        suit: request.query.suit,
        north: request.query.north,
        south: request.query.south,
        east: request.query.east,
        west: request.query.west,
        unitFloor: request.query.unitFloor,
        unitRoom: request.query.unitRoom,
        unitBalcony: request.query.unitBalcony,
        unitTelephone: request.query.unitTelephone,
        unitWC: request.query.unitWC,
        unitFloorCovering: request.query.unitFloorCovering,
        unitKitchen: request.query.unitKitchen,
        unitBuiltUpArea: request.query.unitBuiltUpArea,
        unitOpen: request.query.unitOpen,
        unitMetri: request.query.unitMetri,
        unitTotalAmount: request.query.unitTotalAmount,
        type: request.query.type,
        floorNo: {
            $gte: parseInt(request.query.fromFloorNo),
            $lte: parseInt(request.query.toFloorNo),
        },
        unitNo: {
            $gte: parseInt(request.query.fromUnitNo),
            $lte: parseInt(request.query.toUnitNo),
        },
        totalUnit: request.query.totalUnit,
        unitComment: request.query.unitComment,
        totalPrice: {
            $gte: parseInt(request.query.fromTotalPrice),
            $lte: parseInt(request.query.toTotalPrice),
        },
        unitPrice: {
            $gte: parseInt(request.query.fromUnitPrice),
            $lte: parseInt(request.query.toUnitPrice),
        },
        priceComment: request.query.priceComment,
        pool: request.query.pool,
        sona: request.query.sona,
        jakozi: request.query.jakozi,
        area: {
            $gte: parseInt(request.query.fromArea),
            $lte: parseInt(request.query.toArea),
        },
        density: request.query.density,
        front: {
            $gte: parseInt(request.query.fromFront),
            $lte: parseInt(request.query.toFront),
        },
        height: {
            $gte: parseInt(request.query.fromHeight),
            $lte: parseInt(request.query.toHeight),
        },
        modify: request.query.modify,
        yard: request.query.yard,
        smallYard: request.query.smallYard,
        underGround: request.query.underGround,
        employeeService: request.query.employeeService,
        patio: request.query.patio,
        residential: request.query.residential,
        empty: request.query.empty,
        rented: request.query.rented,
        age: {
            $gte: parseInt(request.query.fromAge),
            $lte: parseInt(request.query.toAge),
        },
        frontKind: request.query.frontKind,
        source: request.query.source,
        publisher: request.query.publisher,
        ownerInHouse: request.query.ownerInHouse,
        documentKind: request.query.documentKind,
        comment: request.query.comment,
        caseKind: request.query.caseKind,
        Number: {
            $gte: parseInt(request.query.fromNumber),
            $lte: parseInt(request.query.toNumber),
        },
        inHurry: request.query.inHurry,
        equipments: !_.isEmpty(request.query.equipments) ? {$in: request.query.equipments} : undefined,
        archive: request.query.archive,
        participation: request.query.participation,
        exchange: request.query.exchange,
        username: request.query.username,
        noOwnerAccess: request.query.noOwnerAccess,
        realStateAccess: request.query.realStateAccess,
        title: request.query.title,
        contactInfoName: request.query.contactInfoName,
        contactInfoEmail: request.query.contactInfoEmail,
        contactInfoTel: request.query.contactInfoTel,
        images: request.query.images,
        showOnSite: 'true',
    };

    Object.keys(filterData).forEach(key => !_.isEmpty(filterData[key]) && Number.isNaN(filterData[key].$gte) && delete filterData[key].$gte);
    Object.keys(filterData).forEach(key => !_.isEmpty(filterData[key]) && Number.isNaN(filterData[key].$lte) && delete filterData[key].$lte);
    Object.keys(filterData).forEach(key => _.isEmpty(filterData[key]) && delete filterData[key]);
    Object.keys(filterData).forEach(key => filterData[key] === 'true' && (filterData[key] = true));
    Object.keys(filterData).forEach(key => filterData[key] === 'false' && (filterData[key] = false));
    db.findWithSort(db.COLLECTIONS.ADVERTISING, filterData, request.query.offset, request.query.length, {'date': -1}).then((advertises) => {
        response.status(200).json(advertises);
    }).catch(() => {
        response.status(409).send("ADs not found");
    });
});

module.exports = router;
