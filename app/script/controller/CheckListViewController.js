angular.module('TrelloPrettyPrint').controller('CheckListViewController', function CheckListViewController($scope) {
  "use strict";

  function toggleShowHide() {
    $scope.hidden = $scope.hidden ? false : true;
  }

  function sendEvent() {
    var event = $scope.printAll ? 'tpp:checklist:print:add' : 'tpp:checklist:print:remove';
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