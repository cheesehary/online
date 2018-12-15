const path = require('path');
const cleanPlugin = require('clean-webpack-plugin');
const manifestPlugin = require('webpack-manifest-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: {
    home: path.join(__dirname, 'src/public/home/index.ts'),
    app: path.join(__dirname, 'src/public/app/index.tsx')
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.join(__dirname, 'dist/public'),
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin()]
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
