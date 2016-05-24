// 'use strict';
//
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json();
// const myRouter = express.Router();
//
// app.use(jsonParser);
//
//
// myRouter.get('/', (req, res) => {
//   console.log('you got get');
//   res.send('Mission accomplished. Time for a beer.  ');
// });
//
// myRouter.get('/zoots', (req, res) => {
//   console.log('Zoots fool. ');
//   res.send('Zoots Zoots. ');
// });
//
// myRouter.post('/post', (req, res) => {
//   console.log('Hey Mr. Post-man. ');
//   res.json({message: 'This is some sweet sweet JSON. '})
// });
//
// myRouter.put('/put', (req, res) => {
//   console.log('Put your hands up! ');
//   res.json({message: 'Party Under Trees JSON '});
// });
//
// myRouter.patch('/patch', (req, res) => {
//   console.log('Patchy patchface. ');
//   res.json({message: 'Just a small fix JSON'});
// });
// myRouter.delete('/:id', (req, res) => {
//   console.log('Seek and destroy! ');
//   let mes = req.params.id + ' Nothing to see here folks';
//   res.send(mes);
// });
//
// myRouter.get('/*', (req, res) => {
//   res.status(404).json({msg: 'not found'});
// });
//
//
// module.exports = myRouter;
