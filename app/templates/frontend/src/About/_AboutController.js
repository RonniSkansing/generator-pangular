'use strict';

(function(app){
	app.controller('AboutController', ['$log', function($log) {
		$log.info('AboutController loaded');
	}]);
}(angular.module('<%= appName %>')))