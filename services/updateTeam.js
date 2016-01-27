/**
 * @Created by Administrator
 * @Date 2016/1/27.
 * @author [haixiangtang@creditease.cn]
 */
var log = require("./log.js");

var Team = require("../models/Team.js");

module.exports = function(values, options){

    return Team.sync({logging: false}).then(function () {
        return Team.update(values, options);
    }).then(function (data) {
        return data;
    }).catch(function (err) {
        log.error(err+"<!log>");
        return null;
    });

};