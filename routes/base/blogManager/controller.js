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

router.post('/uploadImage', upload.single('file'), function (request, response, next) {
    response.status(200).json(request.file.filename);
});

router.post('/insert', function (request, response, next) {
    let dataObject = {
        id: request.body.id,
        title: request.body.title,
        contentImage: request.body.contentImage,
        content: request.body.content,
        summeryContent: request.body.summeryContent,
        dateModify: request.body.dateModify
    };
    db.insert(db.COLLECTIONS.BLOGS, dataObject).then((res) => {
        response.status(200).json(res);
    }).catch(() => {
        response.status(409).send("Blogs did not added");
    });
});

router.post('/edit', function (request, response, next) {
    let query = {
        id: request.body.id
    };
    let newValuesObject = {
        title: request.body.title,
        contentImage: request.body.contentImage,
        summeryContent: request.body.summeryContent,
        dateModify: request.body.dateModify,
        content: request.body.content
    };
    Object.keys(newValuesObject).forEach(key => newValuesObject[key] === undefined && delete newValuesObject[key]);
    let newValues = {
        $set: newValuesObject
    };
    db.update(db.COLLECTIONS.BLOGS, query, newValues).then((blogs) => {
        response.status(200).json(blogs);
    }).catch(() => {
        response.status(409).send("Blogs not found");
    });
});

router.post('/delete', function (request, response, next) {
    let query = {
        id: request.body.id
    };
    db.deleteFunction(db.COLLECTIONS.BLOGS, query).then((blogs) => {
        response.status(200).json(blogs);
    }).catch(() => {
        response.status(409).send("Blogs not found");
    });
});

module.exports = router;
