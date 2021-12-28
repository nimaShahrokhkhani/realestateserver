var express = require('express');
var router = express.Router();
var db = require('../../../helper/db');


router.get('/list', function (request, response, next) {
    let filterData = {
        configId:0,
        apartment:request.query.apartment,
        land:request.query.land,
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
        comment: request.query.comment,
        floor: request.query.floor,
    };

    Object.keys(filterData).forEach(key => filterData[key] === undefined && delete filterData[key]);
    db.find(db.COLLECTIONS.CONFIGS, filterData).then((users) => {
        response.status(200).json(users);
    }).catch(() => {
        response.status(409).send("file not found");
    });
});


module.exports = router;
