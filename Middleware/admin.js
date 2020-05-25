const JWT = require('jsonwebtoken');
const config = require('config');

function AdminAuth(req,res,next)
{
    if (!req.user.isAdmin) return res.status(403).send('Access Denied');
    next();
}

module.exports = AdminAuth;