const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

// TODO - public vs dist ...
const config = {
  output: {
    publicPath: '/public/'
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
      },
      {
        test: /\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '/public/media/',
            outputPath: 'media'
          }
        }
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, 'dist')),
    // TODO - are these still necessary in 4.0 ?
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new ExtractTextPlugin('main.css'),
    new webpack.optimize.ModuleConcatenationPlugin()
    // optimize: comparisons: false, warnings: false ?
  ]
}

module.exports = config
