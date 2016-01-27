/**
 * @Created by Administrator
 * @Date 2016/1/27.
 * @author [haixiangtang@creditease.cn]
 */
var Sequelize = require("sequelize");
var settings = require("../config/db.js");

var log = require("../services/log.js");

var sequelize = new Sequelize(settings.db, settings.user, settings.password, {host : settings.host, port : settings.port, dialect : 'mysql', logging: function (str) {
    log.info(str+"<!log>");
}});

var Team = sequelize.define('Team', {
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
    GROUP_ID: {
        type: Sequelize.INTEGER(50),
        allowNull: true,
        defaultValue: null,
        comment: '参与该需求的小组ID'
    },
    GROUP: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: "",
        comment: '参与该需求的小组'
    },
    GROUP_STR: {
        type: Sequelize.STRING(150),
        allowNull: true,
        defaultValue: null,
        comment: '参与该需求的小组中文名称'
    },
    START_DATE: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: null,
        comment: '参与该需求的小组，需要开发的周期时间|规定的起始日期'
    },
    END_DATE: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: null,
        comment: '参与该需求的小组，需要开发的周期时间|规定的截至日期'
    },
    NEED_DAYS: {
        type: Sequelize.INTEGER(100),
        allowNull: true,
        defaultValue: null,
        comment: '参与该需求的小组，需要开发的周期时间，时间总天数'
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

module.exports = Team;