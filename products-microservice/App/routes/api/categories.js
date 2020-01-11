const express = require('express');
const router = express.Router();
const axios = require('axios');

let categories = require('../../models/categories.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res, next) => {
    categories.findAll().then(
        result => res.send(result)
    );
});

router.get('/byCategoryID/:categoryID', (req, res, next) => {
    
    const categoryID = req.params.categoryID;

    categories.findAll({
        where: {
            categoryID: categoryID
        }
    }).then(
        result => res.send(result)
    );

});

router.post('/', (req, res, next) => {
    const name = req.body.categoryName;

    const category = {
        categoryName: name,
    };

    categories.create(category).then(
        result => res.send(result)
    );

});

module.exports = router;