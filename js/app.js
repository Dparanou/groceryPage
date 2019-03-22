/*
*
*/
var app = angular.module('groceryApp', ['ngRoute', 'groceryAppModule'])

.config(function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "views/first.html",
        controller: "tutorialCtrl"
      })
      .when("/second", {
        templateUrl:"views/second.html",
        controller: "tutorialCtrl2"
      })
      .otherwise({
        redirectTo:"/"
      });
});
