const {
    Router
} = require('express');
const router = Router();

const mdlw = {
    jwt: require('../middlewares/jwt.mdlw')
}
const crtl = {
    root: require('../controllers/root.crtl'),
}

router.get('/', crtl.root);

module.exports = router;