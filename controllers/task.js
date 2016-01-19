/**
 * @Created by Administrator
 * @Date 2016/1/13.
 * @author [haixiangtang@creditease.cn]
 */
var router = require('express').Router();
var Promise = require("bluebird");
var jwt = require('jsonwebtoken');

var log = require("../services/log.js");
//var encode = require("../services/encode.js");
var qTask = require("../services/queryTask.js");
var qUser = require("../services/queryUser.js");
var aTask = require("../services/addTask.js");

module.exports = router;

router.get("/", function (req, res) {
    log.info("进入需求查询接口");

    var task = {where: {}};
    
    Promise.resolve(qTask()).then(function (data) {
        console.log(data)
    });

});

router.post("/", function (req, res) {
    log.info("进入需求查询接口（与当前用户匹配的需求）");
    var task  = {where: {}};

    Promise.resolve(qTask()).then(function (data) {

    });d
});

router.put("/", function (req, res) {
    log.info("进入需求创建接口");

    var task = {};

    if(!!req.body){

        var tokenJson = jwt.verify(req.body.token, "secret");
        var tokenIsJson = typeof(tokenJson) == "object" && Object.prototype.toString.call(tokenJson).toLowerCase() == "[object object]" && !tokenJson.length;

        if(tokenIsJson) {

            task.NAME = req.body.name;
            task.BRIEF = req.body.brief;
            task.BELONG = req.body.belong;
            task.REVIEWUSER = req.body.reviewUser.userid;

            Promise.resolve(qUser({where: {USERNAME: tokenJson.who}})).then(function (data) {
                if(!!data && !!data.length) {
                    return Promise.resolve(aTask(task));
                } else {
                    log.warn("需求创建失败, TOKEN数据错误，需要重新认证");
                    res.send({status: "fail", code: 3, msg: "需求创建失败，TOKEN数据错误，需要重新认证。"});
                    return res.end();
                }
            }).then(function (data) {
                if(!!data){
                    log.info("需求创建成功");
                    res.send({status: "success", code: 0, msg: "需求创建成功。"});
                    return res.end();
                } else {
                    log.warn("需求创建失败");
                    res.send({status: "fail", code: 4, msg: "需求创建失败，请联系系统管理员。"});
                    return res.end();
                }
            });

        } else {
            log.warn("需求创建失败, TOKEN失效，需要重新认证");
            res.send({status: "fail", code: 2, msg: "需求创建失败，TOKEN失效，需要重新认证。"});
            return res.end();
        }
    } else {
        log.warn("需求创建接口，请求数据为空");
        res.send({status: "fail", code: 1, msg: "请求失败，没有请求信息"});
        return res.end();
    }
});