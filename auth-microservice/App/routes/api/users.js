const express = require('express');
const router = express.Router();
let users = require('../../models/users.js');
const auth = require('../auth');

router.get('/', auth.optional, (req, res, next) => {
  users.findAll().then(function (result) {
    res.send(result);
  });
});

router.put('/', auth.required, (req, res, next) => {
  const active = req.body.active;
  const userID = req.body.userID;

  const user = {
    active: active,
  };

  users.update(user, {
    where: {
      userID: userID,
    }
  }).then(
      result => res.send(result)
  );

});

module.exports = router;
