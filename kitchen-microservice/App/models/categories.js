var sequelize = require('../connect.js');
var Sequelize = require('sequelize');
sequelize.sync();

let Categories = sequelize.define('Categories', {
    categoryID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoryName: Sequelize.STRING,
});

module.exports = Categories;