var Sequelize = require('sequelize');
var sequelize = new Sequelize(null, null, null, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './products.sqlite',
    define: {
        timestamps: false
    }
});

module.exports = sequelize;