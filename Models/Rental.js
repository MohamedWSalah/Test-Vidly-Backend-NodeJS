const Joi = require('joi');

const mongoose = require('mongoose');
const {customerSchema} = require('./Customer')



const moviesSchemaRent = new mongoose.Schema({
    title: {type:String, required:true, minlength:3,maxlength:50},
    dailyRentalRate: {type:Number, required:true, min:0 , max:255}
});


const rentalSchema = mongoose.Schema(
    {
        customer: {type:customerSchema, required:true},
        movie: {type:moviesSchemaRent,required:true},
        dateOut: {type:Date, required:true,  default:Date.now},
        dateReturned: {type:Date},
        rentalFee:{type:Number, min:0}
    }
);

const Rental = new mongoose.model('Rental', rentalSchema);

function rentalValidation(X)
{
    const Schema = {
       customerId: Joi.objectId().required(),
       movieId: Joi.objectId().required()
    }

    return Joi.validate(X,Schema);
}

module.exports.Rental = Rental;
module.exports.rentalValidation = rentalValidation;