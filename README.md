jlg-i18n
==========
Angular module for i18n, with pluralization, interpolation, and locale update
without refreshing the Angular app.

This project brings one Angular module ```jlgI18n``` with:

- the filter ```i18n```,
- the service ```jlgI18nService```,
- and its associated provider ```jlgI18nServiceProvider```



## Syntax

```html
<script src="path/to/angular.min.js"></script>
<script src="path/to/jlg-i18n.min.js"></script>
```


Translation files are json files like this:

fr-fr.json:
```json
{
	"Hello": "Bonjour",
	"How are you doing?": "Comment �a va ?",

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
```


es-co.json:
```json
{
	"Hello": "Hola",
	"How are you doing?": "Como esta?",

	"You have [[nbr]] message(s) and [[err]] error(s)": {
		"@_@": "Usted tiene [[nbr]] mensajes y [[err]] errores",
		"@_0": "Usted tiene [[nbr]] mensajes y ning�n error",
		"@_1": "Usted tiene [[nbr]] mensajes y 1 error",
		"0_@": "No tiene mensajes y [[err]] errores",
		"0_0": "No tiene mensajes ni errores",
		"0_1": "No tiene mensajes y 1 error",
		"1_@": "Usted tiene 1 mensaje y [[err]] errores",
		"1_0": "Usted tiene 1 mensaje y ning�n error",
		"1_1": "Usted tiene 1 mensaje y 1 error"
	}
}
```

Even for the original language you need a file for interpolation and pluralization purpose:

en-us.json:
```json
{
	"You have [[nbr]] message(s) and [[err]] error(s)": {
		"@_@": "You have [[nbr]] messages and [[err]] errors",
		"@_0": "You have [[nbr]] messages and no error",
		"@_1": "You have [[nbr]] messages and 1 error",
		"0_@": "You have no message and [[err]] error",
		"0_0": "You have no message and no error",
		"0_1": "You have no message and 1 error",
		"1_@": "You have 1 message and [[err]] errors",
		"1_0": "You have 1 message and no error",
		"1_1": "You have 1 message and 1 error"
	}
}
```

Translation files are stored in the ```i18n``` directory by default.

The provider ```jlgI18nServiceProvider``` can specify an other directory using the ```jlgI18nServiceProvider.i18nDir``` setter.

The provider ```jlgI18nServiceProvider``` can also specify a directory using the ```jlgI18nServiceProvider.localeDir``` setter
for the directory containing the locale files.

To translate expression, use the angular filter ```i18n``` like this:

```html
{{'Hello' | i18n}},<br/>
{{'How are you doing?' | i18n}},<br/>
{{'You have [[nbr]] message(s) and [[err]] error(s)' | i18n:4:0 }}.<br/>
{{'You have [[nbr]] message(s) and [[err]] error(s)' | i18n:1:1 }}.<br/>
{{'You have [[nbr]] message(s) and [[err]] error(s)' | i18n:5:3 }}.<br/>
{{date | date:'fullDate'}}
```

Output in French (fr-fr):
```
Bonjour,
Comment �a va ?
Vous avez 4 messages et pas d'erreur.
Vous avez 1 message et 1 erreur.
Vous avez 5 messages et 3 erreurs.
vendredi 22 mai 2015
```

Output in Spanish (Colombian) (es-co):
```
Hola,
Como esta?
Usted tiene 4 mensajes y ning�n error.
Usted tiene 1 mensaje y 1 error.
Usted tiene 5 mensajes y 3 errores.
viernes, 22 de mayo de 2015
```

Output in English (en-us):
```
Hello,
How are you doing?
You have 4 messages and no error.
You have 1 message and 1 error.
You have 5 messages and 3 errors.
Friday, May 22, 2015
```


To update the locale without refreshing, use the ```jlgI18nService``` service included in the module ```jlgI18n``` like in the example.


## Example

See the ```example``` directory on this github project.

app.js file:
```javascript
(function() {
	'use strict';

	var app = angular.module('myApp', ['jlgI18n']);

	app.config(['jlgI18nServiceProvider', function(jlgI18nServiceProvider) {
		// For browserify set the directory from the node_modules directory
		// jlgI18nServiceProvider.localeDir('../node_modules/jlg-i18n/locale');
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


```

index.html file:
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

		<script src="../bower_components/angular/angular.min.js"></script>
		<script src="../jlg-i18n.min.js"></script>
		<script src="app.js"></script>
	</body>
</html>

```


## Installation

### Bower

[Bower](http://bower.io/) installs the minimum to run the library, not the test files.

```sh
bower install jlg-i18n
```

### Npm (browserify)

[Npm](http://npmjs.org/) installs the minimum to run the library, not the test files.

```sh
npm install jlg-i18n
```

## Build

If you clone the Git repository, then you need **npm** to run the build.

```sh
npm install
npm run locale
grunt
```

## Issues

You can submit your issues on the
[Github system](https://github.com/jlguenego/jlg-i18n/issues).

## License

[MIT](http://opensource.org/licenses/MIT)

## Authors
- Yannis THOMIAS
- Juan TROCHEZ
- Jean-Louis GU�N�GO
