/**
 * @Created by Administrator
 * @Date 2016/1/29.
 * @author [haixiangtang@creditease.cn]
 */
var log = require("./log.js");

var Parter = require("../models/Parter.js");

module.exports = function(sql){

    return Parter.sync({logging: false}).then(function () {
        return Parter.findAll(sql);
    }).then(function (data) {
        return data;
    }).catch(function (err) {
        log.error(err+"<!log>");
        return null;
    });
};
