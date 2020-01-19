const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

module.exports = function (user) {

    let User = user;

    passport.serializeUser(function (user, done) {
        done(null, user.userID)
    });

    passport.deserializeUser(function (id, done) {
        User.findByPk(id).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            User.findOne({
                where: {
                    Email: email
                }
            }).then(function (user) {
                if (user) {
                    return done(null, false, { errors: { 'email': 'is already taken' } });
                } else {
                    let userPassword = User.generatePassword(password);
                    let data = {
                        userName: req.body.userName,
                        firstName: req.body.firstName,
                        surName: req.body.surName,
                        roleID: req.body.roleID,
                        email: email,
                        password: userPassword,
                        active: 1,
                    };

                    User.create(data).then(function (newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        } else {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            User.findOne({
                where: {
                    Email: email
                }
            }).then(function (user) {
                if(!user) {
                    return done(null, false, { errors: { 'user': 'not found' } });
                }
                if(!User.validatePassword(password, user.password)) {
                    return done(null, false, { errors: { 'email or password': 'is invalid' } });
                }
                return done(null, user);
            })
        }
    ));
};
