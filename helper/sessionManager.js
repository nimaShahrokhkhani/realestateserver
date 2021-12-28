'use strict';
const session = require('express-session');
var express = require('express');
var MemoryStore =session.MemoryStore;

function initialize(path) {

    return session({
        secret: 'newsession',
        cookie: {
            path : path,
            httpOnly: true,
            secure: false,
            maxAge: 24*60*60*1000
        },
        store: new MemoryStore(),
        saveUninitialized: true,
        resave: true,
    });
}

async function getSession(request) {
    return new Promise((fulfill, reject) => {
        request.sessionStore.get(request.sessionID, (error, session) => {
            if (!error && session) {
                fulfill(session);
            } else {
                reject("sessionExpire");
            }
        });
    });
}

function regenerate(request) {
    return new Promise((fulfill, reject) => {
        request.session.regenerate((error) => {
            if (!error) {
                fulfill(request.session);
            }
            else {
                reject("generalError");
            }
        });
    });
}

function destroyClient(request, response) {
    return new Promise((fulfill, reject) => {
        request.session = null;
        request.sessionStore.destroy(request.sessionID, (error) => {
            if (!error) {
                response.clearCookie('connect.sid', {path: '/client'});
                fulfill();
            } else {
                reject("generalError");
            }
        });
    });
}

function destroyBase(request, response) {
    return new Promise((fulfill, reject) => {
        request.session = null;
        request.sessionStore.destroy(request.sessionID, (error) => {
            if (!error) {
                response.clearCookie('connect.sid', {path: '/base'});
                fulfill();
            } else {
                reject("generalError");
            }
        });
    });
}

module.exports = {initialize, getSession, regenerate, destroyClient, destroyBase};
