var express = require('express');
var router = express.Router();
var db = require('../../helper/db');


router.get('/list', function (request, response, next) {
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
        blackList: request.query.blackList,
    };

    db.find(db.COLLECTIONS.CONFIGS, filterData).then((users) => {
        response.status(200).json(users);
    }).catch(() => {
        response.status(409).send("file not found");
    });
});


module.exports = router;
