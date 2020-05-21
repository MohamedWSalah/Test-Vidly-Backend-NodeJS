const Express = require('express');
const Router = Express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const {Customer} = require('../Models/Customer');
const {Movies}= require('../Models/Movie');
const {Rental, rentalValidation} = require('../Models/Rental');
const auth = require('../Middleware/auth');

Fawn.init(mongoose);

Router.get('/', async(req,res) =>
{
    const rentals = await Rental.find();
    res.send(rentals);
    console.log('rentals list was sent to the client');
});

Router.post('/',auth, async(req,res)=>
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

    try 
    {
        new Fawn.Task()
        .save('rentals',NewRental)
        .update('movies', {_id:movie._id}, 
        {
            $inc: {numberInStock: -1}
        })
        .run();

        res.send(NewRental);
        console.log(NewRental);
    } 
    catch (error) 
    {
        res.status(500).send('Server Error');
    }
})





module.exports = Router;