const config = {
  port: 3001,
  crawler: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
  },
};

// console.log('process.evn.NODE_ENV: ', process.env.NODE_ENV);
// 开发模式
if (process.env.NODE_ENV === 'development') {
  config.database.PASSWORD = 'root';
}

module.exports = config;
