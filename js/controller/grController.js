
angular.module("groceryApp", [])

.controller("tutorialCtrl", function($scope) {
  $scope.myObject = [];
  $scope.myObject.title = "First Title";
  $scope.myObject.subtitle = "Sub title";

})

.directive("helloDir", function() {
  return {
      restrict : "E",
      template : "<p>Helloooo</p>"
  }
})
