const Express = require('express');
const Router = Express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const {Genre,validateJOI} = require('../Models/Genre');

//GET
Router.get('/',async (req,res) =>
{
    const genres = await Genre.find();
    res.send(genres);
    console.log("Genres list was sent to the client");
    console.log(genres);
});
//DONE ^

Router.get('/:id',async (req,res) =>
{
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send("Genre ID  was not found");

    
    res.send(genre);
    console.log(`Genre was found and sent to the client. ${genre}`);
});
//============
//POST
Router.post('/',async (req,res) =>
{
    let RecvM = new Genre ({name: req.body.name});
    const {error} = validateJOI(req.body);
   if(error) return res.send(error.details[0].message);
    RecvM = await RecvM.save();
    res.send(RecvM);
    console.log(`${RecvM.name} was added to the Genres`);
});
//Done^
//===============
//PUT
Router.put('/:id',async(req,res) =>
{   
    const {error} = validateJOI(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name:req.body.name}
        ,{new : true});
    
    if(!genre) return res.status(404).send("Genre ID  was not found");
    
    res.send(genre);
});
//Done^
//Delete
Router.delete('/:id',async(req,res) =>
{
    const Deleted = await Genre.findByIdAndRemove(req.params.id);
    if(!Deleted) return res.status(404).send("Genre ID  was not found");
    res.send(Deleted);
});



module.exports = Router;