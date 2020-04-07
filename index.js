const Express = require('express');
const App = Express();

App.use(Express.json());

const Movies = [
    {id:1, Genre:'Horror'},
    {id:2, Genre:'Action'},
    {id:3, Genre:'Comedy'}
];

//GET
App.get('/api/Movies',(req,res) =>
{
    res.send(Movies);
    console.log("Movies list was sent to the client");
});

App.get('/api/Movies/:id',(req,res) =>
{
    const RecvMID = Movies.find(M => M.id === parseInt(req.params.id));
    if(!RecvMID) return res.status(404).send("Movie ID  was not found");

    res.send(RecvMID);
    console.log(`Movie was found and sent to the client. ${RecvMID}`);
});
//============
//POST
App.post('/api/Movies',(req,res) =>
{
    const RecvM = {id: Movies.length+1 , Genre: req.body.Genre};
    Movies.push(RecvM);

    res.send(RecvM);
    console.log(`${RecvM} was added to the Movies`);
});

//===============
//PUT
App.put('/api/Movies/:id',(req,res) =>
{
    const RecvMID = Movies.find(M => M.id === parseInt(req.params.id));
    if(!RecvMID) return res.status(404).send("Movie ID  was not found");

    RecvMID.Genre = req.body.Genre;
    res.send(RecvMID);
});

//Delete
App.delete('/api/Movies/:id',(req,res) =>
{
    const DID = Movies.find(M => M.id === parseInt(req.params.id));
    if(!DID) return res.status(404).send("Movie ID  was not found");

    const Deleted = Movies.splice(Movies.indexOf(DID),1);
    res.send(Deleted);
});

App.listen(3000);
console.log("Listening on port 3000");