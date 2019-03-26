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

app.service("GroceryService", function($http) {
  var groceryService = {};

  groceryService.groceryItems= [];

  $http({
    method: 'GET',
    url: 'server_data.json'
  }).then(function(response) {
      groceryService.groceryItems = response.data;

      for(var x in groceryService.groceryItems) {
        groceryService.groceryItems[x].date = new Date(groceryService.groceryItems[x].date);
        console.log(groceryService.groceryItems[x].date.toString());
      }
    }, function(error, data, status) {
      alert("Things went wrong");
    });


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

  $scope.removeItem = function(entry) {
    GroceryService.removeItem(entry);
  };

  $scope.checked = function(entry) {
    GroceryService.checked(entry);
  };

  $scope.$watch(function() { return GroceryService.groceryItems; }, function(groceryItems) {
    $scope.groceryItems = groceryItems;
  });

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
