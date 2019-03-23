/*
*
*/
var app = angular.module('groceryApp', []);

app.controller("homeCtrl",["$scope", function($scope) {
  $scope.appTitle = "Grocery List";
}]);

app.controller("groceryListCtrl", ["$scope", function($scope) {
  $scope.groceryItems= [
    {completed: true, itemName: "milk", date:'2019-03-20'},
    {completed: true, itemName: "butter", date:'2019-03-17'},
    {completed: true, itemName: "olive oil", date:'2019-03-21'},
    {completed: true, itemName: "chocolate", date:'2019-03-15'}
  ]
}]);
