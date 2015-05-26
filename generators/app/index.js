var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  warn: function() {
    console.warn('The default generator for react-generator is currently empty. Check out the subgenerators.');
    this.config.save();
  }
});
