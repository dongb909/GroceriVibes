  var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'client', 'components', 'index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client', 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            // plugins: [
            //   'babel-plugin-styled-components'
            // ]
          }
        }
      }
    ]
  },
  mode: 'development' 
};