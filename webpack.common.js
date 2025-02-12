const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/index.html"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp3|wav)$/i,
        type: "asset/resource",
      },
      // Babel
      {
        test: /\.(?:js|mjs|cjs)$/,  // Match JavaScript files
        exclude: /node_modules/,  // Exclude the node_modules folder
        use: {
          loader: 'babel-loader',  // Use babel-loader
          options: {
            targets: "defaults",  // Set default browser targets
            presets: [
              ['@babel/preset-env'],  // Use the @babel/preset-env preset
            ],
          },
        },
      },
    ],
  },
};