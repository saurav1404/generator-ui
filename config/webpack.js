const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (env, argv) => {

  const isProduction = argv.mode === 'production';

  return {
    entry: {
      app: path.resolve(__dirname, '../src/app/index.tsx')
    },
    resolve: {
      extensions: ['.js', 'jsx', '.ts', '.tsx'],
      modules: [
        path.resolve(__dirname, '../src'),
        'node_modules'
      ]
    },
    output: {
      publicPath: '/',
      filename: '[name]-[hash:8].js',
      path: path.resolve(__dirname, '../dist'),
    },
    optimization: {
      splitChunks: {
        automaticNameDelimiter: '-',
        cacheGroups: {
          dependencies: {
            test: /[\\/]node_modules[\\/]/,
            name: 'dependencies',
            chunks: 'all'
          }
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            plugins: [
              ['import', { libraryName: 'antd', style: true }],
            ],
          },
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          options: {
            // Config file is relative to entry (index.tsx)
            configFile: '../../config/webpack.tsconfig.json',
            logLevel: 'info',
            transpileOnly: true
          },
        },
        {
          test: /\.(jpe?g|png|gif|woff|ico|woff2|less|eot|ttf|otf|svg)(\?[a-z0-9=.]+)?$/,
          loader: 'url-loader?limit=100000',
          options: {
            plugins: [
                ['import', { libraryName: 'antd', style: true }],
            ],
          },
        },
        {
          test: /\.css$/,
          loader: ['style-loader', 'css-loader', 'sass-loader'],
        }
      ],
    },
    plugins: require("./webpack.plugins").plugins(isProduction),
    devtool: 'source-map',
    devServer: isProduction ? undefined : require("./webpack.devserver").devServer()
  }
};
