const {
    Router
} = require('express')
const router = Router();

const jwt = require('jsonwebtoken');
const config = require('../config');
const geoip = require('geoip-lite');

const User = require('../models/User');

router.get('/', (req, res) => {
    res.json({
        microservice: ""
    })
})

module.exports = router;
