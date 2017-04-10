const path = require('path');
const Koa = require('koa');
const convert = require('koa-convert');
const views = require('koa-views');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');

const config = require('./config');
const router = require('./router');

const app = new Koa();

// session存储配置
const sessionMysqlConfig = {
  user: config.db.username,
  password: config.db.password,
  database: config.db.database,
  host: config.db.host,
};

// 配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig),
}));

// 配置控制台日志中间件
app.use(convert(koaLogger()));

// 配置ctx.body解析中间件
app.use(bodyParser());

// 配置静态资源加载中间件
app.use(convert(koaStatic(path.join(__dirname, './static'))));

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs',
}));

// 初始化路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 监听启动端口
app.listen(config.port);
console.log(`The server is start at port ${config.port}`);
