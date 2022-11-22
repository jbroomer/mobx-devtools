const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: false,
  entry: path.join(__dirname, 'src'),
  output: {
    libraryTarget: 'umd',
    library: 'mobxDevtoolsMST',
    path: path.join(__dirname, '/lib'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{ 
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              "@babel/plugin-transform-runtime",
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }],
        exclude: /node_modules/
      },
    ],
  },
  externals: {
    'mobx-state-tree': {
      root: 'mobxStateTree',
      commonjs: 'mobx-state-tree',
      commonjs2: 'mobx-state-tree',
      amd: 'mobx-state-tree',
    },
    mobx: 'mobx',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
      __DEBUG_CONNECTION__: JSON.stringify(process.env.DEBUG_CONNECTION === 'true'),
      __TARGET__: JSON.stringify('browser'),
    }),
    // new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
  ],
};
