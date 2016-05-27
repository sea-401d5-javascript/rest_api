'use strict';

const express = require('express');
const Weasel = require(__dirname + '/../../schema/weasel');
const bodyParser = require('body-parser').json();

const weaselRouter = module.exports = exports = express.Router();

weaselRouter.get('/', (req, res)=>{
  Weasel.find({}, (err, weaselData)=>{
    if (err) return res.json({message: 'Error getting'});
    res.json(weaselData);
  });
});

weaselRouter.post('/', bodyParser, (req, res)=>{
  let aWeasel = new Weasel({
    name: req.body.name,
    snakeKiller: req.body.snakeKiller,
    strength: req.body.strength
  });
  aWeasel.save((err, weaselData)=>{
    if (err) return res.json({message: 'Error posting'});
    res.json(weaselData);
  });
});

weaselRouter.put('/', bodyParser, (req, res)=>{
  let _id = req.body._id;
  Weasel.findOneAndUpdate({_id}, req.body, (err, data)=>{
    if (err) return res.json({message: 'Error updating'});
    res.json({message: 'Update successful'});
  });
});

weaselRouter.delete('/:id', (req, res)=>{
  let _id = req.params.id;
  Weasel.findOneAndRemove({_id}, (err, data)=>{
    if (err) return res.json({message: 'Error deleting'});
    res.json({message: 'Deletion successful'});
  });
});
