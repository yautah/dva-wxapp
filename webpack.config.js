var path = require('path')
var webpack = require('webpack')
var config = {}

function generateConfig(name) {
  var uglify = name.indexOf('min') > -1
  var config = {
    entry: './index.js',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: name + '.js',
      sourceMapFilename: name + '.map',
      library: 'dva-wxapp',
      libraryTarget: 'umd',
    },
    node: {
      process: false,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: /src/,
          use: ['babel-loader'].filter(Boolean),
        },
      ],
    },

    // devtool: 'source-map',
  }

  config.plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ]

  // if (uglify) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        // dropLogger: true,
      },
    }),
  )
  // }

  return config
}

config = generateConfig('dva-wxapp')
module.exports = config
