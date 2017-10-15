const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development';
const mode = NODE_ENV === 'development' ? 'dev' : 'dev';


// Create multiple instances
const extractSCSS = new ExtractTextPlugin('app.css');
const extractCSS = new ExtractTextPlugin('vendor.css');

module.exports = {
  devtool: 'source-map',
  entry: {
    // styles: path.join(__dirname, 'src', 'client', 'assets', 'scss', 'main.scss'),
    // styles: path.join(__dirname, 'node_modules', 'react-dates', 'lib', 'css', '_datepicker.css'),
    main: path.join(__dirname, 'src', 'client', `index.${mode}`),
  },
  plugins: [
    extractCSS,
    extractSCSS,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks(module) {
        const context = module.context;
        return context && context.indexOf('node_modules') >= 0;
      },
    }),
    new webpack.IgnorePlugin(/\.\/locale$/),    
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/',
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      moment$: 'moment/moment.js',
    },
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './public',
    port: 9001,
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
  module: {
    rules: [
      // less
      {
        test: /\.css$/, 
        use: extractCSS.extract(['css-loader']),
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /\.scss$/,
        use: extractSCSS.extract(['css-loader', 'sass-loader']),
      },
      // JS/TS
      // { test: /\.jsx?$/, use: [{ loader: 'babel-loader' }] },
      { test: /\.tsx?$/, use: [{ loader: 'ts-loader' }] },
      // images
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: { limit: 10240 },
        }],
      },
      // Font
      {
        test: /\.svg(\?[a-z0-9=&.]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 65000, mimetype: 'image/svg+xml' },
          },
        ],
      },
      {
        test: /\.woff(\?[a-z0-9=&.]+)?$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 65000, mimetype: 'application/font-woff' },
        }],
      },
      {
        test: /\.woff2(\?[a-z0-9=&.]+)?$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 65000, mimetype: 'application/font-woff2' },
        }],
      },
      {
        test: /\.[ot]tf(\?[a-z0-9=&.]+)?$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 65000, mimetype: 'application/octet-stream' },
        }],
      },
      {
        test: /\.eot(\?[a-z0-9=&.]+)?$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 65000, mimetype: 'application/vnd.ms-fontobject' },
        }],
      },
    ],
  },
};
