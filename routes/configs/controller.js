var express = require('express');
var router = express.Router();
var db = require('../../helper/db');

router.get('/list', function(request, response, next) {
    let filterData = {
        aparteman: request.query.aparteman,
        vila: request.query.vila,
        mosteghelat: request.query.mosteghelat,
        khareji: request.query.khareji,
        kolangi: request.query.kolangi,
        dafterekar: request.query.dafterekar,
        emkanat: request.query.emkanat,
        vaziyatsanad: request.query.vaziyatsanad,
        manbaetelati: request.query.manbaetelati,
        nama: request.query.nama,
        mantaghe: request.query.mantaghe,
        noemelk: request.query.noemelk,
        moshakhase: request.query.moshakhase,
        manba: request.query.manba,
        tanzimkonande: request.query.tanzimkonande,
        code: request.query.code,
    };
    Object.keys(filterData).forEach(key => filterData[key] === undefined && delete filterData[key]);
    db.find(db.COLLECTIONS.FILES, {}).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("file not found");
    });
});

router.post('/insert', function(request, response, next) {
    let dataObject = {
        aparteman: request.query.aparteman,
        vila: request.query.vila,
        mosteghelat: request.query.mosteghelat,
        khareji: request.query.khareji,
        kolangi: request.query.kolangi,
        dafterekar: request.query.dafterekar,
        emkanat: request.query.emkanat,
        vaziyatsanad: request.query.vaziyatsanad,
        manbaetelati: request.query.manbaetelati,
        nama: request.query.nama,
        mantaghe: request.query.mantaghe,
        noemelk: request.query.noemelk,
        moshakhase: request.query.moshakhase,
        manba: request.query.manba,
        tanzimkonande: request.query.tanzimkonande,
        code: request.query.code,
    };
    db.insert(db.COLLECTIONS.FILES, dataObject).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("File did not added");
    });
});

router.post('/edit', function(request, response, next) {
    let query = {
        aparteman: request.query.aparteman,
        vila: request.query.vila,
        mosteghelat: request.query.mosteghelat,
        khareji: request.query.khareji,
        kolangi: request.query.kolangi,
        dafterekar: request.query.dafterekar,
        emkanat: request.query.emkanat,
        vaziyatsanad: request.query.vaziyatsanad,
        manbaetelati: request.query.manbaetelati,
        nama: request.query.nama,
        mantaghe: request.query.mantaghe,
        noemelk: request.query.noemelk,
        moshakhase: request.query.moshakhase,
        manba: request.query.manba,
        tanzimkonande: request.query.tanzimkonande,
        code: request.query.code,
    };
    db.update(db.COLLECTIONS.FILES, query, newValues).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("File not found");
    });
});

router.post('/delete', function(request, response, next) {

    let query = {
        aparteman: request.query.aparteman,
        vila: request.query.vila,
        mosteghelat: request.query.mosteghelat,
        khareji: request.query.khareji,
        kolangi: request.query.kolangi,
        dafterekar: request.query.dafterekar,
        emkanat: request.query.emkanat,
        vaziyatsanad: request.query.vaziyatsanad,
        manbaetelati: request.query.manbaetelati,
        nama: request.query.nama,
        mantaghe: request.query.mantaghe,
        noemelk: request.query.noemelk,
        moshakhase: request.query.moshakhase,
        manba: request.query.manba,
        tanzimkonande: request.query.tanzimkonande,
        code: request.query.code,
    };
    db.deleteFunction(db.COLLECTIONS.FILES, query).then((files) => {
        response.status(200).json(files);
    }).catch(() => {
        response.status(409).send("File not found");
    });
});

module.exports = router;
