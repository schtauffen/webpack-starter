const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
  output: {
    publicPath: '/public/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'src')],
        use: ['babel-loader']
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: process.env.NODE_ENV === 'production'
                  ? '[hash:base64]'
                  : '[path][name]__[local]--[hash:base64:5]'
              }
            },
            'stylus-loader'
          ]
        })
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx']
  },
  // TODO - are these still necessary in 4.0 ?
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new ExtractTextPlugin('main.css'),
    new webpack.optimize.ModuleConcatenationPlugin()
    // optimize: comparisons: false, warnings: false ?
  ]
}

module.exports = config
