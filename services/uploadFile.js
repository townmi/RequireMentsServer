/**
 * @Created by Administrator
 * @Date 2016/1/20.
 * @author [haixiangtang@creditease.cn]
 */
var fs = require("fs");
var path = require("path");

var formidable = require('formidable');


var encode = require("./encode.js");
var log = require("./log.js");

var config = {}, callbackJson = {success: true, code: 0, msg: ""};
var sql_resource = {};
var form = new formidable.IncomingForm();

form.uploadDir = "./public/upload/";

/**
 * [添加资源]
 * @param iostream [req]
 * @param callback
 */
module.exports = function(iostream, callback) {

    form.parse(iostream, function (err, fields, files){
        log.info("进入文件写服务。");

        var oldPath = files.taskFile.path;

        sql_resource.name = files.taskFile.name.split(".");
        var fileType = "."+sql_resource.name.pop();
        sql_resource.name = sql_resource.name.join("");

        var newPath = form.uploadDir + md5(sql_resource.name) + fileType;
        sql_resource.url = "http://10.106.88.87:3000/" + "upload/" + md5(sql_resource.name) + fileType;

        try {
            log.info("文件上传成功，正在写入......."+"<!log>");
            fs.renameSync(oldPath, newPath);
            log.info("文件上传成功，写入成功！"+"<!log>");

        } catch(err) {
            log.info("文件上传成功，写入失败！"+"<!log>");
            callbackJson.success = false;
            callbackJson.code = 1;
            callbackJson.msg = "文件写入失败，服务器程序报错！";
        }

        if(!callbackJson.success) {
            return callback.apply(this, [callbackJson]);
        }


    });
}

