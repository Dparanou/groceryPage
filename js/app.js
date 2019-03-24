/*
*
*/
var app = angular.module('groceryApp', ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "views/groceryList.html",
    controller: "groceryListCtrl"
  })
  .when("/addItem",{
    templateUrl:"views/addItem.html",
    controller: "groceryListCtrl"
  })
  .when("/addItem/:id",{
    templateUrl:"views/addItem.html",
    controller: "groceryListCtrl"
  })
  .otherwise({
    redirectTo: "/"
  });
});

app.controller("homeCtrl",["$scope", function($scope) {
  $scope.appTitle = "Grocery List";
}]);

app.controller("groceryListCtrl", ["$scope","$routeParams", function($scope, $routeParams) {
  $scope.groceryItems= [
    {completed: true, itemName: "milk", date:'2019-03-20'},
    {completed: true, itemName: "butter", date:'2019-03-17'},
    {completed: true, itemName: "olive oil", date:'2019-03-21'},
    {completed: true, itemName: "chocolate", date:'2019-03-15'}
  ]

  $scope.rp = "Route parm " + $routeParams.id;
}]);
