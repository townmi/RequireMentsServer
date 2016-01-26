/**
 * @Created by Administrator
 * @Date 2016/1/13.
 * @author [haixiangtang@creditease.cn]
 */
var Sequelize = require("sequelize");
var settings = require("../config/db.js");

var log = require("../services/log.js");

var sequelize = new Sequelize(settings.db, settings.user, settings.password, {host : settings.host, port : settings.port, dialect : 'mysql', logging: function (str) {
    log.info(str+"<!log>");
}});

var Task = sequelize.define('Task', {
    ID: {
        type: Sequelize.INTEGER(100),
        allowNull: true,
        comment: '主键'
    },
    TASK_ID: {
        type: Sequelize.STRING(200),
        allowNull: false,
        defaultValue: "",
        primaryKey : true,
        comment: '需求编号'
    },
    TASK_STATUS: {
        type: Sequelize.INTEGER(100),
        allowNull: false,
        defaultValue: 0,
        comment: '需求状态'
    },
    CREATOR_ID: {
        type: Sequelize.INTEGER(100),
        allowNull: false,
        defaultValue: 0,
        comment: '需求建立人ID'
    },
    CREATOR_NICKNAME: {
        type: Sequelize.STRING(250),
        allowNull: false,
        defaultValue: "",
        comment: '需求建立人中文名字'
    },
    CREATOR_GROUP: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: "",
        comment: '需求建立人所属组织'
    },
    NAME: {
        type: Sequelize.STRING(300),
        allowNull: true,
        defaultValue: null,
        comment: '需求名称'
    },
    PRIORITY: {
        type: Sequelize.INTEGER(50),
        allowNull: false,
        defaultValue: 0,
        comment: '需求优先级'
    },
    BELONG: {
        type: Sequelize.STRING(250),
        allowNull: true,
        defaultValue: null,
        comment: '归属工程'
    },
    BRIEF: {
        type: Sequelize.STRING(250),
        allowNull: true,
        defaultValue: null,
        comment: '需求简介'
    },
    REVIEW_ID: {
        type: Sequelize.INTEGER(100),
        allowNull: true,
        defaultValue: null,
        comment: '需求审核主管ID'
    },
    REVIEW_NICKNAME: {
        type: Sequelize.STRING(250),
        allowNull: false,
        defaultValue: "",
        comment: '需求审核人中文名字'
    },
    REVIEW_COMMENT: {
        type: Sequelize.STRING(250),
        allowNull: true,
        defaultValue: null,
        comment: '需求审核主管审核意见'
    },
    REVIEW_DATE: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    UPLOAD_DATE: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    POST_DATE: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    LOCK_DATE: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    AUDIT_DATE: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    /*
    NEED_DEV: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        defaultValue: 0,
        comment: '是否需要开发介入'
    },
    NEED_TEST: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        defaultValue: 0,
        comment: '是否需要测试介入'
    },
    NEED_FE: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        defaultValue: 0,
        comment: '是否需要前端开发介入'
    },
    NEED_APP: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        defaultValue: 0,
        comment: '是否需要APP开发介入'
    },
    NEED_UI: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        defaultValue: 0,
        comment: '是否需要设计介入'
    },
    */
    MEET_TIME: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,
        comment: '多方评审时间点'
    },
    MEET_ROOM: {
        type: Sequelize.STRING(250),
        allowNull: false,
        defaultValue: "",
        comment: '多方评审会议室'
    },
    CREATEDAT: {
        type: Sequelize.DATE
    },
    UPDATEAT: {
        type: Sequelize.DATE
    }
}, {
    timestamps: true,
    createdAt: 'CREATEDAT',
    updatedAt: 'UPDATEAT',
    //paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

//File.belongsTo(Task, {as: 'Task', foreignKey: 'TASK_ID'});
//Task.hasMany(File, {as: 'File', foreignKey: 'TASK_ID'});

//File.belongsTo(Task, {as: 'Task', foreignKey: 'TASK_ID'});
//Task.hasMany(File, {as: 'File', foreignKey: 'TASK_ID'});
//
//File.belongsTo(Task);
//Task.hasMany(File, {as: 'File', foreignKey: 'TASK_ID'});

//
// Arts.findAll({limit : 10, order : 'ID asc', include: [{model: Category, as: "Category", attributes: ["NAME"]}]});

module.exports = Task;