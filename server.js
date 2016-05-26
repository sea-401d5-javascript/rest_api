'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const Rooney = require('./schema/rooney');
const rooneyRouter = express.Router();
const fs = require('fs');
const stream = require('stream');
const mongoose = require('mongoose');
const morgan = require('morgan');

app.use(morgan('dev'));

mongoose.connect('mongodb://localhost/dev_db');

const dir =  __dirname + '/../data';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

rooneyRouter.use(jsonParser);

app.use('/rooney', rooneyRouter);

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
  // console.log('delete route hit');
  // let id = req.params.id;
  // fs.unlinkSync(__dirname + `/../data/${id}.json`)
  // res.send(`File ${id}.json successfully deleted`)
});

app.get('/*', (req, res) => {
  res.status(404).json({msg: 'not found'})
})



app.listen(3000, () => console.log('up on 3000'));
