const {
    Router
} = require('express');
const router = Router();

const mdlw = {
    jwt: require('../middlewares/jwt.mdlw')
}
const crtl = {
    root: require('../controllers/root.crtl'),
    addAdmin: require('../controllers/signin.crtl'),
    removeAdmin: require('../controllers/signup.crtl')
}

router.get('/', crtl.root);

router.post('/addAdmin', mdlw.jwt, crtl.addAdmin);

router.post('/removeAdmin', mdlw.jwt, crtl.removeAdmin);

module.exports = router;