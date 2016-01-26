/**
 * @Created by Administrator
 * @Date 2016/1/22.
 * @author [haixiangtang@creditease.cn]
 */
var Sequelize = require("sequelize");
var settings = require("../config/db.js");

var log = require("../services/log.js");

var sequelize = new Sequelize(settings.db, settings.user, settings.password, {host : settings.host, port : settings.port, dialect : 'mysql', logging: function (str) {
    log.info(str+"<!log>");
}});

var Parter = sequelize.define('Parter', {
    ID: {
        type: Sequelize.INTEGER(100),
        allowNull: true,
        autoIncrement : true,
        primaryKey : true,
        comment: '主键'
    },
    TASK_ID: {
        type: Sequelize.STRING(200),
        allowNull: false,
        defaultValue: "",
        comment: '用户ID/关联task表'
    },
    USERID: {
        type: Sequelize.STRING(350),
        allowNull: true,
        defaultValue: null,
        comment: '参与开发人员的ID'
    },
    EMAIL: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: '邮箱'
    },
    MOBILE: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: '手机'
    },
    USERNAME: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: '用户'
    },
    NICKNAME: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: "",
        comment: '参与开发人员中文名'
    },
    USERROLE: {
        type: Sequelize.STRING(150),
        allowNull: true,
        defaultValue: null,
        comment: '用户角色'
    },
    GROUP: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: '用户组'
    },
    GROUP_STR: {
        type: Sequelize.STRING(250),
        allowNull: true,
        defaultValue: null,
        comment: '用户组名称'
    },
    START_DATE: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: null,
        comment: '该组，需要开发的周期时间|规定的起始日期'
    },
    END_DATE: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: null,
        comment: '该组，需要开发的周期时间|规定的截至日期'
    },
    NEED_DAYS: {
        type: Sequelize.INTEGER(100),
        allowNull: true,
        defaultValue: null,
        comment: '该组，需要开发的周期时间，时间总天数'
    },
    TYPE: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        defaultValue: 0,
        comment: '区分参与组合成员的字段，0表示这条该需求需要这个组的支持、1表示这条信息的用户是参与该需求的实际人员'
    },
    CREATEDAT: {
        type: Sequelize.DATE
    },
    UPDATEAT: {
        type: Sequelize.DATE
    }
}, {
    createdAt: 'CREATEDAT',
    updatedAt: 'UPDATEAT',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

module.exports = Parter;