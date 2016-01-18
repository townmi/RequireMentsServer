/**
 * @Created by Administrator
 * @Date 2016/1/18.
 * @author [haixiangtang@creditease.cn]
 */
var log = require("./log.js");

var User = require("../models/user.js");

module.exports = function(values, options){

    return User.sync({logging: false}).then(function () {
        return User.update(values, options);
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
