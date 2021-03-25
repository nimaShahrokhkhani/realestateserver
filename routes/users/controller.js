var express = require('express');
var router = express.Router();
var db = require('../../helper/db');
var multer = require('multer');
var path = require('path');
var mime = require('mime');
var fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/uploads/'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
var upload = multer({storage: storage});

router.get('/list', function (request, response, next) {
    let filterData = {
        username: request.query.username,
        nameandsurename: request.query.nameandsurename,
        userrole: request.query.userrole,
        password: request.query.password,
        shenasname: request.query.shenasname,
        nationalid: request.query.nationalid,
        birthdate: request.query.birthdate,
        birthplace: request.query.birthplace,
        address: request.query.address,
        tel: request.query.tel,
        recruiteddate: request.query.recruiteddate,
        profession: request.query.profession,
        minimumsalary: request.query.minimumsalary,
        comment: request.query.comment,
        pricefrom: request.query.pricefrom,
        priceto :request.query.priceto,
        pricefrommeter :request.query.pricefrommeter,
        pricetometer :request.query.pricetometer,

    };
    Object.keys(filterData).forEach(key => filterData[key] === undefined && delete filterData[key]);
    db.find(db.COLLECTIONS.USERS, filterData).then((users) => {
        response.status(200).json(users);
    }).catch(() => {
        response.status(409).send("Username not found");
    });
});

router.get('/download', function (req, res) {

    var file = __dirname + '/uploads/' + req.query.fileName;

    var filename = path.basename(file);
    var mimetype = mime.lookup(file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
});

router.post('/insert', upload.single('file'), function (request, response, next) {
    let dataObject = {
        username: request.query.username,
        nameandsurename: request.query.nameandsurename,
        userrole: request.query.userrole,
        password: request.query.password,
        shenasname: request.query.shenasname,
        nationalid: request.query.nationalid,
        birthdate: request.query.birthdate,
        birthplace: request.query.birthplace,
        address: request.query.address,
        tel: request.query.tel,
        recruiteddate: request.query.recruiteddate,
        profession: request.query.profession,
        minimumsalary: request.query.minimumsalary,
        comment: request.query.comment,
        pricefrom: request.query.pricefrom,
        priceto :request.query.priceto,
        pricefrommeter :request.query.pricefrommeter,
        pricetometer :request.query.pricetometer,
    };
    db.insert(db.COLLECTIONS.USERS, dataObject).then((res) => {
        response.status(200).json(res);
    }).catch(() => {
        response.status(409).send("User did not added");
    });
});

router.post('/edit', upload.single('file'), function (request, response, next) {
    let query = {
        username: request.body.username
    };
    let newValuesObject = {
        username: request.query.username,
        nameandsurename: request.query.nameandsurename,
        userrole: request.query.userrole,
        password: request.query.password,
        shenasname: request.query.shenasname,
        nationalid: request.query.nationalid,
        birthdate: request.query.birthdate,
        birthplace: request.query.birthplace,
        address: request.query.address,
        tel: request.query.tel,
        recruiteddate: request.query.recruiteddate,
        profession: request.query.profession,
        minimumsalary: request.query.minimumsalary,
        comment: request.query.comment,
        pricefrom: request.query.pricefrom,
        priceto :request.query.priceto,
        pricefrommeter :request.query.pricefrommeter,
        pricetometer :request.query.pricetometer,
    };
    Object.keys(newValuesObject).forEach(key => newValuesObject[key] === undefined && delete newValuesObject[key]);
    let newValues = {
        $set: newValuesObject
    };
    db.update(db.COLLECTIONS.USERS, query, newValues).then((users) => {
        response.status(200).json(users);
    }).catch(() => {
        response.status(409).send("Username not found");
    });
});

router.post('/delete', function (request, response, next) {
    let query = {
        username: request.body.username
    };
    db.deleteFunction(db.COLLECTIONS.USERS, query).then((users) => {
        response.status(200).json(users);
    }).catch(() => {
        response.status(409).send("Username not found");
    });
});

module.exports = router;
