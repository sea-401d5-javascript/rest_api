'use strict';

const jwt = require('jsonwebtoken');
const User = require('..model/user');
const secret = process.env.SECRET || 'changeme';
