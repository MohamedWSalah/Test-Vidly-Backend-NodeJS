const Joi = require('joi');
const mongoose = require('mongoose');



const genreSchema = new mongoose.Schema(
    {
        name: {type: String , require:true , minlength:3 , maxlength: 50}
    });
    
const Genre = mongoose.model('Genre',genreSchema);

function validateJOI(X)
{
    const schema =
    {
        name: Joi.string().min(5).max(10).required()
    };

    return Joi.validate(X, schema);
}

module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;
module.exports.validateJOI = validateJOI;
    