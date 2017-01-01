// Learn more on how to config.
// - https://github.com/ant-tool/atool-build#配置扩展

const webpack = require('atool-build/lib/webpack');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

module.exports = function (webpackConfig) {
  if (process.env.NODE_ENV !== 'production') {
    webpackConfig.debug = true;
    webpackConfig.devtool = 'inline-source-map';
  }
  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.module.loaders[0].query.plugins.push('transform-class-properties');
  webpackConfig.module.loaders[0].query.plugins.push('react-html-attrs');

  webpackConfig.babel.plugins.push(['antd', {
    style: 'css', // if true, use less
  }]);
  var ExtractTextPlugin = require('extract-text-webpack-plugin');

  //  下面的代码是为了兼容修改主色系
  webpackConfig.module.loaders.forEach(function (loader, index) {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.less$/;
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.less$/;
    }
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.css$/;
    }
    if (loader.test.toString() === '/\\.module\\.css$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.css$/;
    }
  });

  // Load src/entries/*.js as entry automatically.
  const files = glob.sync('./src/entries/*.js');
  const newEntries = files.reduce(function (memo, file) {
    const name = path.basename(file, '.js');
    memo[name] = file;
    return memo;
  }, {});
  webpackConfig.entry = Object.assign({}, webpackConfig.entry, newEntries);

  return webpackConfig;
};
