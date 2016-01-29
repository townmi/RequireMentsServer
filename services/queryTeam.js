/**
 * @Created by Administrator
 * @Date 2016/1/29.
 * @author [haixiangtang@creditease.cn]
 */
var log = require("./log.js");

var Team = require("../models/Team.js");

module.exports = function(sql){

    return Team.sync({logging: false}).then(function () {
        return Team.findAll(sql);
    }).then(function (data) {
        return data;
    }).catch(function (err) {
        log.error(err+"<!log>");
        return null;
    });
};