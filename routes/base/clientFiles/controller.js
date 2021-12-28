var _ = require('underscore');
var express = require('express');
var router = express.Router();
var db = require('../../../helper/db');

function isAgencyActive(agency) {
    let date = new Date();
    if (agency.manualPending === 'active' && date.getTime() <= agency.allowGetFileTo) {
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
                };
                db.find(db.COLLECTIONS.FILES, filterData).then((files) => {

                    db.insert(db.COLLECTIONS.REPORT, {agencyName: agency.agencyName, date: (new Date()), fileCount: files.length}).then(() => {
                        response.status(200).json(files);
                    }).catch((error) => {
                        response.status(410).send("Report did not added");
                    });

                }).catch(() => {
                    response.status(500).send("file not found");
                });
            } else {
                response.status(502).send("agency not in range");
            }
        } else {
            response.status(501).send("agency not found");
        }
    }).catch((error) => {
        response.status(409).send("agency not found");
    });
});

router.post('/getMobileClientFileList', function (request, response, next) {

    let filterAgency = {
        agencyCode: request.body.agencyCode,
    };

    db.find(db.COLLECTIONS.AGENCY, filterAgency).then((agencies) => {
        if (!_.isEmpty(agencies) && agencies.length !== 0) {
            let agency = agencies[0];
            if (agency.activeMobileType === 'active' && isTimeInRange(agency, request.body)) {
                let filterData = {
                    date: {
                        $gte: parseInt(request.body.fromDate),
                        $lte: parseInt(request.body.toDate),
                    },
                    regionCode: !_.isEmpty(getRegionCodeList(agency.regionList)) ? {$in: getRegionCodeList(agency.regionList)} : undefined,
                };
                db.find(db.COLLECTIONS.FILES, filterData).then((files) => {

                    db.insert(db.COLLECTIONS.REPORT, {agencyName: agency.agencyName, date: (new Date()), fileCount: files.length}).then(() => {
                        response.status(200).json(files);
                    }).catch((error) => {
                        response.status(410).send("Report did not added");
                    });

                }).catch(() => {
                    response.status(500).send("file not found");
                });
            } else {
                response.status(502).send("agency not in range");
            }
        } else {
            response.status(501).send("agency not found");
        }
    }).catch((error) => {
        response.status(409).send("agency not found");
    });
});

module.exports = router;
