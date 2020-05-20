const Joi = require('joi');
const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const config = require('config');

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true, minlength: 5, maxlength: 50 },
        email: { type: String, unique: true, required: true, minlength: 5, maxlength: 255 },
        password: { type: String, required: true, minlength: 8, maxlength: 1024 }
    });

userSchema.methods.generateAuthToken = function ()
{
    const Token = JWT.sign({_id:this._id}, config.get('jwtPrivateKey'));
    return Token;
}

const User = mongoose.model('User', userSchema);


function UserValidation(X) {
    const S = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(256).required().email(),
        password: Joi.string().min(8).max(1024).required()
    }

    return Joi.validate(X, S);
}


exports.User = User;
exports.UserValidation = UserValidation;

