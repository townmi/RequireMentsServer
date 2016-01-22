/**
 * @Created by Administrator
 * @Date 2016/1/13.
 * @author [haixiangtang@creditease.cn]
 */
var log = require("./log.js");

var File = require("../models/file.js");
var Parter = require("../models/parter.js");


var Task = require("../models/task.js");

Task.hasMany(File, {constraints: false, foreignKey: 'TASK_ID'});
Task.belongsTo(File, {as: 'File', constraints: false, foreignKey: 'TASK_ID'});

Task.hasMany(Parter, {constraints: false, foreignKey: 'TASK_ID'});
Task.belongsTo(Parter, {as: 'Parter', constraints: false, foreignKey: 'TASK_ID'});

module.exports = function(sql, status){
    if(!!status && status === 1) {
        sql.include[0].model = File;
        sql.include[1].model = Parter;
    } else if(!!status && status === 2) {
        sql.include[0].model = Parter;
    }
    return Task.sync({logging: false}).then(function () {
        return File.sync({logging: false}).then(function (){
            return Parter.sync({logging: false}).then(function (){
                return Task.findAll(sql);
            });
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
