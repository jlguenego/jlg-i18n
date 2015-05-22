jlg-i18n
==========
Angular module for i18n, with pluarlization and interpolation, and locale update
without refreshing the Angular app.

This module brings the filter ```i18n```.

##Syntax

```html
<script src="path/to/angular.min.js"></script>
<script src="path/to/jlg-i18n.min.js"></script>
```


Translation files are json files like this:
```json
fr-fr.json:
{
	"Hello": "Bonjour",
	"How are you doing?": "Comment ça va ?",

	"You have [[nbr]] message(s) and [[err]] error(s)": {
		"@_@": "Vous avez [[nbr]] messages et [[err]] erreurs",
		"@_0": "Vous avez [[nbr]] messages et pas d'erreur",
		"@_1": "Vous avez [[nbr]] messages et 1 erreur",
		"0_@": "Vous n'avez pas de message et [[err]] erreurs",
		"0_0": "Vous n'avez pas de message et pas d'erreur",
		"0_1": "Vous n'avez pas de message et 1 erreur",
		"1_@": "Vous avez 1 message et [[err]] erreurs",
		"1_0": "Vous avez 1 message et pas d'erreur",
		"1_1": "Vous avez 1 message et 1 erreur"
	}
}



es-co.json:
{
	"Hello": "Hola",
	"How are you doing?": "Como esta?",

	"You have [[nbr]] message(s) and [[err]] error(s)": {
		"@_@": "Usted tiene [[nbr]] mensajes y [[err]] errores",
		"@_0": "Usted tiene [[nbr]] mensajes y ningún error",
		"@_1": "Usted tiene [[nbr]] mensajes y 1 error",
		"0_@": "No tiene mensajes y [[err]] errores",
		"0_0": "No tiene mensajes ni errores",
		"0_1": "No tiene mensajes y 1 error",
		"1_@": "Usted tiene 1 mensaje y [[err]] errores",
		"1_0": "Usted tiene 1 mensaje y ningún error",
		"1_1": "Usted tiene 1 mensaje y 1 error"
	}
}
```

To translate expression, use the angular filter ```i18n``` like this:

```html
{{'Hello' | i18n}},<br/>
{{'How are you doing?' | i18n}},<br/>
{{'You have [[nbr]] message(s) and [[err]] error(s)' | i18n:4:0 }}.<br/>
{{date | date:'fullDate'}}
```


To update the locale, use the ```jlgI18nService``` service included in the module ```jlgI18n``` like in the example.


##Example

```javascript
(function() {
	'use strict';

	var app = angular.module('myApp', ['jlgI18n']);

	app.config(['jlgI18nServiceProvider', function(jlgI18nServiceProvider) {
		// Set the locale directory of the jlg-i18n package. For instance:
		jlgI18nServiceProvider.localeDir('../../bower_components/jlg-i18n/locale');
	}]);

	app.controller('MyController', ['$scope', '$locale', 'jlgI18nService',
		function($scope, $locale, i18nService) {

			$scope.locale = $locale;

			$scope.changeLocale = i18nService.changeLocale;

		}
	]);
})();

```

```html
<html>
	<head>
	</head>

	<body ng-app="myApp" ng-controller="MyController">
		<h1>I18N</h1>
		<p>Locale: {{locale.id}}</p>
		<div>
			<label ng-repeat="id in ['en-us', 'fr-fr', 'es-co']">
				<input name="locale_id" type="radio"
					ng-click="changeLocale(id)"
					ng-checked="{{locale.id == id}}"/>
					{{id}}
			</label>
		</div>
		<p>
			{{'Hello' | i18n}},<br/>
			{{'You have [[nbr]] message(s) and [[err]] error(s)' | i18n:4:0 }}.<br/>
			{{'You have [[nbr]] message(s) and [[err]] error(s)' | i18n:1:1 }}.<br/>
			{{'You have [[nbr]] message(s) and [[err]] error(s)' | i18n:5:3 }}.<br/>
			{{date | date:'fullDate'}}
		</p>

		<script src="../../bower_components/angular/angular.min.js"></script>
		<script src="../../bower_components/jlg-i18n/jlg-i18n.min.js"></script>
		<script src="app.js"></script>
	</body>
</html>
```


##Installation

###Bower

[Bower](http://bower.io/) installs the minimum to run the library, not the test files.

```sh
bower install jlg-i18n
```

##Build

If you clone the Git repository, then you need **npm** to run the build.

```sh
npm install
npm run locale
grunt
```

##Issues

You can submit your issues on the
[Github system](https://github.com/jlguenego/jlg-i18n/issues).

##License

[MIT](http://opensource.org/licenses/MIT)

##Authors
- Yannis THOMIAS
- Juan TROCHEZ
- Jean-Louis GUÉNÉGO
