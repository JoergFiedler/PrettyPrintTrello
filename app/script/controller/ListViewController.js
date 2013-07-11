angular.module('TrelloPrettyPrint').controller('ListViewController', function ListViewController($scope) {
  "use strict";

  function toggleShowHide() {
    $scope.hidden = $scope.hidden ? false : true;
  }

  function sendEvent() {
    var event = $scope.printAll ? 'tpp:list:print:add' : 'tpp:list:print:remove';
    $scope.$broadcast(event);
  }

  function togglePrintAllNone() {
    $scope.printAll = $scope.printAll ? false : true;
    sendEvent()
  }

  $scope.hidden = true;
  $scope.togglePrintAllNone = togglePrintAllNone;
  $scope.toggleShowHide = toggleShowHide;
});
