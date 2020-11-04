const User = require('../models/index.js')['User'];
const jwt = require('jsonwebtoken');
require('dotenv').config();

const maxAge = 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
};

signup_get = (req, res) => {
    res.send('signup_get');
}

signup_post = async (req, res) => {
    const { email, password, client_id } = req.body;
    try {
        const user = await User.create({
            email,
            password,
            client_id
        }, { fields: ['email', 'password', 'client_id'] });
        const token = createToken(user.id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user.id });
    } catch (e) {
        res.status(400).json({ msg: e });
    }
}

login_get = (req, res) => {
    res.status(200).json({ msg: 'login_get' });
}

logout_get = async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json({ msg: 'Successfully logged out!' });
    } catch (e) {
        res.status(400).json({ msg: e });
    }
}

login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user.id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ userId: user.id, email: user.email, clientId: user.client_id });
    } catch (e) {
        console.log(e);
        res.status(400).send('Login unsuccessful!');
    }
}

checkUser = (req, res) => {
    const token = req.cookies.jwt;

    //Check whether jwt exists
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.send('Token is not valid!');
            } else {
                const user = await User.findOne({ where: { id: decodedToken.id } });
                res.status(200).json({ userId: user.id, email: user.email, clientId: user.client_id });
            }
        });
    } else {
        res.send('No token!');
    }
}

module.exports = {
    signup_get,
    signup_post,
    login_get,
    logout_get,
    login_post,
    checkUser
}