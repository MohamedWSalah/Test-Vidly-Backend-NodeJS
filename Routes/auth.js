const Express = require('express');
const Router = Express.Router();
const Joi = require('joi');
const {User} = require('../Models/User');

const bcrypt = require('bcrypt');
Router.post('/', async (req, res) => {
    const { error } = AuthValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let UserLoging = await User.findOne({ email: req.body.email });
    if (!UserLoging) return res.status(400).send('Invalid Email or Password..');

    const validPassword = await bcrypt.compare(req.body.password, UserLoging.password);
    if (!validPassword) return res.status(400).send('Invalid Email or Password.');


    const Token = UserLoging.generateAuthToken();

    
    res.send(Token);

})

function AuthValidation(X) {
    const S = {
        email: Joi.string().min(5).max(256).required().email(),
        password: Joi.string().min(8).max(1024).required()
    }

    return Joi.validate(X, S);
}

module.exports = Router;