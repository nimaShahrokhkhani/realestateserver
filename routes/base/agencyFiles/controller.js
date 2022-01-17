var _ = require('underscore');
var express = require('express');
var router = express.Router();
var db = require('../../../helper/db');

function isAgencyActive(agency) {
    let date = new Date();
    if (agency.activeWebsiteType === 'active' && date.getTime() <= agency.allowGetFileTo) {
        return true;
    } else {
        return false;
    }
}

function isTimeInRange(agency, requestBody) {
    if (!_.isEmpty(requestBody.fromDate) && !_.isEmpty(requestBody.toDate)) {
        if (agency.allowGetFileFrom <= requestBody.fromDate && requestBody.toDate <= agency.allowGetFileTo) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
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

router.get('/file', function (request, response, next) {
    let filterData = {
        Id: request.query.Id,
    };

    db.find(db.COLLECTIONS.FILES, filterData).then((files) => {
        response.status(200).json(files[0]);
    }).catch(() => {
        response.status(409).send("file not found");
    });
});

router.get('/nextFile', function (request, response, next) {
    let filterAgency = {
        agencyCode: request.query.agencyCode
    };

    db.find(db.COLLECTIONS.AGENCY, filterAgency).then((agencies) => {
        let agency = agencies[0];
        let filterData = {
            Number: {$gt: parseInt(request.query.Number)},
            date: {
                $gte: !_.isEmpty(request.query.fromDate) ? parseInt(request.query.fromDate) : agency.allowGetFileFrom,
                $lte: !_.isEmpty(request.query.toDate) ? parseInt(request.query.toDate) : agency.allowGetFileTo,
            },
            regionCode: !_.isEmpty(request.query.regionCode) ? request.query.regionCode :
                (!_.isEmpty(getRegionCodeList(agency.regionList)) ? {$in: getRegionCodeList(agency.regionList)} : undefined),
            regionName: !_.isEmpty(request.query.regionName) ? request.query.regionName :
                !_.isEmpty(getRegionNameList(agency.regionList)) ? {$in: getRegionNameList(agency.regionList)} : undefined,
            sale: !_.isEmpty(request.query.sale) ? request.query.sale : undefined,
            area: {
                $gte: parseInt(request.query.fromArea),
                $lte: parseInt(request.query.toArea),
            },
            totalPrice: {
                $gte: parseInt(request.query.fromTotalPrice),
                $lte: parseInt(request.query.toTotalPrice),
            },
            mortgage: {
                $gte: parseInt(request.query.fromMortgage),
                $lte: parseInt(request.query.toMortgage),
            },
            rent: {
                $gte: parseInt(request.query.fromRent),
                $lte: parseInt(request.query.toRent),
            },
            age: {
                $gte: parseInt(request.query.fromAge),
                $lte: parseInt(request.query.toAge),
            },
            unitRoom: request.query.unitRoom,
            unitKitchen: request.query.unitKitchen,
            frontKind: request.query.frontKind,
            unitNo: {
                $gte: parseInt(request.query.fromUnitNo),
                $lte: parseInt(request.query.toUnitNo),
            },
            documentKind: request.query.documentKind,
            unitFloorCovering: request.query.unitFloorCovering,
            north: request.query.north,
            south: request.query.south,
            east: request.query.east,
            west: request.query.west,
            equipments: !_.isEmpty(request.query.equipments) ? {$in: request.query.equipments} : undefined,
        };
        Object.keys(filterData).forEach(key => !_.isEmpty(filterData[key]) && Number.isNaN(filterData[key].$gte) && delete filterData[key].$gte);
        Object.keys(filterData).forEach(key => !_.isEmpty(filterData[key]) && Number.isNaN(filterData[key].$lte) && delete filterData[key].$lte);
        Object.keys(filterData).forEach(key => _.isEmpty(filterData[key]) && delete filterData[key]);
        Object.keys(filterData).forEach(key => filterData[key] === 'true' && (filterData[key] = true));
        Object.keys(filterData).forEach(key => filterData[key] === 'false' && (filterData[key] = false));

        db.findNextRecord(db.COLLECTIONS.FILES, filterData).then((files) => {
            response.status(200).json(files[0]);
        }).catch(() => {
            response.status(409).send("file not found");
        });
    }).catch((error) => {
        response.status(409).send("agency not found");
    });
});

router.get('/prevFile', function (request, response, next) {
    let filterAgency = {
        agencyCode: request.query.agencyCode
    };

    db.find(db.COLLECTIONS.AGENCY, filterAgency).then((agencies) => {
        let agency = agencies[0];
        let filterData = {
            Number: {$lt: parseInt(request.query.Number)},
            date: {
                $gte: !_.isEmpty(request.query.fromDate) ? parseInt(request.query.fromDate) : agency.allowGetFileFrom,
                $lte: !_.isEmpty(request.query.toDate) ? parseInt(request.query.toDate) : agency.allowGetFileTo,
            },
            regionCode: !_.isEmpty(request.query.regionCode) ? request.query.regionCode :
                (!_.isEmpty(getRegionCodeList(agency.regionList)) ? {$in: getRegionCodeList(agency.regionList)} : undefined),
            regionName: !_.isEmpty(request.query.regionName) ? request.query.regionName :
                !_.isEmpty(getRegionNameList(agency.regionList)) ? {$in: getRegionNameList(agency.regionList)} : undefined,
            sale: !_.isEmpty(request.query.sale) ? request.query.sale : undefined,
            area: {
                $gte: parseInt(request.query.fromArea),
                $lte: parseInt(request.query.toArea),
            },
            totalPrice: {
                $gte: parseInt(request.query.fromTotalPrice),
                $lte: parseInt(request.query.toTotalPrice),
            },
            mortgage: {
                $gte: parseInt(request.query.fromMortgage),
                $lte: parseInt(request.query.toMortgage),
            },
            rent: {
                $gte: parseInt(request.query.fromRent),
                $lte: parseInt(request.query.toRent),
            },
            age: {
                $gte: parseInt(request.query.fromAge),
                $lte: parseInt(request.query.toAge),
            },
            unitRoom: request.query.unitRoom,
            unitKitchen: request.query.unitKitchen,
            frontKind: request.query.frontKind,
            unitNo: {
                $gte: parseInt(request.query.fromUnitNo),
                $lte: parseInt(request.query.toUnitNo),
            },
            documentKind: request.query.documentKind,
            unitFloorCovering: request.query.unitFloorCovering,
            north: request.query.north,
            south: request.query.south,
            east: request.query.east,
            west: request.query.west,
            equipments: !_.isEmpty(request.query.equipments) ? {$in: request.query.equipments} : undefined,
        };
        Object.keys(filterData).forEach(key => !_.isEmpty(filterData[key]) && Number.isNaN(filterData[key].$gte) && delete filterData[key].$gte);
        Object.keys(filterData).forEach(key => !_.isEmpty(filterData[key]) && Number.isNaN(filterData[key].$lte) && delete filterData[key].$lte);
        Object.keys(filterData).forEach(key => _.isEmpty(filterData[key]) && delete filterData[key]);
        Object.keys(filterData).forEach(key => filterData[key] === 'true' && (filterData[key] = true));
        Object.keys(filterData).forEach(key => filterData[key] === 'false' && (filterData[key] = false));

        db.findPrevRecord(db.COLLECTIONS.FILES, filterData).then((files) => {
            response.status(200).json(files[0]);
        }).catch(() => {
            response.status(409).send("file not found");
        });
    }).catch((error) => {
        response.status(409).send("agency not found");
    });
});

router.post('/list', function (request, response, next) {

    let filterAgency = {
        agencyCode: request.body.agencyCode
    };

    db.find(db.COLLECTIONS.AGENCY, filterAgency).then((agencies) => {
        if (!_.isEmpty(agencies) && agencies.length !== 0) {
            let agency = agencies[0];
            if (isAgencyActive(agency) && isTimeInRange(agency, request.body)) {
                let filterData = {
                    date: {
                        $gte: !_.isEmpty(request.body.fromDate) ? parseInt(request.body.fromDate) : agency.allowGetFileFrom,
                        $lte: !_.isEmpty(request.body.toDate) ? parseInt(request.body.toDate) : agency.allowGetFileTo,
                    },
                    regionCode: !_.isEmpty(request.body.regionCode) ? request.body.regionCode :
                        (!_.isEmpty(getRegionCodeList(agency.regionList)) ? {$in: getRegionCodeList(agency.regionList)} : undefined),
                    regionName: !_.isEmpty(request.body.regionName) ? request.body.regionName : undefined,
                    sale: !_.isEmpty(request.body.sale) ? request.body.sale : undefined,
                    area: {
                        $gte: parseInt(request.body.fromArea),
                        $lte: parseInt(request.body.toArea),
                    },
                    totalPrice: {
                        $gte: parseInt(request.body.fromTotalPrice),
                        $lte: parseInt(request.body.toTotalPrice),
                    },
                    mortgage: {
                        $gte: parseInt(request.body.fromMortgage),
                        $lte: parseInt(request.body.toMortgage),
                    },
                    rent: {
                        $gte: parseInt(request.body.fromRent),
                        $lte: parseInt(request.body.toRent),
                    },
                    age: {
                        $gte: parseInt(request.body.fromAge),
                        $lte: parseInt(request.body.toAge),
                    },
                    unitRoom: request.body.unitRoom,
                    unitKitchen: request.body.unitKitchen,
                    frontKind: request.body.frontKind,
                    unitNo: {
                        $gte: parseInt(request.body.fromUnitNo),
                        $lte: parseInt(request.body.toUnitNo),
                    },
                    documentKind: request.body.documentKind,
                    unitFloorCovering: request.body.unitFloorCovering,
                    north: request.body.north,
                    south: request.body.south,
                    east: request.body.east,
                    west: request.body.west,
                    equipments: !_.isEmpty(request.body.equipments) ? {$in: request.body.equipments} : undefined,
                };
                Object.keys(filterData).forEach(key => !_.isEmpty(filterData[key]) && Number.isNaN(filterData[key].$gte) && delete filterData[key].$gte);
                Object.keys(filterData).forEach(key => !_.isEmpty(filterData[key]) && Number.isNaN(filterData[key].$lte) && delete filterData[key].$lte);
                Object.keys(filterData).forEach(key => _.isEmpty(filterData[key]) && delete filterData[key]);
                Object.keys(filterData).forEach(key => filterData[key] === 'true' && (filterData[key] = true));
                Object.keys(filterData).forEach(key => filterData[key] === 'false' && (filterData[key] = false));
                db.findWithSort(db.COLLECTIONS.FILES, filterData, request.body.offset, request.body.length, {'_id': -1}).then((files) => {
                    response.status(200).json(files);
                }).catch((error) => {
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
