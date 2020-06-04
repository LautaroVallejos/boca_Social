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

      userAlterate.isSuperAdmin = true;

      await userAlterate.save();

      return res.status(200).end(JSON.stringify({
        auth: true,
        token: null,
        error: false,
        message: 'Is change'
      }));
    } else {
      return res.status(500).end(JSON.stringify({
        auth: false,
        token: null,
        error: true,
        message: 'general error'
      }));
    }
  } catch (e) {
    res.status(500).end(JSON.stringify({
      auth: false,
      token: null,
      error: true,
      message: 'general error'
    }));
  }
}