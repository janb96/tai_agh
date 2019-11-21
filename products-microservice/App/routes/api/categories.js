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

router.get('/elo', (req, res, next) => {
    axios.get('http://docker-desktop:5000')
        .then(response => {
            res.send(response.data)
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        });
});

router.get('/papa', (req, res, next) => {
    axios.get('http://docker-desktop:5001')
        .then(response => {
            res.send(response.data)
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        });
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