
angular.module("groceryAppModule", [])

.controller('tutorialCtrl', function($scope) {
  $scope.myObject = [];
  $scope.myObject.title = "First Title";
  $scope.myObjectsubtitle = "Sub title";

})

.controller('tutorialCtrl2', function($scope) {
  $scope.secondTurorial = "This is the second Tutorial Page";
})

.directive('helloDir', function() {
  return {
      restrict : "E",
      template : "<p>Helloooo</p>"
  }
})
