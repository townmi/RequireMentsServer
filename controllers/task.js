/**
 * @Created by Administrator
 * @Date 2016/1/13.
 * @author [haixiangtang@creditease.cn]
 */
var router = require('express').Router();
var Promise = require("bluebird");
var jwt = require('jsonwebtoken');

var log = require("../services/log.js");
var encode = require("../services/encode.js");
var qTask = require("../services/queryTask.js");
var aTask = require("../services/addTask.js");


var Validator = {
    username: /^[A-Za-z0-9]+$/,
    mobile: /^1[3,4,5,7,8]{1}[0-9]{9}$/,
    email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    nickname: /^[A-Za-z0-9\u4E00-\u9FA5]+$/
};

module.exports = router;


router.get("/", function (req, res) {

    log.info("进入需求查询接口");

    Promise.resolve(qTask()).then(function (data) {
        console.log(data)
    });

});

router.post("/", function (req, res) {

    log.info("进入需求创建接口");

    var example = {
        name: "乐音满是的",
        creator: "默认"

    };

    Promise.resolve(aTask(example)).then(function (data) {
        console.log(data)
    });

});