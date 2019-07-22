// const shouldLint = (!isDev || (!!LINT && LINT !== 'false')) && !NO_LINT;

export default {
  entry: './src/app.js',
  output: {
    path: '/dist/',
    filename: 'dva-wxapp.js',
    library: 'dva-wxapp',
    libraryTarget: 'umd',
  },
}
