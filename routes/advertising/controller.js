var express = require('express');
var router = express.Router();
var db = require('../../helper/db');

router.get('/list', function(request, response, next) {

    let filterData = {
        advertisingCode: request.query.advertisingCode,
        tel: request.query.tel,
        owner:  request.query.owner,
        owner: request.query.owner,
        iranDate: request.query.iranDate,
        date: {
            $gte: request.query.fromDate,//greater than or equal query
            $lte: request.query.toDate,
        },
        address: !_.isEmpty(request.query.address) ? {$all: request.query.address} : undefined,
        regionCode: !_.isEmpty(request.query.regionCode) ? {$all: request.query.regionCode} : undefined,//contain query
        regionName: !_.isEmpty(request.query.regionName) ? {$all: request.query.regionName} : undefined,
        sale: {
            $gte: request.query.fromSale,
            $lte: request.query.toSale,
        },
        rent: {
            $gte: request.query.fromRent,
            $lte: request.query.toRent,
        },
        mortgage: {
            $gte: request.query.fromMortgage,
            $lte: request.query.toMortgage,
        },
        apartment: request.query.apartment,
        villa: request.query.villa,
        building: request.query.building,
        home: request.query.home,
        oldHouse: request.query.oldHouse,
        office: request.query.office,
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
        type: request.query.type,
        floorNo: {
            $gte: request.query.fromFloorNo,
            $lte: request.query.toFloorNo,
        },
        unitNo: {
            $gte: request.query.fromUnitNo,
            $lte: request.query.toUnitNo,
        },
        unitComment: request.query.unitComment,
        totalPrice: {
            $gte: request.query.fromTotalPrice,
            $lte: request.query.toTotalPrice,
        },
        unitPrice: {
            $gte: request.query.fromUnitPrice,
            $lte: request.query.toUnitPrice,
        },
        priceComment: request.query.priceComment,
        pool: request.query.pool,
        sona: request.query.sona,
        jakozi: request.query.jakozi,
        area: {
            $gte: request.query.fromArea,
            $lte: request.query.toArea,
        },
        density: request.query.density,
        front: {
            $gte: request.query.fromFront,
            $lte: request.query.toFront,
        },
        height: request.query.height,
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
            $gte: request.query.fromAge,
            $lte: request.query.toAge,
        },
        frontKind: request.query.frontKind,
        source: request.query.source,
        publisher: request.query.publisher,
        ownerInHouse: request.query.ownerInHouse,
        documentKind: request.query.documentKind,
        comment: request.query.comment,
        caseKind: request.query.caseKind,
        Number: {
            $gte: request.query.fromNumber,
            $lte: request.query.toNumber,
        },
        inHurry: request.query.inHurry,
        equipments: request.query.equipments,
        archive: request.query.archive,
        participation: request.query.participation,
        exchange: request.query.exchange,
        username: request.query.username,
        noOwnerAccess: request.query.noOwnerAccess,
    };

    Object.keys(filterData).forEach(key => filterData[key] === undefined && delete filterData[key]);
    db.find(db.COLLECTIONS.ADVERTISING, {}).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("ADs not found");
    });
});

router.post('/insert', function(request, response, next) {

    let dataObject = {
        advertisingCode: request.body.advertisingCode,
        tel: request.body.tel,
        owner:  request.body.owner,
        iranDate: request.body.iranDate,
        date: request.body.date,
        address: request.body.address,
        regionCode: request.body.regionCode,
        regionName: request.body.regionName,
        sale: request.body.sale,
        rent: request.body.rent,
        mortgage: request.body.mortgage,
        apartment: request.body.apartment,
        villa: request.body.villa,
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
        type: request.body.type,
        floorNo: request.body.floorNo,
        unitNo: request.body.unitNo,
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

    };
    db.insert(db.COLLECTIONS.ADVERTISING, dataObject).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("ADs did not added");
    });
});

router.post('/edit', function(request, response, next) {
    let query = {
        advertisingCode : request.body.advertisingCode ,
    };
    let newValuesObject = {
        tel: request.body.tel,
        owner:  request.body.owner,
        iranDate: request.body.iranDate,
        date: request.body.date,
        address: request.body.address,
        regionCode: request.body.regionCode,
        regionName: request.body.regionName,
        sale: request.body.sale,
        rent: request.body.rent,
        mortgage: request.body.mortgage,
        apartment: request.body.apartment,
        villa: request.body.villa,
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
        type: request.body.type,
        floorNo: request.body.floorNo,
        unitNo: request.body.unitNo,
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
        advertisingCode : request.body.advertisingCode,
    };
    db.deleteFunction(db.COLLECTIONS.ADVERTISING, query).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("ADs not found");
    });
});

module.exports = router;
