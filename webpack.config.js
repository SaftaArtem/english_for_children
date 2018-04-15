let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");



let conf = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: 'dist/'
  },
  devServer: {
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // exclude: '/node_modules/'  
      },
      {
        test: /\.(s*)css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        })
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000, // Convert images < 8kb to base64 strings
            name: 'images/[hash]-[name].[ext]'
          }
        }]
      }

    ]
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'main.css' }),
  ]
};
module.exports = (env, options) => {
  let production = options.mode === 'production';
  conf.devtool = production 
                    ? false
                    : 'eval-sourcemap';
  return conf; 
} 
