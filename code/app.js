const express = require('express');
const app = express();
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

//security
app.disable('x-powered-by')
app.use(helmet());
app.use(mongoSanitize({
    replaceWith: '_'
}))
app.set('trust proxy', 1);
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(require('./controllers/pay.crtl.js'));

module.exports = app;