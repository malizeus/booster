'use strict';

const config = require('./server/config');
const path = require('path');

module.exports = {
  transpileDependencies: ['vuetify'],
  outputDir: path.resolve(__dirname, './dist'),
  devServer: {
    // Override using: `npm run dev:client -- --port <number>`
    port: config.reverseProxyPort,
    proxy: {
      '/api': {
        target: `http://${config.ip}:${config.port}`
      }
    }
  },
  pages: {
    index: {
      entry: './client/main.js',
      template: 'public/index.html',
      title: 'Booster',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  runtimeCompiler: true,
  pluginOptions: {
    envs: {
      API_PATH: config.apiPath,
      AUTH_JWT_SCHEME: config.auth.scheme
    }
  },
  chainWebpack: config => {
    config
      .entry('app')
      .clear()
      .add('./client/main.js')
      .end();
    config.resolve.alias
      .set('@', path.join(__dirname, './client'));
  }
};
