var MongoClient = require('mongodb').MongoClient;
var url = "gilanfileTest:admin4525@mongodb://localhost:27017";
var dbo = undefined;
//collections

const COLLECTIONS = {
    USERS: 'users',
    CLIENT_USERS: 'clientUsers',
    FILES: 'files',
    CONFIGS: 'configs',
    AGENCY: 'agency',
    REGIONPRICE: 'regionPrice',
    ACCOUNTANT: 'accountant',
    ADVERTISING: 'advertising',
    SERVICES: 'services',
    PAYMENTS: 'payments',
    BLOGS: 'blogs',
    REPORT: 'report',

};

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    dbo = db.db("realstate");
    dbo.addUser('gilanfileTest', 'admin4525', { roles: [ {role: "readWrite", db: "realstate"} ] }, function(err, result) {
        console.log(err, result)
    });
});

function find(collection, query, offset, length) {
    return new Promise((resolve, reject) => {
        if (dbo) {
            dbo.createCollection(collection, function (err, res) {

                if (offset && length) {
                    dbo.collection(collection).aggregate([
                        {
                            "$facet": {
                                "totalData": [
                                    {"$match": query},
                                    {"$skip": parseInt(offset)},
                                    {"$limit": parseInt(length)}
                                ],
                                "totalCount": [
                                    {"$match": query},
                                    {
                                        "$group": {
                                            "_id": null,
                                            "count": {"$sum": 1}
                                        }
                                    }
                                ]
                            }
                        }
                    ]).toArray(function (err, result) {
                        if (err) reject(err);
                        let finalResult = {
                            data: result[0].totalData,
                            totalCount: result[0].totalCount[0] ? result[0].totalCount[0].count : 0
                        };
                        resolve(finalResult);
                    })
                } else {
                    dbo.collection(collection).find(query).toArray(function (err, result) {
                        if (err) reject(err);
                        resolve(result);
                    });
                }

            });
        } else {
            reject();
        }
    });
}

function findWithSort(collection, query, offset, length, sort) {
    return new Promise((resolve, reject) => {
        if (dbo) {
            dbo.createCollection(collection, function (err, res) {

                if (offset && length) {
                    dbo.collection(collection).aggregate([
                        {
                            "$facet": {
                                "totalData": [
                                    {"$sort":  sort},
                                    {"$match": query},
                                    {"$skip": parseInt(offset)},
                                    {"$limit": parseInt(length)}
                                ],
                                "totalCount": [
                                    {"$match": query},
                                    {
                                        "$group": {
                                            "_id": null,
                                            "count": {"$sum": 1}
                                        }
                                    }
                                ]
                            }
                        }
                    ]).sort(sort).toArray(function (err, result) {
                        if (err) reject(err);
                        let finalResult = {
                            data: result[0].totalData,
                            totalCount: result[0].totalCount[0] ? result[0].totalCount[0].count : 0
                        };
                        resolve(finalResult);
                    })
                } else {
                    dbo.collection(collection).find(query).sort(sort).toArray(function (err, result) {
                        if (err) reject(err);
                        resolve(result);
                    });
                }

            });
        } else {
            reject();
        }
    });
}

function findNewest(collection, query) {
    return new Promise((resolve, reject) => {
        if (dbo) {
            dbo.createCollection(collection, function (err, res) {
                dbo.collection(collection).find(query).sort({"dateModify": -1}).limit(3).toArray(function (err, result) {
                    if (err) reject(err);
                    resolve(result);
                });
            });
        } else {
            reject();
        }
    });
}

function findLastRecord(collection, query) {
    return new Promise((resolve, reject) => {
        if (dbo) {
            dbo.createCollection(collection, function (err, res) {
                dbo.collection(collection).find(query).sort({$natural: -1}).limit(1).toArray(function (err, result) {
                    if (err) reject(err);
                    resolve(result);
                });
            });
        } else {
            reject();
        }
    });
}

function findNextRecord(collection, query) {
    return new Promise((resolve, reject) => {
        if (dbo) {
            dbo.createCollection(collection, function (err, res) {
                dbo.collection(collection).find(query).limit(1).toArray(function (err, result) {
                    if (err) reject(err);
                    resolve(result);
                });
            });
        } else {
            reject();
        }
    });
}

function findPrevRecord(collection, query) {
    return new Promise((resolve, reject) => {
        if (dbo) {
            dbo.createCollection(collection, function (err, res) {
                dbo.collection(collection).find(query).sort({$natural: -1}).limit(1).toArray(function (err, result) {
                    if (err) reject(err);
                    resolve(result);
                });
            });
        } else {
            reject();
        }
    });
}

function insert(collection, dataObject) {
    return new Promise((resolve, reject) => {
        if (dbo) {
            dbo.createCollection(collection, function (err, res) {
                dbo.collection(collection).count({}, function (error, numOfDocs) {
                    if (error) return callback(error);
                    //dataObject._id = numOfDocs;
                    dbo.collection(collection).insertOne(dataObject, function (err, res) {
                        if (err) reject(err);
                        resolve(res);
                    });
                });

            });
        } else {
            reject();
        }
    });
}

function update(collection, updateQuery, newValues) {
    return new Promise((resolve, reject) => {
        if (dbo) {
            dbo.createCollection(collection, function (err, res) {
                dbo.collection(collection).updateOne(updateQuery, newValues, {upsert: true}, function (err, res) {
                    if (err) reject(err);
                    resolve(res);
                });
            });
        } else {
            reject();
        }
    });
}

function deleteFunction(collection, deleteQuery) {
    return new Promise((resolve, reject) => {
        if (dbo) {
            dbo.createCollection(collection, function (err, res) {
                dbo.collection(collection).deleteOne(deleteQuery, function (err, obj) {
                    if (err) reject(err);
                    resolve(res);
                });
            });
        } else {
            reject();
        }
    });
}

function deleteManyFunction(collection, deleteQuery) {
    return new Promise((resolve, reject) => {
        if (dbo) {
            dbo.createCollection(collection, function (err, res) {
                dbo.collection(collection).deleteMany(deleteQuery, function (err, obj) {
                    if (err) reject(err);
                    resolve(res);
                });
            });
        } else {
            reject();
        }
    });
}

function getCountOfDocument(collection, deleteQuery) {
    return new Promise((resolve, reject) => {
        if (dbo) {
            dbo.createCollection(collection, function (err, res) {
                dbo.collection(collection).count({}, function (error, numOfDocs) {
                    if (error) reject(error);
                    resolve(numOfDocs);
                });

            });
        } else {
            reject();
        }
    });
}

function getCountOfDocumentV2(collection, query) {
    return new Promise((resolve, reject) => {
        if (dbo) {
            dbo.createCollection(collection, function (err, res) {

                dbo.collection(collection).aggregate([
                    {
                        "$facet": {
                            "totalCount": [
                                {"$match": query},
                                {
                                    "$group": {
                                        "_id": null,
                                        "count": {"$sum": 1}
                                    }
                                }
                            ]
                        }
                    }
                ]).toArray(function (err, result) {
                    if (err) reject(err);
                    resolve(result[0].totalCount[0] ? result[0].totalCount[0].count : 0);
                })

            });
        } else {
            reject();
        }
    });
}

module.exports = {
    COLLECTIONS,
    find,
    findWithSort,
    findNewest,
    insert,
    update,
    deleteFunction,
    deleteManyFunction,
    getCountOfDocument,
    findLastRecord,
    getCountOfDocumentV2,
    findNextRecord,
    findPrevRecord
};
