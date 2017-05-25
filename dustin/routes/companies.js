'use strict';
var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser').json();
const Company = require('../schema/companies');

//index companies
router.get('/', (req, res, next) => {
  Company.find({}, (err, companies) => {
    if (err) return next(err);
    res.json(companies);
  });
});

router.get('/dealstats', (req, res, next) => {

  //get tvDealValuation amount
  Company.find({
    tvDealValuation: {
      $ne: true
    }
  }, (err, companies) => {
    if (err) return next(err);
    let count = 0;
    let total = (companies.reduce((a,b)=> {
      if (b.tvDealValuation) ++count;
      return a + b.tvDealValuation;
    },0));
    res.send({averageTvDealValuation: total/count, totalTvDealValuation: total });
  });
});

//create companies
router.post('/', bodyParser, (req, res, next) => {
  let newCompany = new Company(req.body);
  newCompany.save((err, company) => {
    if (err) return next(err);
    res.json(company);
  });
});

//put company
router.put('/', bodyParser, (req, res, next) => {
  let _id = req.body._id;
  Company.findOneAndUpdate({
    _id
  }, req.body, (err) => {
    if (err) return next(err);
    let message = 'successfully update';
    res.json({
      message
    });
  });
});

//delete companies
router.delete('/:id', (req, res, next) => {
  let _id = req.params.id;
  Company.findOneAndRemove({
    _id
  }, (err) => {
    if (err) return next(err);
    let message = 'sucessfully deleted';
    res.json({
      message
    });
  });
});

module.exports = router;
