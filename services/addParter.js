/**
 * @Created by Administrator
 * @Date 2016/1/22.
 * @author [haixiangtang@creditease.cn]
 */
var log = require("./log.js");

var Parter = require("../models/parter.js");

module.exports = function(sql){

    return Parter.sync({logging: false}).then(function () {

        return Parter.bulkCreate(sql);

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