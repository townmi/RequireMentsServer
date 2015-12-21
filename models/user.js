/**
 * @Created by Administrator
 * @Date 2015/12/17.
 * @author [haixiangtang@creditease.cn]
 */
var Sequelize = require("sequelize");
var settings = require("../config/db.js");

var log = require("../services/log.js");

var sequelize = new Sequelize(settings.db, settings.user, settings.password, {host : settings.host, port : settings.port, dialect : 'mysql', logging: function (str) {
    log.info(str+"<!log>");
}});

var User = sequelize.define('User', {
    ID: {
        type: Sequelize.INTEGER(100),
        allowNull: true,
        autoIncrement : true,
        primaryKey : true,
        comment: '主键'
    },
    EMAIL: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: '邮箱',
    },
    USERNAME: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: '用户',
    },
    PASSWORD: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
        comment: '密码',
    },
    NICKNAME: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: '真实姓名',
    },
    GROUP: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null,
        comment: '用户组',
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

module.exports = User;