var sequelize = require('../connect.js');
var Sequelize = require('sequelize');
sequelize.sync();

let Kitchens = sequelize.define('Kitchens', {
    kitchenID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productID: Sequelize.INTEGER,
    productReady: {
            type: Sequelize.INTEGER,
            defaultValue: 1
            validate: {
                        min: 1,
                        max: 3
                    }
            /* 1 - toDo; 2 -forRelease; 3 - received */
        },

    dateOfAdmission: Sequelize.DATETIME,
    dateOfExecution: Sequelize.DATETIME,
    dateOfReceipt: Sequelize.DATETIME,

});

module.exports = Kitchens;