/**
 * @Created by Administrator
 * @Date 2016/1/21.
 * @author [haixiangtang@creditease.cn]
 */
var log = require("./log.js");

var File = require("../models/file.js");

module.exports = function(sql){

    return File.sync({logging: false}).then(function () {

        return File.upsert(sql);

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
