/**
 * @Created by Administrator
 * @Date 2016/1/20.
 * @author [haixiangtang@creditease.cn]
 */
var log = require("./log.js");

var Task = require("../models/task.js");

module.exports = function(values, options){

    return Task.sync({logging: false}).then(function () {
        return Task.update(values, options);
    }).then(
        function (data) {
            return data;
        },
        function (err) {
            log.error(err+"<!log>");
            return null;
        }
    );
};