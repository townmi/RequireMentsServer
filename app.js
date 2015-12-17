/**
 * @Created by Administrator
 * @Date 2015/12/17.
 * @author [haixiangtang@creditease.cn]
 */
'use strict';
var path = require('path');
var http = require('http');

var express = require('express');
var bodyParser = require("body-parser");

var log = require("./services/log.js");

var app = express();

app.disable("x-powered-by");

// set port
app.set('port', process.env.PROT || 3000);

// body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


app.use(express.static(path.join(__dirname, 'public')));

// restfull route
app.use("/", require("./controllers/index.js"));
app.use("/account", require("./controllers/account.js"));

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

http.createServer(app).listen(app.get('port'), function(){
    log.fatal('Express server listening on port:http://localhost:' + app.get('port')+"<!log>");
});

