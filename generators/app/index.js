var generators = require('yeoman-generator');

module.exports = generators.Base.extend({

  initializing: function() {
    this.state = {};
  },

  prompting: {

    askAboutCosmos: function() {

      var done = this.async();

      this.prompt({
        type    : 'confirm',
        name    : 'includeCosmos',
        message : 'Would you like to include cosmos?',
        default : true
      }, function (props) {
        this.state.includeCosmos = props.includeCosmos;
        done();
      }.bind(this));

    }

  },

  writing: function() {

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        appname: this.appname
      }
    );

    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      {
        includeCosmos: this.state.includeCosmos
      }
    );

    this.fs.copyTpl(
      this.templatePath('index.jsx'),
      this.destinationPath('src/index.jsx')
    );

    this.fs.copyTpl(
      this.templatePath('App.jsx'),
      this.destinationPath('src/containers/App.jsx')
    );

    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    );

    this.fs.copyTpl(
      this.templatePath('.eslintrc'),
      this.destinationPath('.eslintrc')
    );

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('build/index.html'),
      {
        appname: this.appname
      }
    );

    if (this.state.includeCosmos) {
      this.fs.copyTpl(
        this.templatePath('playground.html'),
        this.destinationPath('build/playground.html')
      );
    }

  },

  install: function() {

    this.npmInstall([
      'react',
      'redux',
      'react-router'
    ], { save: true });

    this.npmInstall([
      'autoprefixer-core',
      'babel-core',
      'babel-loader',
      'css-loader',
      'eslint',
      'eslint-loader',
      'postcss-calc',
      'postcss-color-function',
      'postcss-import',
      'postcss-loader',
      'postcss-nested',
      'postcss-simple-vars',
      'react-hot-loader',
      'style-loader',
      'webpack',
      'webpack-dev-server'
    ], { saveDev: true });

    if (this.state.includeCosmos) {
      this.npmInstall([
        'cosmos-js'
      ], { saveDev: true });
    }

  }

});
