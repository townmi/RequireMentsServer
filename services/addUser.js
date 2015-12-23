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
            log.info("执行用户查询，可以使用用户名、手机号码或者邮箱账号进行查询！");
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
