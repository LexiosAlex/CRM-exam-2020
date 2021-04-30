const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const _env = dotenv.config({ path: path.resolve(__dirname, '../.env') });
const env = _env.parsed;
if (_env.error instanceof Error) {
  throw _env.error;
}
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.css', '.scss', '.sass'],
    plugins: [new TsconfigPathsPlugin({})],
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: env.DEV_SERVER_PORT || 3000,
    historyApiFallback: true,
    open: true,
  },
  devtool: 'inline-source-map',
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
          },
          {
            loader: 'file-loader',
            options: {
              name: isDevelopment ? '[name]__[contenthash].[ext]' : '[contenthash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: isDevelopment ? '[name]__[contenthash].[ext]' : '[contenthash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      firebaseApiKey: process.env.FIREBASE_API_KEY,
    }),
    new webpack.DefinePlugin(envKeys),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
    }),
  ],
};
