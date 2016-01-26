/**
 * @Created by Administrator
 * @Date 2016/1/13.
 * @author [haixiangtang@creditease.cn]
 */
var router = require('express').Router();
var Promise = require("bluebird");
var jwt = require('jsonwebtoken');
var Sequelize = require("sequelize");

var log = require("../services/log.js");
var encode = require("../services/encode.js");
var qTask = require("../services/queryTask.js");
var qUser = require("../services/queryUser.js");
var aTask = require("../services/addTask.js");
var uTask = require("../services/updateTask.js");
var uFile = require("../services/uploadFile.js");
var aFile = require("../services/addFile.js");

var aParter = require("../services/addParter.js");
var dParter = require("../services/deleteParter.js");

module.exports = router;

router.get("/", function (req, res) {
    log.info("进入需求查询接口");

    var task = {where: {}};
    
    Promise.resolve(qTask()).then(function (data) {
        console.log(data)
    });

});

router.post("/", function (req, res) {
    log.info("进入需求查询接口（与当前用户匹配的需求）");
    var task  = {where: {}};

    if(!!req.body.token) {
        var tokenJson = jwt.verify(req.body.token, "secret");
        var tokenIsJson = typeof(tokenJson) == "object" && Object.prototype.toString.call(tokenJson).toLowerCase() == "[object object]" && !tokenJson.length;
        if( tokenIsJson ) {
            Promise.resolve(qTask(task)).then(function (data) {
                if(!!data && !!data.length) {
                    var sendData = [];
                    for(var i = 0; i < data.length; i++) {
                        sendData.push({
                            "id": data[i].dataValues.ID,
                            "taskid": data[i].dataValues.TASK_ID,
                            "taskstatus": data[i].dataValues.TASK_STATUS,
                            "creatorid": data[i].dataValues.CREATOR_ID,
                            "creatornickname": data[i].dataValues.CREATOR_NICKNAME,
                            "creatorgroup": data[i].dataValues.CREATOR_GROUP,
                            "name": data[i].dataValues.NAME,
                            "brief": data[i].dataValues.BRIEF,
                            "priority": data[i].dataValues.PRIORITY,
                            "updatetime": data[i].dataValues.UPDATEAT
                        });
                    }
                    res.send({status: "success", code: 0, msg: "获取任务列表成功。", data: sendData});
                    return res.end();
                } else {
                    res.send({status: "fail", code: 3, msg: "获取任务列表失败，请联系系统管理员。"});
                    return res.end();
                }
            });
        } else {
            res.send({status: "fail", code: 2, msg: "获取任务列表失败，TOKEN失效，需要重新认证。"});
            return res.end();
        }
    } else {
        res.send({status: "fail", code: 1, msg: "获取任务列表失败，用户未登录，请先登录。"});
        return res.end();
    }
});

router.put("/", function (req, res) {
    log.info("进入需求创建接口");

    var task = {};

    if(!!req.body){

        var tokenJson = jwt.verify(req.body.token, "secret");
        var tokenIsJson = typeof(tokenJson) == "object" && Object.prototype.toString.call(tokenJson).toLowerCase() == "[object object]" && !tokenJson.length;

        if(tokenIsJson) {

            task.NAME = req.body.name;
            task.BRIEF = req.body.brief;
            task.BELONG = req.body.belong;
            task.REVIEW_ID = req.body.reviewUser.id;
            task.REVIEW_NICKNAME = req.body.reviewUser.nickname;
            task.PRIORITY = req.body.priority;
            task.TASKSTATUS = 0;

            Promise.resolve(qUser({where: {USERNAME: tokenJson.who}})).then(function (data) {
                if(!!data && !!data.length) {
                    task.CREATOR_ID = data[0].dataValues.ID;
                    task.CREATOR_GROUP = data[0].dataValues.GROUP;
                    task.CREATOR_NICKNAME = data[0].dataValues.NICKNAME;
                    task.TASK_ID = encode(req.body.name);
                    return Promise.resolve(aTask(task));
                } else {
                    log.warn("需求创建失败, TOKEN数据错误，需要重新认证");
                    res.send({status: "fail", code: 3, msg: "需求创建失败，TOKEN数据错误，需要重新认证。"});
                    return res.end();
                }
            }).then(function (data) {
                if(!!data){
                    log.info("需求创建成功");
                    res.send({status: "success", code: 0, msg: "需求创建成功。"});
                    return res.end();
                } else {
                    log.warn("需求创建失败");
                    res.send({status: "fail", code: 4, msg: "需求创建失败，请联系系统管理员。"});
                    return res.end();
                }
            });

        } else {
            log.warn("需求创建失败, TOKEN失效，需要重新认证");
            res.send({status: "fail", code: 2, msg: "需求创建失败，TOKEN失效，需要重新认证。"});
            return res.end();
        }
    } else {
        log.warn("需求创建接口，请求数据为空");
        res.send({status: "fail", code: 1, msg: "请求失败，没有请求信息"});
        return res.end();
    }
});



router.post("/info", function (req, res) {
    log.info("进入需求详情查询接口，目前传入任务ID："+req.body.taskid);

    var taskInfo = {
        where: {TASK_ID: req.body.taskid},
        include: [{
            model: null
        },{
            model: null
        }]

    };

    if(!!req.body.token) {
        var tokenJson = jwt.verify(req.body.token, "secret");
        var tokenIsJson = typeof(tokenJson) == "object" && Object.prototype.toString.call(tokenJson).toLowerCase() == "[object object]" && !tokenJson.length;
        if (tokenIsJson) {
            Promise.resolve(qTask(taskInfo, 1)).then(function (data) {
                if(!!data && !!data.length) {
                    var sendData = {};
                    for(var i in data[0].dataValues) {
                        sendData[i.toLowerCase().replace(/\_/g,"")] = data[0].dataValues[i];
                    }
                    for(var i = 0; i < sendData.files.length; i++) {
                        for(var j in sendData.files[i].dataValues) {
                            var name = j.toLowerCase().replace(/\_/g,"");
                            var value = sendData.files[i].dataValues[j];
                            delete sendData.files[i].dataValues[j];
                            sendData.files[i].dataValues[name] = value;
                        }
                    }
                    for(var i = 0; i < sendData.parters.length; i++) {
                        for(var j in sendData.parters[i].dataValues) {
                            var name = j.toLowerCase().replace(/\_/g,"");
                            var value = sendData.parters[i].dataValues[j];
                            delete sendData.parters[i].dataValues[j];
                            sendData.parters[i].dataValues[name] = value;
                        }
                    }
                    sendData.user = tokenJson;
                    res.send({status: "success", code: 0, msg: "获取任务详情成功。", data: sendData});
                    return res.end();
                } else {
                    res.send({status: "fail", code: 3, msg: "获取任务详情失败，请联系系统管理员。"});
                    return res.end();
                }
            });
        } else {
            res.send({status: "fail", code: 1, msg: "获取任务列表失败，用户未登录，请先登录。"});
            return res.end();
        }
    } else {
        res.send({status: "fail", code: 1, msg: "获取任务列表失败，用户未登录，请先登录。"});
        return res.end();
    }


});


router.put("/info", function (req, res) {

    log.info("进入需求更新操作接口，目前传入任务ID："+req.body.taskid);

    var task = {where: {}};

    if(!!req.body.token) {
        var tokenJson = jwt.verify(req.body.token, "secret");
        var tokenIsJson = typeof(tokenJson) == "object" && Object.prototype.toString.call(tokenJson).toLowerCase() == "[object object]" && !tokenJson.length;
        if (tokenIsJson) {

            task.where.TASK_ID = req.body.taskid;
            Promise.resolve(qTask(task)).then(function (data) {
                if(!!data && !!data.length) {
                    if(data[0].dataValues.REVIEW_ID === tokenJson.id) {
                        //需求审核成功
                        if(data[0].dataValues.TASK_STATUS === 0 && req.body.audit === "success") {
                            var newStatus = {
                                REVIEW_COMMENT: req.body.comment,
                                TASK_STATUS: 1,
                                REVIEW_DATE: new Sequelize.fn('NOW')
                            };
                            task.fields = ['REVIEW_COMMENT', 'TASK_STATUS', 'REVIEW_DATE'];
                            return Promise.resolve(uTask(newStatus, task));
                        }
                    } else if(data[0].dataValues.TASK_STATUS === 2) {
                        // 产品经理发起需求人员招募
                        var newStatus = {
                            TASK_STATUS: 2,
                            POST_DATE: new Sequelize.fn('NOW')
                        };
                        if(!req.body.need && !req.body.need.length) {
                            res.send({status: "fail", code: 4, msg: "修改需求失败，确认不选择任何成员么，请联系系统管理员。"});
                            return res.end();
                        }
                        task.fields = ["TASK_STATUS", "POST_DATE"];
                        return Promise.resolve(uTask(newStatus, task)).then(function (data) {
                            if(!!data && !!data.length) {
                                if(!data[0]){
                                    res.send({status: "fail", code: 5, msg: "修改需求失败，请求信息不合法，请重新提交。"});
                                    return res.end();
                                } else {
                                    // 需求状态改变成功，需要对parter进行标记
                                    var user = {where: {USERROLE: "header", $or: [{GROUP: req.body.need}]}};

                                    return Promise.resolve(qUser(user)).then(function (data) {
                                        if(!!data && !!data.length) {
                                            var needParter = [];

                                            for(var i = 0; i < data.length; i++) {
                                                needParter.push({

                                                });
                                            }

                                            return Promise.resolve(aParter(needParter));

                                        } else {
                                            res.send({status: "fail", code: 3, msg: "获取任务详情失败，请联系系统管理员。"});
                                            return res.end();
                                        }
                                    });
                                    //return Promise.resolve();
                                }
                            } else {
                                res.send({status: "fail", code: 4, msg: "修改需求，请联系系统管理员。"});
                                return res.end();
                            }
                        });

                    } else if(data[0].dataValues.TASK_STATUS === 3) {
                        // 需求锁定，需求人员配置完成、大家先下载文档。
                        var newStatus = {
                            TASK_STATUS: 4,
                            LOCK_DATE: new Sequelize.fn('NOW')
                        };
                        task.fields = ['TASK_STATUS', 'LOCK_DATE'];
                        return Promise.resolve(uTask(newStatus, task));
                    } else if(data[0].dataValues.TASK_STATUS === 4) {
                        // 需求进入评审阶段、产品经理发起会议邀请
                        if(!req.body.time || !req.body.room) {
                            res.send({status: "fail", code: 3, msg: "获取任务详情失败，请联系系统管理员。"});
                            return res.end();
                        } else {
                            var newStatus = {
                                TASK_STATUS: 5,
                                MEET_TIME: Number(req.body.time),
                                MEET_ROOM: req.body.room,
                                AUDIT_DATE: new Sequelize.fn('NOW')
                            };
                            task.fields = ['TASK_STATUS', 'MEET_TIME', 'MEET_ROOM', 'AUDIT_DATE'];
                            return Promise.resolve(uTask(newStatus, task)).then(function (res) {
                                
                            });
                        }
                    }
                } else {
                    res.send({status: "fail", code: 3, msg: "获取任务详情失败，请联系系统管理员。"});
                    return res.end();
                }
            }).then(function (data) {
                if(!!data && !!data.length) {
                    if(!data[0]){
                        res.send({status: "fail", code: 5, msg: "修改需求失败，请求信息不合法，请重新提交。"});
                        return res.end();
                    } else {
                        res.send({status: "success", code: 0, msg: "修改需求成功。"});
                        return res.end();
                    }
                } else {
                    res.send({status: "fail", code: 4, msg: "修改需求，请联系系统管理员。"});
                    return res.end();
                }
            });
        } else {
            res.send({status: "fail", code: 2, msg: "获取任务列表失败，用户未登录，请先登录。"});
            return res.end();
        }
    } else {
        res.send({status: "fail", code: 1, msg: "获取任务列表失败，用户未登录，请先登录。"});
        return res.end();
    }

});

router.post("/modify", function (req, res) {
    uFile(req, function (result, sql) {
        console.log(result, sql);
        if(result.success) {
            var task = {where: {TASK_ID: result.taskid}};

            Promise.resolve(aFile(sql)).then(function (data) {
                if(!!data) {
                    var newStatus = {
                        TASK_STATUS: 2,
                        UPLOAD_DATE: new Sequelize.fn('NOW')
                    };
                    task.fields = ['UPLOAD_DATE', 'TASK_STATUS'];
                    return Promise.resolve(uTask(newStatus, task));
                } else {
                    res.send({status: "fail", code: 0, msg: "资料提交失败，请联系系统管理员。"});
                    return res.end();
                }
            }).then(function (data){
                console.log(data);
            });
        }
    });
});


router.post("/user", function (req, res) {
    log.info("进入需求更新操作接口，目前传入任务ID："+req.body.taskid);

    if(!!req.body.token) {
        var tokenJson = jwt.verify(req.body.token, "secret");
        var tokenIsJson = typeof(tokenJson) == "object" && Object.prototype.toString.call(tokenJson).toLowerCase() == "[object object]" && !tokenJson.length;
        if (tokenIsJson) {

            var group = null, taskUser = {};

            Promise.resolve(qUser({where: {ID: tokenJson.id}})).then(function (data) {

                if(!!data && !!data.length) {
                    group = data[0].dataValues.GROUP;
                    taskUser.group = group;
                    return Promise.resolve(qUser({where: {GROUP:group}}));
                } else {

                }
            }).then(function (data) {
                if(!!data && !!data.length) {

                    taskUser.user = [];
                    for(var i = 0; i < data.length; i++) {
                        taskUser.user.push({
                            "userid": data[i].dataValues.ID,
                            "nickname": data[i].dataValues.NICKNAME
                        });
                    }
                    var taskInfo = {
                        where: {TASK_ID: req.body.taskid},
                        include: [{
                            model: null,
                            where: {
                                GROUP: group
                            }
                        }]
                    };

                    return Promise.resolve(qTask(taskInfo, 2));
                } else {

                }
            }).then(function (data) {
                if(!!data) {
                    taskUser.parter = [];
                    if(!data.length) {
                        res.send({status: "success", code: 0, msg: "获取参与人员列表成功", data: taskUser});
                        return res.end();
                    }
                    for(var i = 0; i < data[0].Parters.length; i++) {
                        taskUser.parter.push({
                            "userid": data[0].Parters[i].dataValues.USERID,
                            "nickname": data[0].Parters[i].dataValues.NICKNAME
                        });
                    }
                    res.send({status: "success", code: 0, msg: "获取参与人员列表成功", data: taskUser});
                    return res.end();
                } else {

                }
            });

        } else {
            res.send({status: "fail", code: 2, msg: "获取任务列表失败，l，请先登录。"});
            return res.end();
        }
    } else {
        res.send({status: "fail", code: 1, msg: "获取任务列表失败，用户未登录，请先登录。"});
        return res.end();
    }
});

router.put("/user", function (req, res) {
    log.info("进入需求更新操作接口，目前传入任务ID："+req.body.taskid);

    if(!!req.body.token) {
        var tokenJson = jwt.verify(req.body.token, "secret");
        var tokenIsJson = typeof(tokenJson) == "object" && Object.prototype.toString.call(tokenJson).toLowerCase() == "[object object]" && !tokenJson.length;
        if (tokenIsJson) {
            var oldParter = {
                where: {
                    TASK_ID: req.body.taskid,
                    GROUP: req.body.group
                }
            };
            Promise.resolve(dParter(oldParter)).then(function (data) {

                if(data === null) {

                } else if(!!req.body.parter && !!req.body.parter.length) {
                    var newParter = [];

                    for(var i = 0; i < req.body.parter.length; i++) {
                        newParter.push({
                            TASK_ID: req.body.taskid,
                            USERID: req.body.parter[i].userid,
                            GROUP: req.body.group,
                            NICKNAME: req.body.parter[i].nickname
                        });
                    }
                    console.log(newParter);

                    return Promise.resolve(aParter(newParter));

                } else {

                }
            }).then(function (data) {
                console.log(data);
            });

        } else {
            res.send({status: "fail", code: 2, msg: "获取任务列表失败，l，请先登录。"});
            return res.end();
        }
    } else {
        res.send({status: "fail", code: 1, msg: "获取任务列表失败，用户未登录，请先登录。"});
        return res.end();
    }
});























