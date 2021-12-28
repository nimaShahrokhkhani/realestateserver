var _ = require('underscore');
var express = require('express');
var router = express.Router();
const sessionManager = require('../../../helper/sessionManager');
var db = require('../../../helper/db');
const fs = require('fs');
//encryption
const NodeRSA = require('node-rsa');
var key = new NodeRSA({b: 512});
const loadKey = () => {
    try {
        return fs.readFileSync('./key.json', 'utf8')
    } catch (err) {
        return false
    }
};
if (loadKey()) {
    key.importKey(loadKey());
} else {
    try {
        key.setOptions({encryptionScheme: 'pkcs1'});
        fs.writeFileSync('./key.json', key.exportKey())
    } catch (err) {
        console.error(err)
    }
}


router.get('/totalCount', function (request, response, next) {
    db.getCountOfDocumentV2(db.COLLECTIONS.FILES, {}).then((files) => {
        response.status(200).json(files + 1);
    }).catch(() => {
        response.status(409).send("file not found");
    });
});

router.get('/list', function (request, response, next) {
    let filterData = {
        Id: request.query.Id,
        tel1: request.query.tel1,
        tel2: request.query.tel2,
        tel3: request.query.tel3,
        tel4: request.query.tel4,
        tel5: request.query.tel5,
        owner: request.query.owner,
        iranDate: request.query.iranDate,
        date: {
            $gte: parseInt(request.query.fromDate),//greater than or equal query
            $lte: parseInt(request.query.toDate),
        },
        updateDate: {
            $gte: parseInt(request.query.fromUpdateDate),//greater than or equal query
            $lte: parseInt(request.query.toUpdateDate),
        },
        address: !_.isEmpty(request.query.address) ? {$in: request.query.address} : undefined,
        regionCode: !_.isEmpty(request.query.regionCode) ? {$in: request.query.regionCode} : undefined,//contain query
        regionName: !_.isEmpty(request.query.regionName) ? {$in: request.query.regionName} : undefined,
        sale: !_.isEmpty(request.query.sale) ? {$in: request.query.sale} : undefined,
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
        unitParking: request.query.unitParking,
        unitAnbari: request.query.unitAnbari,
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
        isDeleted: request.query.isDeleted,
        isSold: request.query.isSold,
        isRented: request.query.isRented,
        isDontCall: request.query.isDontCall,
    };

    //  const decrypted =key.decrypt(filterData,'utf8');
    // console.log('decrypted: ', decrypted);
    Object.keys(filterData).forEach(key => !_.isEmpty(filterData[key]) && Number.isNaN(filterData[key].$gte) && delete filterData[key].$gte);
    Object.keys(filterData).forEach(key => !_.isEmpty(filterData[key]) && Number.isNaN(filterData[key].$lte) && delete filterData[key].$lte);
    Object.keys(filterData).forEach(key => _.isEmpty(filterData[key]) && delete filterData[key]);
    Object.keys(filterData).forEach(key => filterData[key] === 'true' && (filterData[key] = true));
    Object.keys(filterData).forEach(key => filterData[key] === 'false' && (filterData[key] = false));
    db.find(db.COLLECTIONS.FILES, filterData, request.query.offset, request.query.length).then((files) => {

        sessionManager.getSession(request)
            .then((session) => {
                response.status(200).json(files);
            })
            .catch((error) => {
                if (files.totalCount !== 0) {
                    for (let file of files.data) {
                        file.tel1 = '';//(file.tel1 === null || file.tel1 === undefined) ? file.tel1 : key.encrypt(file.tel1, 'base64');
                        file.tel2 = '';//(file.tel2 === null || file.tel2 === undefined) ? file.tel2 : key.encrypt(file.tel2, 'base64');
                        file.tel3 = '';//(file.tel3 === null || file.tel3 === undefined) ? file.tel3 : key.encrypt(file.tel3, 'base64');
                        file.tel4 = '';//(file.tel4 === null || file.tel4 === undefined) ? file.tel4 : key.encrypt(file.tel4, 'base64');
                        file.tel5 = '';//(file.tel5 === null || file.tel5 === undefined) ? file.tel5 : key.encrypt(file.tel5, 'base64');
                        file.address = '';//(file.address === null || file.address === undefined) ? file.address : key.encrypt(file.address, 'base64');
                        file.owner = '';//(file.owner === null || file.owner === undefined) ? file.owner : key.encrypt(file.owner, 'base64');
                    }
                }
                response.status(200).json(files);
            });
    }).catch(() => {
        response.status(409).send("file not found");
    });
});

module.exports = router;
