
const geoip = require('geoip-lite');
const jwt = require('jsonwebtoken');

const config = require('../utils/config');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress;
        const {
            username,
            email,
            password
        } = req.body;
        const user = new User({
            username,
            email,
            password
        })
        user.password = await user.encryptPassword(user.password);
        user.locate = await geoip.lookup(ip);
        user.ip.push(ip);
        await user.save();

        const token = jwt.sign({
            id: user._id,
            isSuperUser: user.isSuperUser
        }, config.secret, {
            expiresIn: 60 * 60 * 24
        })


        res.writeHead(200, {
            'x-access-token': token
        })
        res.end(JSON.stringify({
            auth: true,
            token: token,
            error: false,
            message: "User resgistered"
        }));

    } catch (e) {
        console.log(e);
        res.status(401).end(JSON.stringify({
            auth: false,
            token: null,
            error: true,
            message: 'general error'
        }))
    }
}