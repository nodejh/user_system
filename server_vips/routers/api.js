/**
 * 所有 API
 */

const router = require('koa-router')();
const apiLogin = require('./../controllers/apiLogin');
const apiUser = require('./../controllers/apiUser');
const apiTeacher = require('./../controllers/apiTeacher');
const apiRecord = require('./../controllers/apiRecord');


router.get('/isLogin', apiLogin.isLogin);
router.get('/logout', apiLogin.logout);
router.post('/login', apiLogin.login);
router.get('/user/info', apiUser.info);
router.post('/user/update', apiUser.update);
router.get('/teacher/list', apiTeacher.list);
router.get('/record/list', apiRecord.list);
router.post('/record/comment', apiRecord.comment);


module.exports = router;
