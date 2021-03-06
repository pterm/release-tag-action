/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  target: 'node',
  mode: 'production',

  entry: {
    index: './src/index.ts',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    mainFields: ['main'],
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'main',
    libraryTarget: 'commonjs2',
  },

  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: true,
          },
        },
        sourceMap: true,
        extractComments: false,
      }),
    ],
  },

  plugins: [new webpack.IgnorePlugin(/\/iconv-loader$/)],
};
