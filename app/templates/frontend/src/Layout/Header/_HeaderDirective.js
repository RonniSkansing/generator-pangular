'use strict';

(function(app) {
	app.directive('paHeader', function() {
		return {
			templateUrl: 'src/Layout/Header/header.html'
		};
	});
}(angular.module('<%= appName %>')));