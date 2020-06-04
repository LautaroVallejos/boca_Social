module.exports = async (req, res, next) => {
    res.end(JSON.stringify({
        auth: false,
        token: null,
        error: false,
        message: 'Api online'
    }));
}