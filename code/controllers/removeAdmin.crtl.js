module.exports = async (req, res, next) => {
    try {
        const {
            user
        } = req;
        const {
            email
        } = req.body;

        if (user.isSuperAdmin) {
            const userAlterate = await User.find({
                "email": email
            }, {
                password: 0
            });

            userAlterate.isSuperAdmin = false;

            await userAlterate.save();

            res.end(JSON.stringify({
                auth: true,
                error: false,
                message: 'Is passaged'
            }));
        } else {
            return res.status(404).end(JSON.stringify({
                auth: false,
                error: true,
                message: 'general error'
            }));
        }
    } catch (e) {
        res.end(JSON.stringify({
            auth: false,
            error: true,
            message: 'general error'
        }));
    }
}