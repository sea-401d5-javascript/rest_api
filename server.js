'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const Rooney = require('./schema/rooney');
const Messi = require('./schema/messi');
const rooneyRouter = express.Router();
const messiRouter = express.Router();
const mongoose = require('mongoose');
const morgan = require('morgan');

app.use(morgan('dev'));

mongoose.connect('mongodb://localhost/dev_db');

rooneyRouter.use(jsonParser);
messiRouter.use(jsonParser);

app.use('/rooney', rooneyRouter);
app.use('/messi', messiRouter);

rooneyRouter.get('/', (req, res) => {
  Rooney.find({}, (err,data) => {
    if(err) return res.json({
      message: err.message
    });
    res.json(data);
  });
});

rooneyRouter.post('/', jsonParser,  (req, res) => {
  let newRooney = new Rooney(req.body);
  newRooney.save((err, data) => {
    if(err) return res.json({
      message: err.message
    });
    res.json(data);
  });
});

rooneyRouter.put('/', jsonParser, (req, res) => {
  Rooney.findOneAndUpdate({_id: req.body._id}, req.body, (err,data) => {
    if(err) return res.json({message: err.message});
    res.json(data);
  });
});

rooneyRouter.delete('/:id', jsonParser, (req, res) => {
  let _id = req.params.id;
  Rooney.findOneAndRemove({_id}, null, (err,data) => {
    if(err) return res.json({message: err.message});
    res.send('deleted Rooney with id ' + req.params.id);
  });
});

app.get('/*', (req, res) => {
  res.status(404).json({msg: 'not found'});
});

app.listen(3000, () => console.log('up on 3000'));
