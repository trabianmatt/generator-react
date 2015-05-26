// Including a module to make sure we can still access the config from
// the generator.
var babelLoader = require('babel-loader');

module.exports = {
  resolve: {
    alias: {
      components: 'out/src/components',
      fixtures: 'out/demo/fixtures'
    }
  }
};
