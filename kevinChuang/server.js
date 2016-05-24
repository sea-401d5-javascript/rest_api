/*jshint esversion:6*/
/*eslint-env es6*/

const express = require('express');
const app = express();

app.get('/cookies',(req,res)=>{
  app.send('cookies sent!');
});

app.post('/cookies',(req,res)=>{
  app.send('cookies received!');
});

app.put('/cookies',(req,res)=> {
  app.send('cookies updated!');
});

app.delete('/cookies',(req,res)=> {
  app.send('cookies eaten!');
});

app.listen(3000,()=> console.log('listening on port 3000'));
