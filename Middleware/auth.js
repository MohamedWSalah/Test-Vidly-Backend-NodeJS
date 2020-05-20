const JWT = require('jsonwebtoken');
const config = require('config');

function auth(req,res,next)
{
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('No Token provided. ACCESS DENIED.');

    try{
        const DecodedPayload = JWT.verify(token, config.get('jwtPrivateKey'));
        req.user = DecodedPayload;
        console.log(DecodedPayload);
        next();
    }
    catch(ex)
    {
        res.status(404).send('Invalid Token.');
    }


}

module.exports = auth;