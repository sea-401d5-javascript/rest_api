'use strict'
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.jsonParser
const fistRouter = express.Router();

//app.use(jsonParser);
firstRouter.post('/', (req,res) => {
  console.log('hit post route');
  let frenchie;
  res.on('data', (data) => {
    frenchie += data.toString();
  })
  res.end('end', () => {
    var nextFile = (fs.readdirSync(__dirname + '/data/')).length +1
    let file = fs.createWriteStream(__dirname + '/data/frenchie' + nextFile + '.json')
    var bufferStream = new stream.PassThrough();
    let inBuf = new Buffer(frenchie);
    bufferStream.end(inBuf);
    bufferStream.pipe(file);
    res.send('Saved a Frenchie')
  })
})

firstRouter.get('/', (req,res) => {
  console.log('hit get route');
  res.send('Hello, here is a Frenchie')
})


firstRouter.put('/:frenchie_id', (req,res) => {
  console.log('hit the put route');
    let frenchie_id = req.params.frenchie_id
    var stream = fs.createWriteStream(__dirname + 'data/frenchie' + frenchie_id + '.json')
    req.pipe(stream);
    res.send('Updated Frenchie')
  })
})

firstRouter.delete('/:frenchie_id', (req,res) => {
  console.log('hit the delete route');
  let frenchie_id = req.params.frenchie_id
  fs.unlinkSync(__dirname + 'data/frenchie' + frenchie_id + '.json')
  res.send('deleted frenchie')
})


//app.use('/frenchies', firstRouter);
app.listen(3000, () => console.log('listening on 3000'));
