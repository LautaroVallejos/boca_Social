
const geoip = require('geoip-lite');
const jwt = require('jsonwebtoken');

const config = require('../utils/config');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body;
        const user = await User.findOne({
            email: email
        })

        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress;
        if (!user) {
            return res.status(401).res.end(JSON.stringify({
                auth: false,
                token: null,
                error: true,
                mensagge: "user not found"
            }))
        }

        const passwordIsValid = await user.validatePassword(password);

        if (!passwordIsValid) {
            return res.status(401).res.end(JSON.stringify({
                auth: false,
                token: null,
                error: true,
                message: 'general error'
            }))
        }

        user.lastestLocate.push(user.locate);
        user.locate = await geoip.lookup(ip);
        if (user.ip[user.ip.length - 1] != ip) {
            user.ip.push(ip);
        }
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
            message: "User is login"
        }));
    } catch (e) {
        console.log(e)
        res.end(JSON.stringify({
            auth: false,
            token: null,
            error: true,
            message: e
        }));
    }
}