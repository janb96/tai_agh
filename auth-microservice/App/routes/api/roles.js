const express = require('express');
const router = express.Router();
let roles = require('../../models/roles.js');
const auth = require('../auth');

router.get('/', auth.optional, (req, res, next) => {
    roles.findAll().then(
        result => res.send(result)
    );
});

router.post('/', auth.adminOnly, (req, res, next) => {
    const name = req.body.roleName;

    const role = {
        roleName: name,
    };

    roles.create(role).then(
        result => res.send(result)
    );

});

module.exports = router;
