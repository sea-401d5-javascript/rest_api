'use strict';

const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const myRouter = express.Router();

// const model = {
//   nodata: {
//     msg: 'no model'
//   }
// };

app.use(jsonParser);

// app.use((req, res, next) => {
//   req.model = model;
//   next();
// })

// app.use((req, res, next) => {
//   console.log('Request:', req.url);
//   next();
// })

// myRouter.get('/', (req, res) => {
//   res.type('json');
//   if (model.data) {
//     res.json(model.data);
//   } else {
//     res.json(model.nodata)
//   }
// });

myRouter.get('/:id', (req, res) => {
  let id = req.params.id;
  res.json({message: id.toUpperCase()});
});

myRouter.post('/', (req, res) => {
  console.log('post is doing something')
  // res.type('json');
  res.json({message: 'post success'});
});

myRouter.put('/', (req, res) => {
  res.json({message: 'put success'});
});

myRouter.patch('/', (req, res) => {
  res.json({message: 'patch success'});
});

myRouter.delete('/', (req, res) => {
  res.json({message: 'delete success'});
});

app.use('/articles', myRouter);

// app.use((err, req, res, next) => {
//   console.log(err);
//   res.status(err.statusCode || 500).json({message: err.message});
//});

app.get('/*', (req, res) => {
  res.status(404).json({message: 'not found'});
})

app.listen(3000, () => console.log('up on 3000'));
