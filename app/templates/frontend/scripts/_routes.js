'use strict';

(function(app){
  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'src/Example/example.html',
        controller: 'ExampleController'
      })
      .when('/about', {
        templateUrl: 'src/About/about.html',
        controller: 'AboutController'
      })

      // redirect to frontpage
      .otherwise({
        redirectTo: '/'
      });
  }]);
})(angular.module('<%= appName %>'));