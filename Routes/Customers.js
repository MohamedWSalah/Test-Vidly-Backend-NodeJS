const Express = require('express');
const Router = Express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const {Customer,Validate} = require('../Models/Customer');


//Get all customers API
Router.get('/',async (req,res)=>
{
    const C = await Customer
    .find()
    .sort('name');
    res.send(C);
    console.log(`${C} >> Sent to client`);
});

//Get Customer by ID
Router.get('/:id',async (req,res) =>
{
    const C = await Customer.findById(req.params.id);
    if(!C) return res.status(404).send('ID was not found');
    res.send(C);
    console.log(`${C} >>> sent to client`);
});

//Add Customer to the list
Router.post('/',async (req,res)=>
{
    const {error} = Validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let C = new Customer(
        {name: req.body.name,
        phone:req.body.phone,
        isGold:req.body.isGold});
    

    C = await C.save();
    res.send(C);
});

//Update Customer
Router.put('/:id',async(req,res) =>
{   
    const {error} = Validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const C = await Customer.findByIdAndUpdate(req.params.id,
         {name:req.body.name,phone:req.body.phone}
        ,{new : true});
    
    if(!C) return res.status(404).send("Genre ID  was not found");
    
    res.send(C);
});

module.exports = Router;