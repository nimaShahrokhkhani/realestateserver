var express = require('express');
var router = express.Router();
var db = require('../../helper/db');

const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});

router.get('/list', function(request, response, next) {
    let filterData = {
        configId:0,
        apartment:request.query.apartment ,
        vila: request.query.vila,
        building: request.query.building,
        oldHouse: request.query.oldHouse,
        office: request.query.office,
        equipments: request.query.equipments,
        documentKind: request.query.documentKind,
        source: request.query.source,
        frontKind: request.query.frontKind,
        region: request.query.region,
        regionPrice: request.query.regionPrice,
        type: request.query.type,
        moshakhase: request.query.moshakhase,
        publisher: request.query.publisher,
        pool: request.query.pool,
        sona: request.query.sona,
        jakozi: request.query.jakozi,
        wcService: request.query.wcService,
        kitchenService: request.query.kitchenService,
        parking: request.query.parking,
        warehouse: request.query.warehouse,
        modify: request.query.modify,
        yard: request.query.yard,
        backYard: request.query.backYard,
        employeeService: request.query.employeeService,
        basement: request.query.basement,
        patio: request.query.patio,
        residenceOwner: request.query.residenceOwner,
        telephone: request.query.telephone,
        floorCovering: request.query.floorCovering,
        blackList: request.query.blackList,
    };

    Object.keys(filterData).forEach(key => filterData[key] === undefined && delete filterData[key]);
    db.find(db.COLLECTIONS.CONFIGS, {}).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("file not found");
    });
});

router.post('/insert', function(request, response, next) {
    let dataObject = {
        configId:0,
        apartment:request.body.apartment ,
        vila: request.body.vila,
        building: request.body.building,
        oldHouse: request.body.oldHouse,
        office: request.body.office,
        equipments: request.body.equipments,
        documentKind: request.body.documentKind,
        source: request.body.source,
        frontKind: request.body.frontKind,
        region: request.body.region,
        regionPrice: request.body.regionPrice,
        type: request.body.type,
        moshakhase: request.body.moshakhase,
        publisher: request.body.publisher,
        pool: request.body.pool,
        sona: request.body.sona,
        jakozi: request.body.jakozi,
        wcService: request.body.wcService,
        kitchenService: request.body.kitchenService,
        parking: request.body.parking,
        warehouse: request.body.warehouse,
        modify: request.body.modify,
        yard: request.body.yard,
        backYard: request.body.backYard,
        employeeService: request.body.employeeService,
        basement: request.body.basement,
        patio: request.body.patio,
        residenceOwner: request.body.residenceOwner,
        telephone: request.body.telephone,
        floorCovering: request.body.floorCovering,
        blackList: request.body.blackList,
    };
    db.insert(db.COLLECTIONS.CONFIGS, dataObject).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("File did not added");
    });
});

router.post('/edit', function(request, response, next)
{
    let query = {
        configId:  0,
    };
    let newValuesObject = {
        apartment: request.body.apartment,
        vila: request.body.vila,
        building: request.body.building,
        oldHouse: request.body.oldHouse,
        office: request.body.office,
        equipments: request.body.equipments,
        documentKind: request.body.documentKind,
        source: request.body.source,
        frontKind: request.body.frontKind,
        region: request.body.region,
        regionPrice: request.body.regionPrice,
        type: request.body.type,
        moshakhase: request.body.moshakhase,
        publisher: request.body.publisher,
        pool: request.body.pool,
        sona: request.body.sona,
        jakozi: request.body.jakozi,
        wcService: request.body.wcService,
        kitchenService: request.body.kitchenService,
        parking: request.body.parking,
        warehouse: request.body.warehouse,
        modify: request.body.modify,
        yard: request.body.yard,
        backYard: request.body.backYard,
        employeeService: request.body.employeeService,
        basement: request.body.basement,
        patio: request.body.patio,
        residenceOwner: request.body.residenceOwner,
        telephone: request.body.telephone,
        floorCovering: request.body.floorCovering,
        blackList: request.body.blackList,
    };
    Object.keys(newValuesObject).forEach(key => newValuesObject[key] === undefined && delete newValuesObject[key]);
    let newValues = {
        $set: newValuesObject
    };
    db.update(db.COLLECTIONS.CONFIGS, query , newValues ).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("File not found");
    });
});

router.post('/delete', function(request, response, next) {

    let query = {
        Id: request.body.Id,
    };

    db.deleteFunction(db.COLLECTIONS.CONFIGS, query).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("File not found");
    });
});

module.exports = router;
