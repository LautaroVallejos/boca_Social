const {
    Router
} = require('express');
const router = Router();

const mdlw = {
    jwt: require('../middlewares/jwt.mdlw')
}
const crtl = {
    me: require('../controllers/me.crtl'),
    root: require('../controllers/root.crtl'),
    signin: require('../controllers/signin.crtl'),
    signup: require('../controllers/signup.crtl')
}

router.get('/', crtl.root);

router.post('/signup', crtl.signup);

router.post('/signin', crtl.signin);

router.post('/me', mdlw.jwt, crtl.me);

module.exports = router;