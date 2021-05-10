var _ = require('underscore');
var express = require('express');
var router = express.Router();
var db = require('../../helper/db');

function isAgencyActive(agency) {
    let date = new Date();
    if (agency.manualPending === 'active' && date.getTime() <= agency.expirationDate) {
        return true;
    } else {
        return false;
    }
}

function isTimeInRange(agency, requestBody) {
    if (agency.allowGetFileFrom <= requestBody.fromDate && requestBody.toDate <= agency.allowGetFileTo) {
        return true;
    } else {
        return false;
    }
}

function getRegionCodeList(regionList) {
    let regionCodeList = [];
    for (let region of regionList) {
        if (!regionCodeList.includes(region.regionCode)) {
            regionCodeList.push(region.regionCode)
        }
    }
    return regionCodeList;
}

function getRegionNameList(regionList) {
    let regionNameList = [];
    for (let region of regionList) {
        if (!regionNameList.includes(region.regionName)) {
            regionNameList.push(region.regionName)
        }
    }
    return regionNameList;
}

router.post('/getClientFileList', function (request, response, next) {

    let filterAgency = {
        agencyCode: request.body.realStateCode,
        registrationCode: request.body.realStateTemporaryCode,
    };

    db.find(db.COLLECTIONS.AGENCY, filterAgency).then((agencies) => {
        if (!_.isEmpty(agencies) && agencies.length !== 0) {
            let agency = agencies[0];
            if (isAgencyActive(agency) && isTimeInRange(agency, request.body)) {
                let filterData = {
                    date: {
                        $gte: parseInt(request.body.fromDate),
                        $lte: parseInt(request.body.toDate),
                    },
                    regionCode: !_.isEmpty(getRegionCodeList(agency.regionList)) ? {$in: getRegionCodeList(agency.regionList)} : undefined,
                    regionName: !_.isEmpty(getRegionNameList(agency.regionList)) ? {$in: getRegionNameList(agency.regionList)} : undefined,
                };
                db.find(db.COLLECTIONS.FILES, filterData).then((files) => {
                    response.status(200).json(files);
                }).catch(() => {
                    response.status(500).send("file not found");
                });
            } else {
                response.status(500).send("agency not in range");
            }
        }
    }).catch((error) => {
        response.status(409).send("agency not found");
    });
});

module.exports = router;
