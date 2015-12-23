/**
 * @Created by Administrator
 * @Date 2015/12/22.
 * @author [haixiangtang@creditease.cn]
 */
var log = require("./log.js");

var User = require("../models/user.js");

module.exports = function(user){

    return User.sync({logging: false}).then(function () {
        if(user.method === "put") {
            log.info("执行添加用户，根据传入不同的通行证，给不同的字段填值。");
            if(!!user.username) {
                return User.upsert({USERNAME : user.username, PASSWORD: user.password});
            } else if(!!user.mobile) {
                return User.upsert({MOBILE : user.mobile, PASSWORD: user.password});
            } else if (!!user.email) {
                return User.upsert({EMAIL : user.email, PASSWORD: user.password});
            }
        }
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
