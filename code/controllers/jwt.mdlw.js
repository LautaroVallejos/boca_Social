module.exports = (req, res, next)=>{
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).end(JSON.stringify({
                auth: false,
                token: null,
                error: true,
                message: 'no token provided'
            }))
        }

        const decoded = jwt.verify(token, config.secret);

        const user = await User.findById(decoded.id, {
            password: 0
        });
        if (!user) {
            return res.status(404).end(JSON.stringify({
                auth: false,
                token: null,
                error: true,
                message: 'general error'
            }));
        }
        req.user = user;
        next();
    } catch (e) {
        return res.status(401).end(JSON.stringify({
            auth: false,
            token: null,
            error: true,
            message: 'no token provided'
        }))
    }
}