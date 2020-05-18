const Express = require('express');
const Router = Express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const { Movies, MovieValidation } = require('../Models/Movie');
const { Genre } = require('../Models/Genre');

Router.get('/', async (req, res) => {
    const movies = await Movies.find();
    res.send(movies);
    console.log("Movies list was sent to the client");
    console.log(movies);
});


Router.post('/', async (req, res) => {
    const { error } = MovieValidation(req.body);
    if (error) return res.send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Wrong Genre');

    const movie = new Movies
        (
            {
                title: req.body.title,
                genre: { _id: genre._id, name: genre.name }
            }
        );
    await movie.save();

    res.send(movie);
    console.log(`${movie.title} was added to the Movies`);
});

module.exports = Router;