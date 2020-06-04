module.exports = async (req, res, next) => {
    try {
        console.log(req.user);
        res.status(200).end(JSON.stringify({
            "holi": "holi"
        }));
    } catch (e) {
        console.log(e);
        res.end(JSON.stringify({
            auth: false,
            token: null,
            error: true,
            message: e
        }));
    }
}