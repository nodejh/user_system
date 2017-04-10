/**
 * 所有 API
 */

const router = require('koa-router')();
const apiLogin = require('./../controllers/apiLogin');
const apiUser = require('./../controllers/apiUser');


router.get('/isLogin', apiLogin.isLogin);
router.get('/logout', apiLogin.logout);
router.post('/login', apiLogin.login);
router.get('/user/info', apiUser.info);
router.post('/user/update', apiUser.update);

module.exports = router;