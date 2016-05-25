'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const rooneyRouter = express.Router();
const fs = require('fs');
const stream = require('stream');

const dir =  __dirname + '/../data';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

rooneyRouter.use(jsonParser);

app.use('/rooney', rooneyRouter);

rooneyRouter.get('/', (req, res) => {
  res.send('GLORY MAN UNITED')
})

rooneyRouter.get('/:id', (req,res) => {
  let id = req.params.id;
  console.log('hello from id get route');
  res.json({message: id.toUpperCase()})
})

rooneyRouter.post('/', (req, res) => {
  console.log('hit post route');
  let rooney = '';
    req.on('data', (data) => {
      rooney += data.toString();
    });
    req.on('end', () => {
      let nextFile = (fs.readdirSync(dir)).length +1
      let file = fs.createWriteStream(dir + '/' + nextFile + '.json')
      var bufferStream = new stream.PassThrough();
      let inBuf = new Buffer(rooney);
      bufferStream.end(inBuf);
      bufferStream.pipe(file);
      res.json({message: 'Wrote a new file'});
    })
})

rooneyRouter.put('/:id', (req, res) => {
  console.log('rooneyRouter put hit');
  let id = req.params.id;
  var stream = fs.createWriteStream(dir + '/' + id + '.json');
  req.pipe(stream);
  res.send('Updated Rooney' + '\n');
})

rooneyRouter.delete('/:id', (req, res) => {
  console.log('delete route hit');
  let id = req.params.id;
  fs.unlinkSync(__dirname + `/../data/${id}.json`)
  res.send(`File ${id}.json successfully deleted`)
})

app.get('/*', (req, res) => {
  res.status(404).json({msg: 'not found'})
})



app.listen(3000, () => console.log('up on 3000'));
