var express = require('express');
var router = express.Router();

let products = require('../../models/products.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.get('/', function(req, res, next) {
    products.findAll({
        order: Sequelize.col('categoryID')
    }).then(
        result => res.send(result)
    );
});

module.exports = router;
