/*
*
*/
var app = angular.module("groceryApp", ["ngRoute", "groceryAppModule"]);

app.controller("homeCtrl", function($scope) {
  $scope.appTitle = "Grocery List";
})

app.controller("grCtrl", function($scope) {
  $scope.groceryList = [
    {completed: true, itemName:'milk', date:'2019-03-20'},
    {completed: true, itemName:'butter', date:'2019-03-17'},
    {completed: true, itemName:'olive oil', date:'2019-03-21'},
    {completed: true, itemName:'chocolate', date:'2019-03-15'}
  ];
})
/*app.config(function($routeProvider) {
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
*/
