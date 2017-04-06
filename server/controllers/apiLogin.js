// 查看用户登录状态
const isLogin = async (ctx) => {
  const result = {
    success: false,
    message: '查看用户登录状态失败',
    data: {
      isLogin: false,
    },
  };
  if (ctx.session && ctx.session.userId) {
    result.success = true;
    result.message = '查询用户登录状态成功';
    result.data.isLogin = true;
  }
  ctx.body = result;
};


module.exports = {
  isLogin,
};
