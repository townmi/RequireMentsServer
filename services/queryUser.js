/**
 * @Created by Administrator
 * @Date 2015/12/22.
 * @author [haixiangtang@creditease.cn]
 */
var log = require("./log.js");

var User = require("../models/user.js");

module.exports = function(sql){

    return User.sync({logging: false}).then(function () {
        /*if(user.method === "post") {
            log.info("执行用户信息认证，可以使用用户名、手机号码或者邮箱账号进行认证！");
            if(!!user.username) {
                return User.findAll({where: {USERNAME : user.username, PASSWORD: user.password}});
            } else if(!!user.mobile) {
                return User.findAll({where: {MOBILE : user.mobile, PASSWORD: user.password}});
            } else if (!!user.email) {
                return User.findAll({where: {EMAIL : user.email, PASSWORD: user.password}});
            }
        } else if(user.method === "put") {
            log.info("执行用户查询，可以使用用户名、手机号码或者邮箱账号进行查询！");
            if(!!user.username) {
                return User.findAll({where: {USERNAME : user.username}});
            } else if(!!user.mobile) {
                return User.findAll({where: {MOBILE : user.mobile}});
            } else if (!!user.email) {
                return User.findAll({where: {EMAIL : user.email}});
            }
        }*/

        return User.findAll(sql);
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
