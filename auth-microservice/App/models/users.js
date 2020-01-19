const jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');

var sequelize = require('../connect.js');
var Sequelize = require('sequelize');
sequelize.sync();

let Users = sequelize.define('Users', {
    userID: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [4, 25]
        }
    },
    firstName: {
        type: Sequelize.STRING,
    },
    surName: {
        type: Sequelize.STRING,
    },
    roleID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false
});

Users.prototype.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this.userID,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
};

Users.prototype.toAuthJSON = function() {
    return {
        id: this.userID,
        token: this.generateJWT(),
        roleID: this.roleID
    };
};

Users.generatePassword = function(password) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
};

Users.validatePassword = function(password, hashed) {
    return bcrypt.compareSync(password, hashed);
};

module.exports = Users;

