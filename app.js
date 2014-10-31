'use strict';

var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    routes = require('./routes');

var app = express();
    app.use(methodOverride());
    app.use(bodyParser.urlencoded({ extended: false }));

var env = process.env.NODE_ENV || 'development';

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.get('/v1/timeline', routes.getTimeline);
app.post('/v1/timeline', routes.write);

app.listen(8082);
