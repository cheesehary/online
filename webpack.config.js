const path = require('path');
const cleanPlugin = require('clean-webpack-plugin');
const manifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  mode: 'development',
  entry: {
    home: path.join(__dirname, 'src/public/home/index.ts'),
    app: path.join(__dirname, 'src/public/app/index.tsx')
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.join(__dirname, 'dist/public'),
    publicPath: '/static/'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@Constants': path.join(__dirname, 'src/util/constants.ts'),
      '@Models': path.join(__dirname, 'src/models/')
    }
  },
  plugins: [new cleanPlugin(['dist']), new manifestPlugin()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['awesome-typescript-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif|mp4)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2000
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    jquery: 'jQuery',
    react: 'React',
    'react-dom': 'ReactDOM'
  }
};
