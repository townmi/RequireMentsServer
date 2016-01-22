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
    NICKNAME: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: "",
        comment: '参与开发人员中文名'
    },
    USERID: {
        type: Sequelize.STRING(350),
        allowNull: true,
        defaultValue: null,
        comment: '参与开发人员的ID'
    },
    GROUP: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: "",
        comment: '参与开发人员所属组织'
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