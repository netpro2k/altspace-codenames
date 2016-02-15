module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel']
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }
  ]},
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
    alias: {
      'altspace': __dirname + '/node_modules/altspace/dist/altspace.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
}
