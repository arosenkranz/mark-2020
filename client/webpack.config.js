const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
    mobile: './src/mobile.js'
  },
  devtool: 'inline-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Mark Conference',
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: path.resolve(__dirname, 'dist/index.html'),
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      title: 'Mark Conference // Leave Your Mark',
      template: path.resolve(__dirname, 'src/templates/mark.html'),
      chunks: ['mobile'],
      filename: path.resolve(__dirname, 'dist/mobile.html')
    })
  ],
  devServer: {
    hot: true,
    contentBase: './dist',
    port: 3000
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3001',
    //     pathRewrite: { '^/api': '' }
    //   }
    // }
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif|fbx|FBX|obj)$/,
        use: ['file-loader']
      }
    ]
  }
};
