/**
 * @Created by Administrator
 * @Date 2015/12/22.
 * @author [haixiangtang@creditease.cn]
 */
var log = require("./log.js");

var User = require("../models/user.js");

module.exports = function(sql){

    return User.sync({logging: false}).then(function () {
        return User.upsert(sql);
    }).then(
        function (data) {
            return User.findAll({where: sql});
        },
        function (err) {
            log.error(err+"<!log>");
            return null;
        }
    );
};
