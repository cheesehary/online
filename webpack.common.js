const path = require("path");
const cleanPlugin = require("clean-webpack-plugin");
const manifestPlugin = require("webpack-manifest-plugin");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");

module.exports = {
  entry: {
    home: path.resolve(__dirname, "public/home/index.ts"),
    app: path.resolve(__dirname, "public/app/index.tsx")
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/static/"
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    plugins: [new TsconfigPathsPlugin()]
  },
  plugins: [new cleanPlugin(["dist"]), new manifestPlugin()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "public/tsconfig.json"
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              module: {
                localIdentName: "[local]_[hash:base64:4]"
              },
              importLoaders: 1
            }
          },
          "less-loader"
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif|mp4)$/,
        use: [
          {
            loader: "url-loader",
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
    jquery: "jQuery",
    react: "React",
    "react-dom": "ReactDOM"
  }
};
