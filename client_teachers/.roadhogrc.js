// const path = require('path');
// const svgSpriteDirs = [
//   require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg
//   path.resolve(__dirname, 'src/assets'),  // 业务代码本地私有 svg 存放目录
// ];
//
// console.log('svgSpriteDirs: ', svgSpriteDirs);
//
// export default {
//   "entry": "src/index.js",
//   "env": {
//     "development": {
//       "extraBabelPlugins": [
//         "dva-hmr",
//         "transform-runtime",
//         ["import", { "libraryName": "antd-mobile", 'libraryDirectory': 'lib', "style": "css" }],
//       ]
//     },
//     "production": {
//       "extraBabelPlugins": [
//         "transform-runtime",
//         ["import", { "libraryName": "antd-mobile", "style": "css" }],
//       ]
//     }
//   },
//   "proxy": {
//     "/api": {
//       "target": "http://localhost:3001/",
//       "changeOrigin": true,
//       "pathRewrite": { "^/" : "" }
//     }
//   },
//   "svgSpriteLoaderDirs": svgSpriteDirs
// }

const path = require('path');
const pxtorem = require('postcss-pxtorem');

const svgSpriteDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg
  path.resolve(__dirname, 'src/assets/svg'),  // 业务代码本地私有 svg 存放目录
];

export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  env: {
    development: {
      extraBabelPlugins: [
        'dva-hmr',
        'transform-runtime',
        ['import', { 'libraryName': 'antd-mobile', 'libraryDirectory': 'lib', 'style': true }]
      ],
      extraPostCSSPlugins: [
        pxtorem({
          rootValue: 100,
          propWhiteList: [],
        }),
      ],
    },
    production: {
      extraBabelPlugins: [
        'transform-runtime',
        ['import', { 'libraryName': 'antd-mobile', 'libraryDirectory': 'lib', 'style': true }]
      ],
      extraPostCSSPlugins: [
        pxtorem({
          rootValue: 100,
          propWhiteList: [],
        }),
      ],
    }
  },
  "proxy": {
    "/api": {
      "target": "http://localhost:3002/",
      "changeOrigin": true,
      "pathRewrite": { "^/" : "" }
    }
  },
}
