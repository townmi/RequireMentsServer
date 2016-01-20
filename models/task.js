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
        autoIncrement : true,
        primaryKey : true,
        comment: '主键'
    },
    TASK_ID: {
        type: Sequelize.STRING(200),
        allowNull: false,
        defaultValue: "",
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
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
});


// Arts.belongsTo(Category, {as: 'Category', foreignKey: 'CATEGORY'});
// Category.hasMany(Arts, {as: 'Arts', foreignKey: 'CATEGORY'});

//
// Arts.findAll({limit : 10, order : 'ID asc', include: [{model: Category, as: "Category", attributes: ["NAME"]}]});

module.exports = Task;