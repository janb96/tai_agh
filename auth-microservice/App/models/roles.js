var sequelize = require('../connect.js');
var Sequelize = require('sequelize');
sequelize.sync();

let Roles = sequelize.define('Roles', {
    roleID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roleName: Sequelize.STRING,
});

module.exports = Roles;