'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const jsonPaser = bodyParser.json();
//const companyRouter = express.Router();
var routes = require('./routes/index');
var companies = require('./routes/companies');
var app = express();

app.use(jsonPaser);

app.use('/', routes);
app.use('/companies', companies);


app.get('/*', (req,res) => {
  res.status(404).json({Error:'Not Found'})
})

app.listen(3000, () => console.log('up on 3000'));
