(function() {
	'use strict';

	var app = angular.module('jlgI18n', ['ngLocale', 'ngResource']);

	app.run(['$filter', function($filter) {
		$filter('date').$stateful = true;
	}]);

	app.provider('jlgI18nService', ['$locale', '$resource',
		function($locale, $resource) {

			var localeDir = 'bower_components/jlg-i18n/locale';
			this.localeDir = function(value) {
				if (value != undefined) {
					localeDir = value;
				}
				return localeDir;
			};

			var i18nDir = 'i18n';

			this.i18nDir = function(value) {
				if (value != undefined) {
					i18nDir = value;
				}
				return i18nDir;
			};

			this.$get = ['$locale', '$resource', function($locale, $resource) {

				var i18nRes = $resource(i18nDir + '/:locale.json');
				var localeRes = $resource(localeDir + '/locale_:locale.json');

				var result = {};
				result.refresh = function() {
					console.log('start');
					this.translation = i18nRes.get({locale: $locale.id});

					var newLocale = localeRes.get({locale: $locale.id}, function(newLocale) {
						for (var property in newLocale) {
							if ($locale.hasOwnProperty(property)) {
								console.log(property);
								$locale[property] = newLocale[property];
							}
						}
					});
				};

				result.refresh();

				return result;
			}];
		}
	]);

	app.filter('i18n', ['jlgI18nService', function(jlgI18nService) {
		var filter = function(text) {
			var result = text;
			var args = Array.prototype.slice.call(arguments, 1);
			var translation = jlgI18nService.translation;
			console.log(translation);

			if (translation.hasOwnProperty(text)) {
				result = translation[text];
			}

			var getKeys = function() {
				var res = [];
				for (var i = 0; i < Math.pow(2, args.length); i++) {
					var a = [];
					for (var j = 0; j < args.length; j++) {
						// jshint bitwise:false
						var isNotProvided = i & Math.pow(2, j);

						// jshint ignore:line
						if (isNotProvided) {
							a.push('@');
						} else {
							a.push(args[j]);
						}
					}
					res.push(a.join('_'));
				}
				return res;
			};

			var selectedKey = Array.apply(null, new Array(args.length))
								.map(function() { return '@'; })
								.join('_');

			// Pluralization
			if (typeof result === 'object') {
				var keys = getKeys();
				var found = false;
				for (var i = 0; i < keys.length; i++) {
					if (result.hasOwnProperty(keys[i])) {
						selectedKey = keys[i];
						result = result[selectedKey];
						found = true;
						break;
					}
				}
				if (!found) {
					result = text;
				}
			}

			// Interpolation
			var a = selectedKey.split('_');
			for (var i = 0; i < args.length; i++) { // jshint ignore:line
				if (a[i] === '@') {
					result = result.replace(/\[\[.*?\]\]/, args[i]);
				}
			}

			return result;
		};
		filter.$stateful = true;
		return filter;
	}]);
})();
