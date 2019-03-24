/*
*
*/
var app = angular.module('groceryApp', ["ngRoute"]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider
  .when("/", {
    templateUrl: "views/groceryList.html",
    controller: "homeCtrl"
  })
  .when("/addItem",{
    templateUrl:"views/addItem.html",
    controller: "groceryListCtrl"
  })
  .when("/addItem/edit/:id/",{
    templateUrl:"views/addItem.html",
    controller: "groceryListCtrl"
  })
  .otherwise({
    redirectTo: "/"
  });
}]);

app.service("GroceryService", function() {
  var groceryService = {};

  groceryService.groceryItems= [
    {id: 1, completed: false, itemName: "milk", date: new Date("April 2, 2019 11:12:00")},
    {id: 2, completed: false, itemName: "butter", date: new Date("April 1, 2019 12:12:00")},
    {id: 3, completed: false, itemName: "olive oil", date: new Date("April 2, 2019 20:12:00")},
    {id: 4, completed: false, itemName: "chocolate", date: new Date("April 3, 2019 11:15:00")}
  ];

  groceryService.findById = function (id) {
    for(var item in groceryService.groceryItems) {
      if(groceryService.groceryItems[item].id === id) {
        return groceryService.groceryItems[item];
      }
    }
  };

  groceryService.getNewId = function() {
    if(groceryService.newId) {
      groceryService.newId++;
      return groceryService.newId;
    }
    else {
      var maxId = _.max(groceryService.groceryItems, function(entry) {return entry.id; });
      groceryService.newId = maxId.id + 1;
      return groceryService.newId;
    }
  };

  groceryService.save = function(entry) {

    var updatedItem = groceryService.findById(entry.id);

    if(updatedItem) {
      updatedItem.completed = entry.completed;
      updatedItem.itemName = entry.itemName;
      updatedItem.date = entry.date;
    }
    else {
      entry.id = groceryService.getNewId();
      groceryService.groceryItems.push(entry);
    }
  };

  groceryService.removeItem = function(entry) {
    var index = groceryService.groceryItems.indexOf(entry);

    groceryService.groceryItems.splice(index, 1);
  };

  groceryService.checked = function(entry) {
    entry.completed = !entry.completed;
  };

  return groceryService;
});

app.controller("homeCtrl",["$scope", "GroceryService", function($scope, GroceryService) {

  $scope.groceryItems = GroceryService.groceryItems;
  console.log($scope.groceryItems);

  $scope.removeItem = function(entry) {
    GroceryService.removeItem(entry);
  };

  $scope.checked = function(entry) {
    GroceryService.checked(entry);
  };

}]);

app.controller("groceryListCtrl", ["$scope","$routeParams", "$location", "GroceryService", function($scope, $routeParams, $location, GroceryService) {

  if(!$routeParams.id) {
    $scope.groceryItem =  {id: 0, completed: false, itemName: "", date:new Date() };
  }
  else {
      $scope.groceryItem =_.clone(GroceryService.findById(parseInt($routeParams.id)));
  }

  $scope.save = function() {
    GroceryService.save( $scope.groceryItem );
    $location.path("/");
  };

}]);

app.directive("liGroceryItem", function() {
  return {
    restrict : "E",
    templateUrl: "views/groceryItem.html"
  };
});
