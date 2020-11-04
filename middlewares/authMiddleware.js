const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //Check whether jwt exists
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err)
                return res.status(401).json({ msg: 'Token is not valid!' });
            else {
                next();
            }
        });

    } else {
        return res.status(401).json({ msg: 'No authentication token. Request denied!' });
    }
}


module.exports = {
    requireAuth
};