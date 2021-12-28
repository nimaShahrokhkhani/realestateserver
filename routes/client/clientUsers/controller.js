var express = require('express');
var router = express.Router();
var db = require('../../../helper/db');
var multer = require('multer');
var path = require('path');
var mime = require('mime');
var fs = require('fs');
var _ = require('underscore');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
var upload = multer({storage: storage});

router.get('/download', function (req, res) {

    var file = './uploads/' + req.query.fileName;

    var filename = path.basename(file);
    var mimetype = mime.lookup(file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
});

router.get('/list', function (request, response, next) {
    let filterData = {
        username: request.query.username,
        password: request.query.password,
        email: request.query.email,
        block: request.query.block,
        telephone: request.query.telephone,
        aboutMe: request.query.aboutMe,


    };
    Object.keys(filterData).forEach(key => filterData[key] === undefined && delete filterData[key]);
    db.find(db.COLLECTIONS.CLIENT_USERS, filterData, request.query.offset, request.query.length).then((users) => {
        response.status(200).json(users);
    }).catch(() => {
        response.status(409).send("Username not found");
    });
})

router.post('/insert', function (request, response, next) {
    let dataObject = {
        username: request.body.username,
        password: request.body.password,
        email: request.body.email,
        block: request.body.block,
        telephone: request.body.telephone,
        aboutMe: request.body.aboutMe,
    };

    var filterData = {
        username: request.body.username
    };

    db.find(db.COLLECTIONS.CLIENT_USERS, filterData).then((users) => {
        if (_.isEmpty(users)) {
            db.insert(db.COLLECTIONS.CLIENT_USERS, dataObject).then((res) => {
                response.status(200).json(res);
            }).catch((error) => {
                response.status(409).send("User did not added");
            });
        } else {
            response.status(409).send("User did not added");
        }
    }).catch(() => {
        db.insert(db.COLLECTIONS.CLIENT_USERS, dataObject).then((res) => {
            response.status(200).json(res);
        }).catch(() => {
            response.status(409).send("User did not added");
        });
    });
});

router.post('/chnagePassword', function (request, response, next) {
    let username = request.body.username;
    let currentPassword = request.body.currentPassword;
    let newPassword = request.body.newPassword;
    db.find(db.COLLECTIONS.CLIENT_USERS,{username: username, password: currentPassword}).then((users) => {
        if (users.length !== 0) {
            let query = {
                username: username
            };
            let newValuesObject = {
                password: newPassword,
            };
            Object.keys(newValuesObject).forEach(key => newValuesObject[key] === undefined && delete newValuesObject[key]);
            let newValues = {
                $set: newValuesObject
            };
            db.update(db.COLLECTIONS.CLIENT_USERS, query, newValues).then((users) => {
                response.status(200).json(users);
            }).catch(() => {
                response.status(409).send("Username not found");
            });
        } else {
            response.status(409).send("Username not found");
        }
    }).catch(() => {
        response.status(409).send();
    });
});

router.post('/edit', upload.single('file'), function (request, response, next) {
    request.body.image = request.file ? request.file.filename : undefined;
    let query = {
        username: request.body.username
    };
    let newValuesObject = {
        image: request.body.image,
        name: request.body.name,
        email: request.body.email,
        block: request.body.block,
        telephone: request.body.telephone,
        aboutMe: request.body.aboutMe,
    };
    Object.keys(newValuesObject).forEach(key => newValuesObject[key] === undefined && delete newValuesObject[key]);
    let newValues = {
        $set: newValuesObject
    };
    db.update(db.COLLECTIONS.CLIENT_USERS, query, newValues).then((users) => {
        response.status(200).json(users);
    }).catch(() => {
        response.status(409).send("Username not found");
    });
});

router.post('/delete', function (request, response, next) {
    let query = {
        username: request.body.username
    };
    db.deleteFunction(db.COLLECTIONS.CLIENT_USERS, query).then((users) => {
        response.status(200).json(users);
    }).catch(() => {
        response.status(409).send("Username not found");
    });
});

module.exports = router;
