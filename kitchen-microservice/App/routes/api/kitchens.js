var express = require('express');
var router = express.Router();

var kitchens = require('../../models/kitchens.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post('/kitchen', (req, res, next) => {
    const productID = req.body.productID;

    const kitchen = {
        productID: productID,
        productReady: 1,
        dateOfAdmission: Date.now()
    };

    kitchens.create(kitchen).then(
        result => res.send(result)
    );
});

router.put('/kitchen', (req, res, next) => {
    const kitchenID = req.body.productReady;
    const productReady = req.body.productReady;

    const kitchen = {
        productReady: productReady,
    };

    kitchens.update(kitchen, {
        where: {
           kitchenID: kitchenID 
        }
    }).then(
        result => res.send(result)
    );
});

router.get('/kitchen', async function(req, res, next) {
    let result = await kitchens.findAll();
    res.send(result);
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

module.exports = router;