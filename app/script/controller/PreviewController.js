angular.module('PrettyPrintTrello').controller('PreviewController', function PreviewController($scope, googleExtensionApiService) {
  "use strict";

  function init() {
    $scope.$emit('tpp:action', { label: "Print'em All", 'event': 'tpp:print'});
  }

  function print(event, data) {
    googleExtensionApiService.print(angular.element('#tpp-print-frame').html());
  }

  $scope.init = init;
  $scope.$on('tpp:print', print)
});

