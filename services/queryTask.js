/**
 * @Created by Administrator
 * @Date 2016/1/13.
 * @author [haixiangtang@creditease.cn]
 */
var log = require("./log.js");

var File = require("../models/file.js");
var Task = require("../models/task.js");

Task.hasMany(File, {constraints: false, foreignKey: 'TASK_ID'});
Task.belongsTo(File, {as: 'File', constraints: false, foreignKey: 'TASK_ID'});

module.exports = function(sql){
    if(sql.include) {
        sql.include[0].model = File;
    }
    return Task.sync({logging: false}).then(function () {
        return File.sync({logging: false}).then(function (){
            return Task.findAll(sql);
        });
    }).then(
        function (data) {
            return data;
        },
        function (err) {
            console.error(err);
            log.error(err+"<!log>");
            return err;
        }
    );
};
