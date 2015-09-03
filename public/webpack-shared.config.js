
console.log('__dirname' + __dirname);

var path              = require('path');
var nodeModulesDir    = path.resolve(__dirname, '../node_modules');
console.log('nodeModulesDir: ' + nodeModulesDir);

var _                 = require('./public/js/underscore'),
    webpack           = require('webpack');

module.exports = function(overrides) {
  var merged = _.merge({
    entry: {
      'index': './public/js/index', // start page
    },
    output: {
      path: path.resolve(__dirname, '..', 'build', 'public'),
      filename: './public/js/[name].js',
      sourceMapFilename: '[file].map',
      chunkFilename: "[id].js",
      publicPath: '/'
    },
    devtool: 'source-map',
    eslint: {
      configFile: 'js/.eslintrc'
    },
    module: {
      // load logary-js source maps into published source maps
      preLoaders: [
        {
          test: /(logary\..+|client)\.js$/,
          loader: "source-map-loader"
        }
      ],
      loaders: [
        { test: /\.js$/,
          loader: 'babel',
          query: {
            cacheDirectory: true,
            optional: ['runtime'],
            stage: 0
          },
          exclude: /node_modules|bower_components/
        },
        { test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules|bower_components|tests/ },
        { test: /\.json$/, loader: 'json-loader', exclude: /node_modules|bower_components/ },
        { test: /\.css$/, loader: "style-loader!css-loader" },
        { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
        { test: /\.(png|jpg|jpeg|gif|woff)$/, loader: 'url-loader?limit=8192' },
        { test: /\.(otf|eot|ttf)$/, loader: "file-loader?prefix=font/" },
        { test: /\.svg$/, loader: "file-loader" },
      ]
    }
  }, overrides);
  //throw JSON.stringify(merged);
  return merged;
};
