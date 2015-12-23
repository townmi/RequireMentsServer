/**
 * @Created by Administrator
 * @Date 2015/12/17.
 * @author [haixiangtang@creditease.cn]
 */
var router = require('express').Router();
var Promise = require("bluebird");
var jwt = require('jsonwebtoken');

var log = require("../services/log.js");
var encode = require("../services/encode.js");
var qUser = require("../services/queryUser.js");
var aUser = require("../services/addUser.js");

module.exports = router;


router.get("/", function (req, res, next) {

    if(!req.header.cookie){
        res.send({status: "error", code: 0, msg: "用户未认证"});
    }

    res.end();

});


router.post("/", function (req, res) {
    /**
     * [认证API]
     * @param {Object} user 用户信息，通过对req.body进行严格的筛选，最后对密码加密。
     * @param {String} status 返回的认证信息的状态，仅有两种状态success和fail。
     * @param {Number} code 返回认证信息的状态编码，0(验证成功) 1(失败，没有请求信息), 2(失败，密码不合格), 2(), 3(), 4(), 5()。
     * @param {String} msg 返回认证信息的描述。
     */
    var user;

    log.info("进入登陆认证接口，需要先验证是否有登陆信息，在认证");

    if(!req.body) {
        res.send({status: "fail", code: 1, msg: "请求失败，请求数据空"});
        return res.end();
    } else if (!req.body.password) {
        res.send({status: "fail", code: 2, msg: "请求失败，用户密码为空"});
        return res.end();
    } else if (!!req.body.username) {
        user = {
            username : req.body.username
        }
    } else if (!!req.body.mobile) {
        user = {
            mobile: req.body.mobile
        }
    } else if (!!req.body.email) {
        user = {
            email: req.body.email
        }
    } else {
        res.send({status: "fail", code: 1, msg: "用户已经认证成功，无需再次认证"});
        return res.end();
    }

    user.password = encode(req.body.password);
    user.method = "post";

    Promise.resolve(qUser(user)).then(function (data) {
        if(!!data.length) {
            var token = jwt.sign({
                who: data[0].dataValues.USERNAME,
                group: data[0].dataValues.GROUP
            }, "secret");
            res.send({status: "success", code: 0, msg: "用户认证成功.", token: token});
            return res.end();
        } else {
            res.send({status: "fail", code: 5, msg: "用户认证失败，通行证和密码不匹配."});
            return res.end();
        }
    });

    /*if(!!req.header.cookie) {
        var decoded = jwt.verify(req.header.cookie, 'shhhhh');
        if(decoded.username === user.username) {
            log.info("用户的cookie没有失效，匹配用户的cookie是否是本人。");
            res.send({status: "success", code: 0, msg: "用户已经认证成功，无需再次认证"});
            return res.end();
        } else {
            Promise.resolve(qUser(user)).then(function (data) {
                if(!!data.length) {
                    res.send({status: "success", code: 0, msg: "用户认证成功."});
                    return res.end();
                } else {
                    res.send({status: "success", code: 0, msg: "用户认证成功."});
                    return res.end();
                }
            });
        }
    } else {

    }*/
});

router.put("/", function (req, res) {

    var user, result;

    log.info("进入注册接口，需要先验证是否已经注册，在进行注册。");

    if(!req.body) {
        res.send({status: "fail", code: 1, msg: "请求失败，请求数据空"});
        return res.end();
    } else if (!req.body.password) {
        res.send({status: "fail", code: 2, msg: "请求失败，密码为空"});
        return res.end();
    } else if (!req.body.tmpname) {
        res.send({status: "fail", code: 2, msg: "请求失败，登陆通行证为空"});
        return res.end();
    } else {
        if(/^\d{1,20}$/.test(req.body.tmpname)){
            user = {
                mobile : req.body.tmpname
            }
        } else if(/^$/.test(req.body.tmpname)) {
            user = {
                username : req.body.tmpname
            }
        } else if(/^$/.test(req.body.tmpname)) {
            user = {
                username : req.body.tmpname
            }
        } else {
            res.send({status: "fail", code: 2, msg: "请求失败，登陆通行证不合法"});
            return res.end();
        }
    }
    user.password = encode(req.body.password);
    user.method = "put";

    Promise.resolve(qUser(user)).then(function (data) {
        if(!!data.length) {
            res.send({status: "fail", code: 4, msg: "请求失败，改通行证已经注册，请登陆!"});
            return res.end();
        } else {
            return Promise.resolve(aUser(user));
        }
    }).then(function (data) {
        if(!!data){
            res.send({status: "success", code: 0, msg: "通行证注册成功。"});
            return res.end();
        } else {
            res.send({status: "fail", code: 5, msg: "通行证注册失败，请联系系统管理员。"});
            return res.end();
        }
    });

});