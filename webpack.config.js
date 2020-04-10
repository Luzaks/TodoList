const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'To-Do List',
    }),
  ],

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
};