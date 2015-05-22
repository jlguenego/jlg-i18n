(function() {
	'use strict';

	var app = angular.module('myApp', ['jlgI18n']);

	app.config(['jlgI18nServiceProvider', function(jlgI18nServiceProvider) {
		jlgI18nServiceProvider.localeDir('../locale');
	}]);

	app.controller('MyController', ['$scope', '$locale', 'jlgI18nService',
		function($scope, $locale, i18nService) {
			$scope.date = new Date();

			$scope.locale = $locale;

			$scope.changeLocale = i18nService.changeLocale;

		}
	]);
})();
