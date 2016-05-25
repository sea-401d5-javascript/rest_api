/*jshint esversion:6*/
/*eslint-env es6*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

var jar = {message:'No cookies in the jar!'};

app.use(jsonParser);

// Peek at the cookie
app.get('/cookies',(req,res)=>{
  res.json(jar);
});

// Store the cookie
app.post('/cookies',(req,res)=>{
  if(req.body.cookie === jar.cookie){
    return res.send('No need for another ' + req.body.cookie + ' cookie!');
  }

  if(jar.cookie !== undefined){
    return res.send('There is a ' + jar.cookie + ' cookie there already.');
  }

  jar = req.body;
  console.log('Received ' + JSON.stringify(req.body));
  res.send(req.body.cookie + ' cookie received!');
});

// Update the cookie
app.put('/cookies/',(req,res)=> {
  if(req.body.cookie === jar.cookie){
    return res.send('A '+ jar.cookie + ' cookie is already there');
  }
  var currentCookie = jar.cookie;
  jar.cookie = req.body.cookie;
  res.send(currentCookie + ' cookie switched out for ' + req.body.cookie);
});

// Nom nom the cookie
app.delete('/cookies/:id',(req,res)=> {
  if(req.params.id === jar.cookie){
    jar = {message:'no more cookies!'};
    return res.json(jar);
  }

  return res.send('There are no '+ req.params.id + ' cookies there!');
});

app.listen(3000,()=> console.log('listening on port 3000'));
