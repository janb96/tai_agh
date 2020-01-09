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

router.get('/byProductID/:productID', (req, res, next) => {

    const productID = req.params.productID;

    products.findAll({
        where: {
            productID: productID
        }
    }).then(
        result => res.send(result)
    );
});

router.get('/:categoryID', (req, res, next) => {

    const categoryID = req.params.categoryID;

    products.findAll({
        where: {
            categoryID: categoryID
        }
    }).then(
        result => res.send(result)
    );
});

router.post('/', (req, res, next) => {
    const name = req.body.productName;
    const price = req.body.productPrice;
    const categoryID = req.body.categoryID;
    const productURL = req.body.productURL;

    const product = {
        categoryID: categoryID,
        productName: name,
        productPrice: price,
        productURL: productURL
    };

    products.create(product).then(
        result => res.send(result)
    );

});

module.exports = router;
