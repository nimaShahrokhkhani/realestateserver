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

router.get('/list', function(request, response, next) {

    let filterData = {
        advertisingCode: request.query.advertisingCode,
        tel: request.query.tel,
        owner:  request.query.owner,
        iranDate: request.query.iranDate,
        date: {
            $gte: parseInt(request.query.fromDate),//greater than or equal query
            $lte: parseInt(request.query.toDate),
        },
        address: !_.isEmpty(request.query.address) ? {$in: request.query.address} : undefined,
        city: !_.isEmpty(request.query.city) ? {$in: request.query.city} : undefined,//contain query
        province: !_.isEmpty(request.query.province) ? {$in: request.query.province} : undefined,
        sale: !_.isEmpty(request.query.sale) ? {$in: request.query.sale} : undefined,
        postalCode: request.query.postalCode,
        rent: {
            $gte: parseInt(request.query.fromRent),
            $lte: parseInt(request.query.toRent),
        },
        mortgage: {
            $gte: parseInt(request.query.fromMortgage),
            $lte: parseInt(request.query.toMortgage),
        },
        apartment: request.query.apartment === "true" ? {$exists: true, $ne : ""} : request.query.apartment,
        land: request.query.land === "true" ? {$exists: true, $ne : ""} : request.query.land,
        vila: request.query.vila === "true" ? {$exists: true} : request.query.vila,
        building: request.query.building === "true" ? {$exists: true, $ne : ""} : request.query.building,
        home: request.query.home,
        oldHouse: request.query.oldHouse === "true" ? {$exists: true, $ne : ""} : request.query.oldHouse,
        office: request.query.office === "true" ? {$exists: true, $ne : ""} : request.query.office,
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
    db.find(db.COLLECTIONS.ADVERTISING, filterData, request.query.offset, request.query.length).then((advertises) => {
        response.status(200).json(advertises);
    }).catch(() => {
        response.status(409).send("ADs not found");
    });
});

router.post('/insert', upload.array('files', 10), function(request, response, next) {

    request.body.images = request.files;

    let dataObject = {
        images: request.body.images,
        advertisingCode: request.body.advertisingCode,
        tel: request.body.tel,
        owner:  request.body.owner,
        iranDate: request.body.iranDate,
        date: request.body.date,
        address: request.body.address,
        city: request.body.city,
        province: request.body.province,
        postalCode: request.body.postalCode,
        sale: request.body.sale,
        rent: request.body.rent,
        mortgage: request.body.mortgage,
        apartment: request.body.apartment,
        land: request.body.land,
        vila: request.body.vila,
        building: request.body.building,
        home: request.body.home,
        oldHouse: request.body.oldHouse,
        office: request.body.office,
        store: request.body.store,
        suit: request.body.suit,
        north: request.body.north,
        south: request.body.south,
        east: request.body.east,
        west: request.body.west,
        unitFloor: request.body.unitFloor,
        unitRoom: request.body.unitRoom,
        unitBalcony: request.body.unitBalcony,
        unitTelephone: request.body.unitTelephone,
        unitWC: request.body.unitWC,
        unitFloorCovering: request.body.unitFloorCovering,
        unitKitchen: request.body.unitKitchen,
        unitBuiltUpArea: request.body.unitBuiltUpArea,
        unitOpen: request.body.unitOpen,
        unitMetri: request.body.unitMetri,
        unitTotalAmount: request.body.unitTotalAmount,
        type: request.body.type,
        floorNo: request.body.floorNo,
        unitNo: request.body.unitNo,
        totalUnit: request.body.totalUnit,
        unitComment: request.body.unitComment,
        totalPrice: request.body.totalPrice,
        unitPrice: request.body.unitPrice,
        priceComment: request.body.priceComment,
        pool: request.body.pool,
        sona: request.body.sona,
        jakozi: request.body.jakozi,
        area: request.body.area,
        density: request.body.density,
        front: request.body.front,
        height: request.body.height,
        modify: request.body.modify,
        yard: request.body.yard,
        smallYard: request.body.smallYard,
        underGround: request.body.underGround,
        employeeService: request.body.employeeService,
        patio: request.body.patio,
        residential: request.body.residential,
        empty: request.body.empty,
        rented: request.body.rented,
        age: request.body.age,
        frontKind: request.body.frontKind,
        source: request.body.source,
        publisher: request.body.publisher,
        ownerInHouse: request.body.ownerInHouse,
        documentKind: request.body.documentKind,
        comment: request.body.comment,
        caseKind: request.body.caseKind,
        srm: request.body.srm,
        inHurry: request.body.inHurry,
        equipments: request.body.equipments,
        archive: request.body.archive,
        participation: request.body.participation,
        exchange: request.body.exchange,
        username: request.body.username,
        noOwnerAccess: request.body.noOwnerAccess,
        realStateAccess: request.body.realStateAccess,
        title: request.body.title,
        contactInfoName: request.body.contactInfoName,
        contactInfoEmail: request.body.contactInfoEmail,
        contactInfoTel: request.body.contactInfoTel,
        showOnSite: false
    };
    db.insert(db.COLLECTIONS.ADVERTISING, dataObject).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("ADs did not added");
    });
});

router.post('/edit', upload.single('file'), function(request, response, next) {
    request.body.images = request.file;
    let query = {
        advertisingCode : request.body.advertisingCode ,
    };
    let newValuesObject = {
        images: request.body.images,
        tel: request.body.tel,
        owner:  request.body.owner,
        iranDate: request.body.iranDate,
        date: request.body.date,
        address: request.body.address,
        city: request.body.city,
        province: request.body.province,
        postalCode: request.body.postalCode,
        sale: request.body.sale,
        rent: request.body.rent,
        mortgage: request.body.mortgage,
        apartment: request.body.apartment,
        land: request.body.land,
        vila: request.body.vila,
        building: request.body.building,
        home: request.body.home,
        oldHouse: request.body.oldHouse,
        office: request.body.office,
        store: request.body.store,
        suit: request.body.suit,
        north: request.body.north,
        south: request.body.south,
        east: request.body.east,
        west: request.body.west,
        unitFloor: request.body.unitFloor,
        unitRoom: request.body.unitRoom,
        unitBalcony: request.body.unitBalcony,
        unitTelephone: request.body.unitTelephone,
        unitWC: request.body.unitWC,
        unitFloorCovering: request.body.unitFloorCovering,
        unitKitchen: request.body.unitKitchen,
        unitBuiltUpArea: request.body.unitBuiltUpArea,
        unitOpen: request.body.unitOpen,
        unitTotalAmount: request.body.unitTotalAmount,
        unitMetri: request.body.unitMetri,
        type: request.body.type,
        floorNo: request.body.floorNo,
        unitNo: request.body.unitNo,
        totalUnit: request.body.totalUnit,
        unitComment: request.body.unitComment,
        totalPrice: request.body.totalPrice,
        unitPrice: request.body.unitPrice,
        priceComment: request.body.priceComment,
        pool: request.body.pool,
        sona: request.body.sona,
        jakozi: request.body.jakozi,
        area: request.body.area,
        density: request.body.density,
        front: request.body.front,
        height: request.body.height,
        modify: request.body.modify,
        yard: request.body.yard,
        smallYard: request.body.smallYard,
        underGround: request.body.underGround,
        employeeService: request.body.employeeService,
        patio: request.body.patio,
        residential: request.body.residential,
        empty: request.body.empty,
        rented: request.body.rented,
        age: request.body.age,
        frontKind: request.body.frontKind,
        source: request.body.source,
        publisher: request.body.publisher,
        ownerInHouse: request.body.ownerInHouse,
        documentKind: request.body.documentKind,
        comment: request.body.comment,
        caseKind: request.body.caseKind,
        srm: request.body.srm,
        inHurry: request.body.inHurry,
        equipments: request.body.equipments,
        archive: request.body.archive,
        participation: request.body.participation,
        exchange: request.body.exchange,
        username: request.body.username,
        noOwnerAccess: request.body.noOwnerAccess,
        realStateAccess: request.body.realStateAccess,
        title: request.body.title,
        contactInfoName: request.body.contactInfoName,
        contactInfoEmail: request.body.contactInfoEmail,
        contactInfoTel: request.body.contactInfoTel,
    };
    Object.keys(newValuesObject).forEach(key => newValuesObject[key] === undefined && delete newValuesObject[key]);
    let newValues = {
        $set: newValuesObject
    };
    db.update(db.COLLECTIONS.ADVERTISING, query , newValues).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("ADs not found");
    });
});

router.post('/delete', function(request, response, next) {

    let query = {
        advertisingCode : !_.isEmpty(request.body) ? {$in: request.body} : undefined,
    };
    db.deleteFunction(db.COLLECTIONS.ADVERTISING, query).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("ADs not found");
    });
});

module.exports = router;
