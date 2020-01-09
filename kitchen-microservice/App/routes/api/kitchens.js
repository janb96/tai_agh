var express = require('express');
var router = express.Router();

var kitchens = require('../../models/kitchens.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post('/kitchen', (req, res, next) => {
    const productID = req.body.productID;
    const numberOfProducts = req.body.numberOfProducts;

    const kitchen = {
        productID: productID,
        numberOfProducts: numberOfProducts,
        productReady: 1,
        dateOfAdmission: Date.now()
    };

    kitchens.create(kitchen).then(
        result => res.send(result)
    );
});

// async function function1() {
//     console.log("FUNCTION1");
//     return "Hi from function1";
// }

// async function function2() {
//     this.setTimeout(function1, 3000);
// }


// router.get('/test', (req, res, next) => {

//     let start = new Date();

//     setTimeout(function() {
//         let end = new Date() - start;
//         res.send(end.toString());
//     }, 10000);

    
// });

// function is73(number) {
//     if (number%73 == 0) {
//         return true;
//     } else {
//         return false;
//     }
// }

// router.get('/test2', (req, res, next) => {

//     let start = new Date();

//     for (let i = 0; i < 1000000; i++) {
//         console.log(is73(i));
//     }

//     let end = new Date() - start;
//     res.send(end.toString());
    
// });

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