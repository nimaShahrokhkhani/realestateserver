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
        id: request.query.id,
        title: request.query.title,
        contentImage: request.query.contentImage,
        summeryContent: request.query.summeryContent,
        content: request.query.content,
        dateModify: request.query.dateModify,
    };
    Object.keys(filterData).forEach(key => filterData[key] === undefined && delete filterData[key]);
    db.findWithSort(db.COLLECTIONS.BLOGS, filterData, request.query.offset, request.query.length, {'dateModify': -1}).then((blogs) => {
        response.status(200).json(blogs);
    }).catch(() => {
        response.status(409).send("Blogs not found");
    });
});

module.exports = router;
