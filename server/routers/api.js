/**
 * 所有 API
 */

const router = require('koa-router')();
const apiLogin = require('./../controllers/apiLogin');


router.get('/isLogin', apiLogin.isLogin);
router.get('/a', async (ctx) => {
  ctx.body = 'ddd';
});

module.exports = router;
