const Express = require('express');
const Router = Express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const {User} = require('../Models/User');
const lodash = require('lodash');
const bcrypt = require('bcrypt');

Router.post('/', async (req, res) => {
    const { error } = AuthValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let NewUser = await User.findOne({ email: req.body.email });
    if (!NewUser) return res.status(400).send('Invalid Email or Password..');

    const validPassword = await bcrypt.compare(req.body.password, NewUser.password);
    if (!validPassword) return res.status(400).send('Invalid Email or Password.');

    res.send(true);

})

function AuthValidation(X) {
    const S = {
        email: Joi.string().min(5).max(256).required().email(),
        password: Joi.string().min(8).max(1024).required()
    }

    return Joi.validate(X, S);
}

module.exports = Router;