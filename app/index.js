'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var pangularGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    this.log(chalk.magenta('PHP and AngularJS.. abit more? Here you go.'));

    var prompts = [{
      name: 'appName',
      message: 'Enter the name of your project.'
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;

      done();
    }.bind(this));
  },

  meta: function() {
    this.copy('gitignore', '.gitignore');
    this.copy('editorconfig', '.editorconfig');
    this.copy('Gruntfile.js', 'Gruntfile.js');
  },

  backend: function () {
    // composer
    this.copy('backend/_composer.json', 'composer.json');

    // app
    this.mkdir('backend');
    this.mkdir('backend/app');
    this.copy('backend/app/_bootstrap.php',
              'backend/app/bootstrap.php');
    this.copy('backend/app/_routes.php',
              'backend/app/routes.php');

    this.mkdir('backend/src');
    this.mkdir('backend/src/' + this.appName);
    this.copy('backend/src/_Example.php',
              'backend/src/' + this.appName + '/Example.php');

  },

  frontend: function () {

    // root for frontend
    this.mkdir('frontend');

    this.copy('frontend/htaccess', 'frontend/.htaccess');
    // @todo favicon

    // meta files / dependencies
    this.copy('frontend/_bower.json', 'bower.json');
    this.copy('frontend/bowerrc', '.bowerrc');
    this.copy('frontend/jshintrc', '.jshintrc');
    this.copy('frontend/_package.json', 'package.json');

    // php api frontal controller
    this.mkdir('frontend/api');
    this.copy('frontend/api/index.php',
              'frontend/api/index.php');

    // perhaps move images inside modules
    this.mkdir('frontend/images');

    // primary script loaded after bower dependencies
    // but before all script in frontend module is auto included
    this.mkdir('frontend/scripts');
    this.copy('frontend/scripts/_app.js',
              'frontend/scripts/app.js');
    this.copy('frontend/scripts/_routes.js',
              'frontend/scripts/routes.js');

    // example module files
    this.mkdir('frontend/src/Layout');
    this.mkdir('frontend/src/Layout/Header');
    this.copy('frontend/src/Layout/Header/header.html',
              'frontend/src/Layout/Header/header.html');
    this.copy('frontend/src/Layout/Header/header.less',
              'frontend/src/Layout/Header/header.less');
    this.copy('frontend/src/Layout/Header/_HeaderDirective.js',
              'frontend/src/Layout/Header/HeaderDirective.js');

    this.mkdir('frontend/src/Example');
    this.copy('frontend/src/Example/example.html',
              'frontend/src/Example/example.html');
    this.copy('frontend/src/Example/example.less',
              'frontend/src/Example/example.less');
    this.copy('frontend/src/Example/_ExampleController.js',
              'frontend/src/Example/ExampleController.js');

    this.mkdir('frontend/src/About');
    this.copy('frontend/src/About/about.html',
              'frontend/src/About/about.html');
    this.copy('frontend/src/About/about.less',
              'frontend/src/About/about.less');
    this.copy('frontend/src/About/_AboutController.js',
              'frontend/src/About/AboutController.js');

    // grunt-php bug walk around
    this.copy('frontend/index.php',
              'frontend/index.php');

    // index template file
    this.copy('frontend/_index.tpl.html',
              'frontend/index.tpl.html');
  }
});

module.exports = pangularGenerator;