'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const Frenchie = require('../schema/frenchies.js');
const User = require('../schema/user.js');
const verifyToken = require('../lib/auth_token.js');
const authHTTP = require('../lib/basic_http.js');

const frenchieRouter = module.exports = express.Router();

frenchieRouter.post('/', authHTTP, jsonParser, (req,res,next) => {
  console.log('hit post route');
  let newFrenchie = new Frenchie(req.body);
  User.findOne({username:req.authorization.username}, (err,user) => {
    if(err || !user) return next(new Error('no user found'));
    if(!user.comparePasswords(req.authorization.password)) return next(new Error('incorrect password'));
    newFrenchie.save((err,frenchie) => {
      if (err) return res.json({message:err.message});
      res.json(frenchie);
    });
  });
});

frenchieRouter.get('/', (req,res) => {
  console.log('hit get route');
  Frenchie.find({}, (err,data) => {
    if(err) return res.json({message:err.message});
    res.json(data);
  });
});


frenchieRouter.put('/', verifyToken, jsonParser, (req,res) => {
  console.log('hit the put route');
  Frenchie.findOneAndUpdate({_id:req.body._id}, req.body, (err,data) => {
    if(err) return res.json({message: err.message});
    res.json({message:'successfully updated Frenchie', oldDog: data});
  });
});

frenchieRouter.delete('/:frenchie_id', verifyToken, (req,res) => {
  console.log('hit the delete route');
  Frenchie.findOneAndRemove({_id:req.params.frenchie_id}, null, (err,data) => {
    if(err) return res.json({message:err.message});
    res.json({message:'Deleted Frenchie', oldDog:data});
  });
});
