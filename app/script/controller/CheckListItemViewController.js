angular.module('PrettyPrintTrello').controller('CheckListItemViewController', function CheckListItemViewController($scope) {
  "use strict";

  function updateCheckListItemsToPrint() {
    var event = $scope.toBePrinted ? 'tpp:checklistitem:print:add' : 'tpp:checklistitem:print:remove';
    $scope.$emit(event, $scope.checkItem);
  }

  function togglePrintCheckListItem() {
    $scope.toBePrinted = $scope.toBePrinted ? false : true;
    updateCheckListItemsToPrint();
  }

  function printCheckListItem(event, data) {
    if ( event.name === 'tpp:checklist:print:add') {
      $scope.toBePrinted = true;
    } else if (event.name === 'tpp:checklist:print:remove') {
      $scope.toBePrinted = false;
    }

    updateCheckListItemsToPrint();
  }

  $scope.togglePrintCheckListItem = togglePrintCheckListItem;

  $scope.$on("tpp:checklist:print:add", printCheckListItem);
  $scope.$on("tpp:checklist:print:remove", printCheckListItem);
});