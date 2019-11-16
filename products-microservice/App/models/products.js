var sequelize = require('../connect.js');
var Sequelize = require('sequelize');
sequelize.sync();

let Products = sequelize.define('Products', {
    productID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoryID: Sequelize.INTEGER,
    productName: Sequelize.STRING,
    productPrice: Sequelize.DOUBLE,
    productStatus: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    productURL: Sequelize.STRING
});

module.exports = Products;