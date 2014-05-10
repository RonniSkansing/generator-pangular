'use strict';

(function(app) {
	app.controller('ExampleController', ['$log', function($log) {
		$log.info('ExampleController loaded');
	}]);
}(angular.module('<%= appName %>')));