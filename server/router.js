/**
 * 整合所有子路由
 */

const router = require('koa-router')();
const index = require('./routers/index');
const api = require('./routers/api');


router.use('/', index.routes(), index.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());


module.exports = router;
