const Express = require('express');
const Router = Express.Router();
const Joi = require('joi');

const Genres = [
    {id:1, Genre:'Horror'},
    {id:2, Genre:'Action'},
    {id:3, Genre:'Comedy'}
];

//GET
Router.get('/',(req,res) =>
{
    res.send(Genres);
    console.log("Genres list was sent to the client");
});

Router.get('/:id',(req,res) =>
{
    const RecvMID = Genres.find(M => M.id === parseInt(req.params.id));
    if(!RecvMID) return res.status(404).send("Genre ID  was not found");

    res.send(RecvMID);
    console.log(`Genre was found and sent to the client. ${RecvMID}`);
});
//============
//POST
Router.post('/',(req,res) =>
{
    const RecvM = {id: Genres.length+1 , Genre: req.body.Genre};
    Genres.push(RecvM);

    const {error} = validateJOI(req.body);
    if(error) return res.send(error.details[0].message);
    
    res.send(RecvM);
    console.log(`${RecvM.Genre} was added to the Genres`);
});

//===============
//PUT
Router.put('/:id',(req,res) =>
{
    const RecvMID = Genres.find(M => M.id === parseInt(req.params.id));
    if(!RecvMID) return res.status(404).send("Genre ID  was not found");
    
    const {error} = validateJOI(req.body);
    if(error) return res.send(error.details[0].message);
    RecvMID.Genre = req.body.Genre;
    res.send(RecvMID);
});

//Delete
Router.delete('/:id',(req,res) =>
{
    const DID = Genres.find(M => M.id === parseInt(req.params.id));
    if(!DID) return res.status(404).send("Genre ID  was not found");

    const Deleted = Genres.splice(Genres.indexOf(DID),1);
    res.send(Deleted);
});

function validateJOI(X)
{
    const schema =
    {
        Genre: Joi.string().max(10).required()
    };

    return Joi.validate(X, schema);
}


module.exports = Router;