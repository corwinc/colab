var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'client/public');
var APP_DIR = path.resolve(__dirname, 'client/app');

var config = {
  devtool: 'inline-source-map',
  // entry: [
  //   'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
  //   'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
  //   './app' // Your appʼs entry point
  // ],
  entry: APP_DIR + '/app.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  // resolve: {
  //   modulesDirectories: ['node_modules', 'app'],
  //   extensions: ['', '.js']
  // },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        //include : APP_DIR,
        exclude: /node_modules/,
        loader: 'babel',
        //loaders : ['react-hot-loader/webpack', 'babel?presets[]=react,presets[]=es2015'],
        query: {
        	presets:['es2015','react']
        }
      }
    ]
  }
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.NoErrorsPlugin()
  // ] 
};

module.exports = config;
