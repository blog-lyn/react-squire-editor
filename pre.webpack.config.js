
module.exports = function (webpackConfig) {
  const path = require('path');
  const webpack = require('webpack');
  const config = {
    entry: path.resolve(__dirname, './src/components/Editor.jsx'),
    output: {
      path: path.resolve(__dirname, './lib'),
      library: 'react-squire-editor',
      libraryTarget: 'umd',
      filename: 'editor.min.js',
    },
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
    ],
    resolve: {
      extensions: ['', '.js', '.jsx'],
    },
    module: {
      noParse: [],
      loaders: [
        {
          test: /\.js$|\.jsx$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015', 'react', 'stage-1'],
          },
        },
        {
          test: /\.css$/,
          loader: 'style!css?modules&localIdentName=[local]-[hash:base64:5]',
        },
      ],
    },
    externals: {
      'react': 'umd react',
      'react-dom': 'umd react-dom',
      'antd': 'umd antd',
    },
  };
  return config;
};

