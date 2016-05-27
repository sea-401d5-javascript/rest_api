/*jshint esversion:6*/
/*eslint-env es6*/

const express = require('express');
const bodyParser = require('body-parser').json();
const Candy = require('../schema/candy');

const router = module.exports = exports = express.Router();

router.get('/willy',(req,res,next)=> {
  Candy.find({}, (err, pieces)=> {
    var totalStock = 0;
    if (err) return next(err);
    pieces.forEach((thisCandy)=> {
      totalStock += thisCandy.stock;
    });
    console.log('Total stock: ', totalStock);
    var message;
    if(totalStock === 1) {
      message = 'Willy Wonka has ' + totalStock + ' candy for you!';
      return res.json(message);
    }
    message = 'Willy Wonka has ' + totalStock + ' candies for you!';
    res.json(message);
  });
});

router.get('/', (req, res, next)=> {
  Candy.find({},(err, pieces)=> {
    if (err) return next(err);
    res.json(pieces);
  });
});

router.post('/', bodyParser, (req, res, next)=> {
  var newCandy = new Candy(req.body);
  newCandy.save((err, pieces)=> {
    if (err) return next(err);
    res.json(pieces);
  });
});

router.put('/', bodyParser, (req, res, next)=> {
  var _id  =req.body._id;
  Candy.findOneAndUpdate({_id},req.body,(err,pieces)=> {
    if (err) return next(err);
    var message = 'Candy updated!';
    res.json({message});
  });
});

router.delete('/:id',(req, res, next)=> {
  var _id = req.params.id;
  Candy.findOneAndRemove({_id},(err,pieces)=> {
    if (err) return next(err);
    var message = 'Candy eaten!';
    res.json({message});
  });
});
