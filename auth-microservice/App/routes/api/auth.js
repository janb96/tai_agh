let express = require('express');
let router = express.Router();
const auth = require('../auth');
let passport = require('passport');
let users = require('../../models/users.js');

router.get('/', function (req, res) {
    res.send('Auth API');
});

/* POST Signin user, returns JWT Token */
router.post('/signin', auth.optional, (req, res, next) => {
    const user = req.body;
    if(!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }
    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }
    return passport.authenticate('local-login', { session: false }, (err, passportUser, info) => {
        if(err) {
            return next(err);
        }

        if (passportUser) {
            return res.json(passportUser.toAuthJSON());
        }

        return res.status(400).info;
    })(req, res, next);
});

/* POST Signup user, returns JWT Token */
router.post('/signup', auth.optional, (req, res, next) => {
    const user = req.body;
    console.log(user);
    if(!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }
    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }
    return passport.authenticate('local-signup', { session: false }, (err, passportUser, info) => {
        if (err) {
            return next(err);
        }

        if (passportUser) {
            console.log("test");
            return res.json(passportUser.toAuthJSON());
        }

        return res.status(400).info;
    })(req, res, next);
});

/* GET Logouts user */
router.get('/signout', auth.required, (req, res, next) => {
    req.session.destroy(function (err) {
        res.send('"Successfully logout"');
    });
});


/* GET Returns user ID by Token */
router.get('/whoami', auth.required, (req, res, next) => {
    const { payload: { id } } = req;

    return users.findByPk(id)
        .then((user) => {
            if(!user) {
                return res.sendStatus(400);
            }

            return res.json(user.toAuthJSON());
        });
});

module.exports = router;
