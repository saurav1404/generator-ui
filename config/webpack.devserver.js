const path = require('path');

module.exports = {
  devServer
};

function devServer() {
  return {
    contentBase: path.join(__dirname, '../public'),
    hot: true,
    open: false,
    historyApiFallback: true,
  };
}
