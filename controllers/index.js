/**
 * @Created by Administrator
 * @Date 2015/12/17.
 * @author [haixiangtang@creditease.cn]
 */
/**
 * @Created by Administrator
 * @Date 2015/12/17.
 * @author [haixiangtang@creditease.cn]
 */
var router = require('express').Router();
var app = require("express")();
var log = require("../services/log.js");

//var queryArts = require("../services/queryArticles.js");

module.exports = router;


router.get("/", function (req, res, next) {

    res.send({"status": 0, "url": "/", "token": ""});
    res.end();

});

router.post("/", function (req, res, next) {

    res.send({"status": 0, "url": "/", "token": ""});
    res.end();

});

router.put("/", function (req, res, next) {

    res.send({"status": 0, "url": "/", "token": ""});
    res.end();

});

router.delete("/", function (req, res, next) {

    res.send({"status": 0, "url": "/", "token": ""});
    res.end();

});