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
var strEnc = require("../services/strEnc.js");
var qUser = require("../services/queryUser.js");
var aUser = require("../services/addUser.js");


var Validator = {
    username: /^[A-Za-z0-9]+$/,
    mobile: /^1[3,4,5,7,8]{1}[0-9]{9}$/,
    email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    nickname: /^[A-Za-z0-9\u4E00-\u9FA5]+$/
};

module.exports = router;

router.get("/", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    log.info("进入用户查询接口，需要先验证是否登陆，是否是root用户，在提取用户信息");

    var user, jsonpCallback = req.query.callback ? req.query.callback : null;



    if(!!req.body.token) {
        var tokenJson = jwt.verify(req.body.token, "secret");
        var tokenIsJson = typeof(tokenJson) == "object" && Object.prototype.toString.call(tokenJson).toLowerCase() == "[object object]" && !tokenJson.length;
        if( tokenIsJson ) {
            if(tokenJson.username === "root" || tokenJson.group === ""){
                res.send({status: "fail", code: 1, msg: "请求失败，请求数据空"});
            } else {
                res.send({status: "fail", code: 1, msg: "请求失败，请求数据空"});
            }
        } else {
            res.send({status: "fail", code: 1, msg: "请求失败，请求数据空"});
        }
    } else {
        if(jsonpCallback) {
            res.send(jsonpCallback+'('+JSON.stringify({status: "fail", code: 1, msg: "请求失败，请求数据空"})+')');
        } else {
            res.send({status: "fail", code: 1, msg: "请求失败，请求数据空"});
        }
    }

});


router.post("/", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    log.info("进入登陆认证接口，需要先验证是否有登陆信息，在认证");
    /**
     * [认证API]
     * @param {Object} user 用户信息，通过对req.body进行严格的筛选，最后对密码加密。
     * @param {String} status 返回的认证信息的状态，仅有两种状态success和fail。
     * @param {Number} code 返回认证信息的状态编码，0(验证成功) 1(没有请求信息), 2(密码为空), 3(通行证为空), 4(登陆通行证不合法), 5(通行证和密码不匹配)。
     * @param {String} msg 返回认证信息的描述。
     */
    var user = {where: {}};
    if(!req.body) {
        res.send({status: "fail", code: 1, msg: "请求失败，请求数据空"});
        return res.end();
    } else if (!req.body.password) {
        res.send({status: "fail", code: 2, msg: "请求失败，用户密码为空"});
        return res.end();
    } else if (!req.body.tmpname) {
        res.send({status: "fail", code: 3, msg: "请求失败，登陆通行证为空"});
        return res.end();
    } else {
        if (Validator.username.test(req.body.tmpname)) {
            user.where.USERNAME = req.body.tmpname;
        } else if (Validator.mobile.test(req.body.tmpname)) {
            user.where.MOBILE = req.body.tmpname;
        } else if (Validator.email.test(req.body.tmpname)) {
            user.where.EMAIL = req.body.tmpname;
        } else {
            res.send({status: "fail", code: 4, msg: "请求失败，登陆通行证不合法"});
            return res.end();
        }
    }

    user.where.PASSWORD = encode(strEnc.strDec(req.body.password, req.body.tmpname, req.body.tmpname, req.body.tmpname));

    Promise.resolve(qUser(user)).then(function (data) {
        if(!!data && !!data.length) {
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
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    log.info("进入注册接口，需要先验证是否已经注册，在进行注册。");
    /**
     * [注册API，暂时不开放。]
     * @param {Object} user 用户信息，通过对req.body进行严格的筛选，最后对密码加密。
     * @param {String} status 返回的认证信息的状态，仅有两种状态success和fail。
     * @param {Number} code 返回认证信息的状态编码，0(注册成功) 1(没有请求信息), 2(密码为空), 3(通行证为空), 4(登陆通行证不合法), 5(通行证已经注册), 6(通行证注册失败)。
     * @param {String} msg 返回认证信息的描述。
     */
    var user = {where: {}};
    if(!req.body) {
        log.warn("注册失败，请求数据为空");
        res.send({status: "fail", code: 1, msg: "请求失败，没有请求信息"});
        return res.end();
    } else if (!req.body.password) {
        log.warn("注册失败，密码为空");
        res.send({status: "fail", code: 2, msg: "请求失败，密码为空"});
        return res.end();
    } else if (!req.body.tmpname) {
        log.warn("注册失败，通行证为空");
        res.send({status: "fail", code: 3, msg: "请求失败，通行证为空"});
        return res.end();
    } else {
        if(Validator.username.test(req.body.tmpname)){
            user.where.USERNAME = req.body.tmpname;
        } else if(Validator.mobile.test(req.body.tmpname)) {
            user.where.MOBILE = req.body.tmpname;
        } else if(Validator.email.test(req.body.tmpname)) {
            user.where.EMAIL = req.body.tmpname;
        } else {
            log.warn("注册失败，登陆通行证不合法");
            res.send({status: "fail", code: 4, msg: "请求失败，登陆通行证不合法"});
            return res.end();
        }
    }

    Promise.resolve(qUser(user)).then(function (data) {
        if(!!data && !!data.length) {
            log.warn("注册失败，通行证已经注册。");
            res.send({status: "fail", code: 5, msg: "请求失败，通行证已经注册，请登陆!"});
            return res.end();
        } else {
            user.where.PASSWORD = encode(req.body.password);
            return Promise.resolve(aUser(user.where));
        }
    }).then(function (data) {
        if(!!data){
            log.info("注册成功");
            res.send({status: "success", code: 0, msg: "通行证注册成功。"});
            return res.end();
        } else {
            log.warn("注册失败，通行证注册失败");
            res.send({status: "fail", code: 6, msg: "通行证注册失败，请联系系统管理员。"});
            return res.end();
        }
    });

});

router.delete("/", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
});

router.get("/reviewlist", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    log.info("进入审核人员查询接口，需要先验证用户是否登陆。");

    var user = {where: {USERROLE: "leader", GROUP: "PM"}};

    Promise.resolve(qUser(user)).then(function (data) {
        if(!!data && !!data.length) {
            var resData = [];
            for(var i = 0; i < data.length; i++) {
                resData.push({username: data[i].dataValues.USERNAME, userrole: data[i].dataValues.USERROLE, userid: data[i].dataValues.ID, group: data[i].dataValues.GROUP});
            }
            res.send({status: "success", code: 0, data: resData, msg: "请求成功，审核人员明细已返回。"});
        } else {
            return res.send({status: "fail", code: 1, msg: "获取数据失败"});
        }
    });

});