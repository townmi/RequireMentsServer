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
    CREATOR: {
        type: Sequelize.STRING(250),
        allowNull: true,
        defaultValue: null,
        comment: '需求建立人',
    },
    NAME: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
        comment: '需求名称',
    },
    CODE: {
        type: Sequelize.STRING(250),
        allowNull: true,
        defaultValue: null,
        comment: '需求编号',
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
    collate: 'utf8_general_ci',
});


// Arts.belongsTo(Category, {as: 'Category', foreignKey: 'CATEGORY'});
// Category.hasMany(Arts, {as: 'Arts', foreignKey: 'CATEGORY'});

//
// Arts.findAll({limit : 10, order : 'ID asc', include: [{model: Category, as: "Category", attributes: ["NAME"]}]});

module.exports = Task;