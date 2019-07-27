const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    devServer: {
      contentBase: './docs'
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'docs')
    },
    module: {
        rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        }
      ]
    }
    
};