var express = require('express');
var router = express.Router();
var db = require('../../../helper/db');

router.get('/list', function (request, response, next) {

    let filterData = {};

    Object.keys(filterData).forEach(key => filterData[key] === undefined && delete filterData[key]);
    db.findWithSort(db.COLLECTIONS.AGENCY, filterData, request.query.offset, request.query.length, {'_id': -1}).then((agencies) => {
        let resultArray = [];
        for (let agency of agencies.data) {
            resultArray.push({
                image: agency.image,
                agencyName: agency.agencyName,
                managementName: agency.managementName,
                telephone: agency.telephone
            })
        }
        response.status(200).json(resultArray);
    }).catch((error) => {
        response.status(409).send("agency not found");
    });
});

module.exports = router;
