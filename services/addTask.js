/**
 * @Created by Administrator
 * @Date 2016/1/13.
 * @author [haixiangtang@creditease.cn]
 */
var log = require("./log.js");

var Task = require("../models/task.js");

module.exports = function(sql){

    return Task.sync({logging: false}).then(function () {
        return Task.upsert(sql, {fields: ['NAME', 'BRIEF', 'BELONG', 'REVIEW_ID', 'REVIEW_NICKNAME', 'PRIORITY', 'TASKSTATUS', 'CREATOR_ID', 'CREATOR_GROUP', 'CREATOR_NICKNAME', 'TASK_ID']});

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
