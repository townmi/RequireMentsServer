/**
 * @Created by Administrator
 * @Date 2015/12/22.
 * @author [haixiangtang@creditease.cn]
 */
var crypto = require("crypto");
var Buffer = require("buffer").Buffer;
module.exports = function(data){
    var buf = new Buffer(data);
    var str = buf.toString("binary");
    return crypto.createHash("md5").update(str).digest("hex");
};