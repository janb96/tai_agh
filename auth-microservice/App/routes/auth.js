let jwt = require('express-jwt');

const obtainTokenFromHeaders = (req) => {
    const { headers: {authorization} } = req;

    if (authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1];
    }
    return null;
};

const obtainAdminTokenFromHeaders = (req) => {
    const { headers: {authorization} } = req;
    const roleID = req.headers.roleid;
    if (authorization && authorization.split(' ')[0] === 'Token') {
        if (roleID === '3') {
            return authorization.split(' ')[1];
        }
    }
    return null;
};

const auth = {
    required: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: obtainTokenFromHeaders,
    }),
    optional: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: obtainTokenFromHeaders,
        credentialsRequired: false,
    }),
    adminOnly: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: obtainAdminTokenFromHeaders,
    }),
};

module.exports = auth;
