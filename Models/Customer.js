const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
    {
        isGold : {type:Boolean, default:false},
        name: {type:String , required: true , minlength:3 , maxlength:50},
        phone: {type:String, required:true , minlength:8, maxlength:15}
    });

const Customer = mongoose.model('Customers',customerSchema);


//Validation
function CustomerValidation(X)
{
    const schema =
    {
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(8).max(15).required(),
        isGold: Joi.boolean()
    };

    return Joi.validate(X, schema);
}

module.exports.Customer = Customer;
module.exports.Validate = CustomerValidation;