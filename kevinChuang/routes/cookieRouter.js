/*jshint esversion:6*/
/*eslint-env es6*/

const express = require('express');
const bodyParser = require('body-parser').json();
const Cookie = require('../schema/cookie');

const router = module.exports = exports = express.Router();

router.get('/mrsfields',(req,res,next)=> {
  Cookie.find({}, (err, pieces)=> {
    var totalStock = 0;
    if (err) return next(err);
    pieces.forEach((thisCookie)=> {
      totalStock += thisCookie.stock;
    });
    console.log('Total stock: ', totalStock);
    var message;
    if(totalStock === 1) {
      message = 'Mrs. Fields has ' + totalStock + ' cookie for you!';
      return res.json(message);
    }
    message = 'Mrs. Fields has ' + totalStock + ' cookies for you!';
    res.json(message);
  });
});


router.get('/', (req, res, next)=> {
  Cookie.find({},(err, crumbs)=> {
    if (err) return next(err);
    res.json(crumbs);
  });
});

router.post('/', bodyParser, (req, res, next)=> {
  var newCookie = new Cookie(req.body);
  newCookie.save((err, crumbs)=> {
    if (err) return next(err);
    res.json(crumbs);
  });
});

router.put('/', bodyParser, (req, res, next)=> {
  var _id  =req.body._id;
  Cookie.findOneAndUpdate({_id},req.body,(err,crumbs)=> {
    if (err) return next(err);
    var message = 'Cookie updated!';
    res.json({message});
  });
});

router.delete('/:id',(req, res, next)=> {
  var _id = req.params.id;
  Cookie.findOneAndRemove({_id},(err,crumbs)=> {
    if (err) return next(err);
    var message = 'Cookie eaten!';
    res.json({message});
  });
});
