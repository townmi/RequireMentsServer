/**
 * @Created by Administrator
 * @Date 2016/1/20.
 * @author [haixiangtang@creditease.cn]
 */
var Sequelize = require("sequelize");

var log = require("./log.js");

var Task = require("../models/task.js");

module.exports = function(values, options){

    return Task.sync().then(function () {
        return Task.find({});
    }).then(function (instance) {
        //instance.updateAttributes({REVIEW_DATE: new Sequelize.fn('NOW')});
        return Task.update(values, options);
        
    }).then(function (data) {
        return data;
    }).catch(function (err) {
        log.error(err+"<!log>");
        return null;
    });
};