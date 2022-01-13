'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var esbuild_webpack_plugin_1 = require('esbuild-webpack-plugin');
var plugin = function (_a) {
  var onGetWebpackConfig = _a.onGetWebpackConfig,
    context = _a.context;
  var command = context.command;
  onGetWebpackConfig(function (config) {
    if (command !== 'build') return;
    if (config.optimization.minimizers.has('TerserPlugin')) {
      config.optimization.minimizers.delete('TerserPlugin');
    }
    config.optimization.minimizer('ESBuild').use(esbuild_webpack_plugin_1.default, [{}]);
  });
};
exports.default = plugin;
