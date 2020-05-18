const Express = require('express');
const Router = Express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const {User,UserValidation} = require('../Models/User');


Router.post('/', async(req,res)=>
{   
    const {error} = UserValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let NewUser = await User.findOne({email:req.body.email});
    if(NewUser) return res.status(400).send('This Email Already Registered.');

    
    NewUser = new User(
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
    );

    await NewUser.save();

    res.send(NewUser);
})


module.exports = Router;