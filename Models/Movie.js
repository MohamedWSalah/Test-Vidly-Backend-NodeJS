const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./Genre');


const moviesSchema = new mongoose.Schema({
    title: {type:String, required:true, minlength:3,maxlength:50},
    genre: {type: genreSchema, required: true},
    numberInStock: {type:Number, min:0 , max:255, default:0},
    dailyRentalRate: {type:Number, min:0 , max:255, default:0}
});

const Movies = mongoose.model('Movies', moviesSchema);



//Validation

function MovieValidation(movie)
{
    const Schema = 
    {
        title: Joi.string().min(3).max(50).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0),
        dailyRentalRate: Joi.number().min(0),
    }
    return Joi.validate(movie,Schema);
}

module.exports.Movies = Movies;
module.exports.MovieValidation = MovieValidation;