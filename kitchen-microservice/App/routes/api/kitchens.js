var express = require('express');
var router = express.Router();

let kitchens = require('../../models/kitchens.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post('/kitchen', (req, res, next) => {
    const productID = req.body.productID;

    const kitchen = {
        productID: productID,
        productReady: 1,
    };

    kitchens.create(kitchen).then(
        result => res.send(result)
    );

});

router.get('/kitchen', function(req, res, next) {
    kitchens.findAll({
        order: Sequelize.col('kitchenID')
    }).then(
        result => res.send(result)
    );
});

router.get('/kitchen/toDo', function(req, res, next) {
    kitchens.findAll({
            where: {
                productReady: 1
            }
        }).then(
            result => res.send(result)
        );
});

router.get('/kitchen/forRelease', function(req, res, next) {
    kitchens.findAll({
            where: {
                productReady: 2
            }
        }).then(
            result => res.send(result)
        );
});

router.get('/kitchen/received', function(req, res, next) {
    kitchens.findAll({
            where: {
                productReady: 3
            }
        }).then(
            result => res.send(result)
        );
});

