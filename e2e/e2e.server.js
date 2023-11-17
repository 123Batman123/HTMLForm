const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.dev.js');

const compiler = Webpack(webpackConfig);
const devServerOptions = { ...webpackConfig.devServer, port: 9000, open: true };
const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  console.log('Starting server...');
  await server.start();

  if (process.send) {
    process.send('ok');
  }
};

runServer();