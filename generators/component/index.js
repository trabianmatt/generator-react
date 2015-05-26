var generators = require('yeoman-generator');
var selectn = require('selectn');
var path = require('path');
var _ = require('lodash');

module.exports = generators.NamedBase.extend({

  initializing: function() {

    var webpackPath = this.destinationPath('webpack.config.js');

    var pathAndName = this.name.match(/(.*)\/*\/(.*)$/);

    if (pathAndName) {
      this.state = {
        path: pathAndName[1],
        name: pathAndName[2]
      };
    } else {
      this.state = {
        path: '',
        name: this.name
      };
    }

    if (webpackPath) {

      var webpackConfig = require(webpackPath);

      this.state.componentsRoot = selectn('resolve.alias.components', webpackConfig);
      this.state.fixturesRoot = selectn('resolve.alias.fixtures', webpackConfig);

    }

    this.state.componentPath = path.join(this.state.componentsRoot, this.state.path);

  },

  prompting: function() {

    var done = this.async();

    var fixturesChoice;

    if (this.state.fixturesRoot) {
      fixturesChoice = {
        name: 'Fixtures',
        value: 'includeFixtures',
        checked: true
      };
    }

    var choices = _.compact([
      {
        name: 'Styles',
        value: 'includeStyles',
        checked: true
      }, fixturesChoice]);

    this.prompt({
      type: 'checkbox',
      choices: choices,
      name: 'features',
      message: 'Choose features:'
    }, function(answers) {
      this.state.includeStyles = _.contains(answers.features, 'includeStyles');
      this.state.includeFixtures = _.contains(answers.features, 'includeFixtures');
      done();
    }.bind(this));

  },

  writing: {

    createComponent: function() {

      var componentFile = path.join(this.state.componentPath, this.state.name + '.jsx');

      var template;

      if (this.state.includeStyles) {
        template = 'componentWithStyles.jsx';
      } else {
        template = 'component.jsx';
      }

      this.fs.copyTpl(
        this.templatePath(template),
        this.destinationPath(componentFile),
        {
          name: this.state.name
        }
      );

    },

    createStyles: function() {

      if (this.state.includeStyles) {

        var cssFile = path.join(this.state.componentPath, this.state.name + '.css');

        this.fs.copyTpl(
          this.templatePath('styles.css'),
          this.destinationPath(cssFile),
          {}
        );

      }

    },

    createFixture: function() {

      if (this.state.includeFixtures) {

        var fixtureFile = path.join(this.state.fixturesRoot, this.state.path, this.state.name, 'default.js');

        this.fs.copyTpl(
          this.templatePath('fixture.js'),
          this.destinationPath(fixtureFile),
          {}
        );

      }

    }

  }

});
