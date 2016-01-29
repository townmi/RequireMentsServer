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
        type: Sequelize.INTEGER(100),
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
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: "",
        comment: '参与该需求的小组'
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