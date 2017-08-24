
import { resolve } from 'path';
import { DefinePlugin, EnvironmentPlugin, optimize } from 'webpack';
import WXAppWebpackPlugin from 'wxapp-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const { NODE_ENV, LINT, NO_LINT } = process.env;
const isDev = NODE_ENV !== 'production';
const shouldLint = true;
// const shouldLint = (!isDev || (!!LINT && LINT !== 'false')) && !NO_LINT;

export default {
  entry: {

    app: [
      `es6-promise/dist/es6-promise.auto${isDev ? '.min' : ''}.js`,
      './src/utils/bomPolyfill.js',
      './src/app.js',
    ],
  },

  output: {
    filename: '[name].js',
    publicPath: '/',
    path: isDev ? resolve('build') : resolve('dist'),
  },

  module: {
    rules: [

      {
        test: /\.js$/,
        include: /src/,
        use: [
          'babel-loader',
          shouldLint && 'eslint-loader',
        ].filter(Boolean),
      },

      {
        test: /\.json$/,
        include: /src/,
        use: [
          {
            loader: 'file-loader',
            options: {
              useRelativePath: true,
              name: '[name].[ext]',
            },
          },
        ],
      },
      // {
        // test: /\.(png|jpg|gif)$/,
        // include: /src/,
        // loader: 'file-loader',
        // options: {
          // name: '/[name]_[hash:7].[ext]',
          // outputPath: 'images',
        // }
      // },
      {
				test: /\.scss$/,
				include: /src/,
				use: [
					{
						loader: 'file-loader',
						options: {
							useRelativePath: true,
							name: '[name].wxss',
						}
					},
					{
						loader: 'sass-loader',
						options: {
							includePaths: [
								resolve('src', 'styles'),
								resolve('src'),
							],
						},
					},
				],
			},
      {
        test: /\.wxss/,
        include: /src/,
        use: [
          {
            loader: 'file-loader',
            options: {
              useRelativePath: true,
              name: '[name].wxss',
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                resolve('src'),
              ],
            },
          },
        ],
      },

      // {
      // test: /\.wxss$/,
      // include: /src/,
      // use: [
      // {
      // loader: 'file-loader',
      // options: {
      // useRelativePath: true,
      // name: '[name].wxss',
      // }
      // },
      // ],
      // },

      {
        test: /\.wxml$/,
        include: resolve('src'),
        use: [
          {
            loader: 'file-loader',
            options: {
              context: 'src/',
              name: '[path][name].[ext]',
            }
          },
          {
            loader: 'wxml-loader',
            options: {
              root: resolve('src'),
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new DefinePlugin({
      __DEV__: isDev,
    }),
    new WXAppWebpackPlugin(),
    new optimize.ModuleConcatenationPlugin(),
    new CopyWebpackPlugin([
      { from: './src/app.json', to: 'app.json' },
      { from: './src/ext.json', to: 'ext.json' },
      { from: './src/images', to: 'images' },
      // { from: '**/*.wxss', to: '', context: 'src/' },
    ]),
  ].filter(Boolean),

  devtool: isDev ? 'source-map' : false,

  resolve: {
    modules: [resolve(__dirname, 'src'), 'node_modules'],
  },

  watchOptions: {
    ignored: /build|manifest/,
    aggregateTimeout: 300,
  },
};
