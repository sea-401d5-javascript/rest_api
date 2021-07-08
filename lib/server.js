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
  // let nextFile = fs.readdirSync(dir).length + 1;
  // const writeToFile = fs.createWriteStream(dir + '/' + nextFile + '.json');
  // req.pipe(writeToFile);
  // res.writeHead(200, { 'Content-Type': 'text/plain' });
  // res.write('saved file ' + nextFile + '.json' + '\n');
  // console.log(nextFile);
  // return res.end();

  let bufferString = '';
    req.on('data', (data) => {
      bufferString += data.toString();
    });
    req.on('end', () => {
      var nextFile = (fs.readdirSync(__dirname + '/data/')).length +1
      let file = fs.createWriteStream(__dirname + '/data/test' + nextFile + '.json')
      var bufferStream = new stream.PassThrough();
      let inBuf = new Buffer(bufferString);
      bufferStream.end(inBuf);
      bufferStream.pipe(file);
      res.statusCode = 200;
      return res.end('wrote to new file' + '\n');

    })

})

rooneyRouter.put('/:rooney_id', (req, res) => {
  console.log('rooneyRouter put hit');
  let id = req.params.rooney_id;
  var stream = fs.createWriteStream(__dirname + '/data/' + id + '.json');
  req.pipe(stream);
  res.send('Updated Rooney' + '\n');

  // res.writeHead(200, {'Content-Type': 'application/json'});
  // res.write(JSON.stringify({message: 'Hello from rooneyRouter put'}));
  // res.end();
})

rooneyRouter.delete('/:id', (req, res) => {
  let message = `Poor ${req.params.id} is scheit.`;
  res.send(message);
})

app.get('/*', (req, res) => {
  res.status(404).json({msg: 'not found'})
})



app.listen(3000, () => console.log('up on 3000'));
