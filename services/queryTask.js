/**
 * @Created by Administrator
 * @Date 2016/1/13.
 * @author [haixiangtang@creditease.cn]
 */
var log = require("./log.js");

var Task = require("../models/task.js");

module.exports = function(){

    return Task.sync({logging: false}).then(function () {

        return Task.findAll({});

    }).then(
        function (data) {
            return data;
        },
        function (err) {
            log.error(err+"<!log>");
            return err;
        }
    );
};