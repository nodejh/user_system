/**
 * 所有 API
 */

const router = require('koa-router')();
const apiLogin = require('./../controllers/apiLogin');


router.get('/isLogin', apiLogin.isLogin);
router.get('/logout', apiLogin.logout);
router.post('/login', apiLogin.login);

module.exports = router;
