var express = require('express');
var router = express.Router();
var db = require('../../helper/db');
//encryption
const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});

router.get('/list', function(request, response, next) {
    let filterData = {
        Id: request.query.Id,
        tel1: request.query.tel1,
        tel2: request.query.tel2,
        tel3: request.query.tel3,
        tel4: request.query.tel4,
        tel5: request.query.tel5,
        owner: request.query.owner,
        iranDate: request.query.iranDate,
        date: request.query.date,
        address: request.query.address,
        regionCode: request.query.regionCode,
        regionName: request.query.regionName,
        sale: request.query.sale,
        rent: request.query.rent,
        mortgage: request.query.mortgage,
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
        floorNo: request.query.floorNo,
        unitNo: request.query.unitNo,
        unitComment: request.query.unitComment,
        totalPrice: request.query.totalPrice,
        unitPrice: request.query.unitPrice,
        priceComment: request.query.priceComment,
        pool: request.query.pool,
        sona: request.query.sona,
        jakozi: request.query.jakozi,
        area: request.query.area,
        density: request.query.density,
        front: request.query.front,
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
        age: request.query.age,
        frontKind: request.query.frontKind,
        source: request.query.source,
        publisher: request.query.publisher,
        ownerInHouse: request.query.ownerInHouse,
        documentKind: request.query.documentKind,
        comment: request.query.comment,
        caseKind: request.query.caseKind,
        srm: request.query.srm,
        inHurry: request.query.inHurry,
        equipments: request.query.equipments,
        archive: request.query.archive,
        participation: request.query.participation,
        exchange: request.query.exchange,
        username: request.query.username,
        noOwnerAccess: request.query.noOwnerAccess,
    };

  //  const decrypted =key.decrypt(filterData,'utf8');
    // console.log('decrypted: ', decrypted);

    Object.keys(filterData).forEach(key => filterData[key] === undefined && delete filterData[key]);
    db.find(db.COLLECTIONS.FILES, {}).then((files) => {
        for (let file of files) {
            console.log(file);
            file.tel1 = (file.tel1 === null || file.tel1 === undefined) ? file.tel1 : key.decrypt(file.tel1, 'utf8')  ;
            file.tel2 = (file.tel2 === null || file.tel2 === undefined) ? file.tel2 :key.decrypt(file.tel2, 'utf8')   ;           ;
            file.tel3 = (file.tel3 === null || file.tel3 === undefined) ? file.tel3 :key.decrypt(file.tel3, 'utf8')  ;
            file.tel4 = (file.tel4 === null || file.tel4 === undefined) ? file.tel4 : key.decrypt(file.tel4, 'utf8') ;
            file.tel5 = (file.tel5 === null || file.tel5 === undefined) ? file.tel5 :key.decrypt(file.tel5, 'utf8')   ;
            file.owner = (file.owner === null || file.owner === undefined) ? file.owner :key.decrypt(file.owner, 'utf8') ;
        }
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("file not found");
    });
});


router.post('/insert', function(request, response, next) {
    let dataObject = {
        Id: request.body.Id,
        tel1: key.encrypt(request.body.tel1, 'base64'),
        tel2: key.encrypt(request.body.tel2, 'base64'),
        tel3: key.encrypt(request.body.tel3, 'base64'),
        tel4: key.encrypt(request.body.tel4, 'base64'),
        tel5: key.encrypt(request.body.tel5, 'base64'),
        owner: key.encrypt(request.body.owner, 'base64'),
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

  //const encrypted = key.encrypt(dataObject, 'base64');
   // console.log('encrypted: ', encrypted);

    db.insert(db.COLLECTIONS.FILES, dataObject).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("File did not added");
    });
});

router.post('/edit', function(request, response, next) {
    let query = {
        Id: request.body.Id,
    };
    let newValues = {
        tel1: request.body.tel1,
        tel2: request.body.tel2,
        tel3: request.body.tel3,
        tel4: request.body.tel4,
        tel5: request.body.tel5,
        owner: request.body.owner,
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
    db.update(db.COLLECTIONS.FILES, query, newValues).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("File not found");
    });
});

router.post('/delete', function(request, response, next) {
    let query = {
        Id: request.body.Id,
    };
    db.deleteFunction(db.COLLECTIONS.FILES, query).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("File not found");
    });
});

module.exports = router;
