var express = require('express');
var router = express.Router();
var db = require('../../helper/db');


router.get('/list', function(request, response, next) {

    let filterData = {
        Id : request.query.Id ,
        region:request.query.region ,
        price: request.query.price,
    };

    Object.keys(filterData).forEach(key => filterData[key] === undefined && delete filterData[key]);
    db.find(db.COLLECTIONS.REGIONPRICE, {}).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("file not found");
    });
});

router.post('/insert', function(request, response, next) {

    let dataObject = {
        region:request.body.region ,
        price: request.body.price,
    };
    db.insert(db.COLLECTIONS.REGIONPRICE, dataObject).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("File did not added");
    });
});

router.post('/edit', function(request, response, next) {
    let query = {
        Id : request.query.Id ,
    };
    let newValues = {
        region:request.body.region ,
        price: request.body.price,
    };
    db.update(db.COLLECTIONS.REGIONPRICE, query , newValues).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("File not found");
    });
});

router.post('/delete', function(request, response, next) {

    let query = {
        Id : request.body.Id ,
    };
    db.deleteFunction(db.COLLECTIONS.REGIONPRICE, query).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("File not found");
    });
});


module.exports = router;
