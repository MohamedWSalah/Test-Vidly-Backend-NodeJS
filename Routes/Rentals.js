const Express = require('express');
const Router = Express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const {Customer,Validate} = require('../Models/Customer');
const {Movies,MovieValidation}= require('../Models/Movie');
const {Rental, rentalValidation} = require('../Models/Rental');


Router.get('/', async(req,res) =>
{
    const rentals = await Rental.find();
    res.send(rentals);
    console.log('rentals list was sent to the client');
});

Router.post('/', async(req,res)=>
{
    const {error} = rentalValidation(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(404).send('Customer ID is invalid');

    const movie = await Movies.findById(req.body.movieId);
    if(!movie) return res.status(404).send('Movie ID is invalid');

    let NewRental = new Rental(
        {
            customer:{_id:customer._id, name: customer.name, phone:customer.phone},
            movie: {_id: movie._id, title: movie.title , dailyRentalRate: movie.dailyRentalRate}
        }
    );


    NewRental = await NewRental.save();

    movie.numberInStock--;
    movie.save();

    res.send(NewRental);
    console.log(NewRental);
})





module.exports = Router;