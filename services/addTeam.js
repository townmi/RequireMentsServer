/**
 * @Created by Administrator
 * @Date 2016/1/27.
 * @author [haixiangtang@creditease.cn]
 */
var log = require("./log.js");

var Team = require("../models/team.js");

module.exports = function(sql){

    return Team.sync({logging: false}).then(function () {

        return Team.bulkCreate(sql);

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