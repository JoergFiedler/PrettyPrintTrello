angular.module('TrelloPrettyPrint').controller('TrelloLoginController', function TrelloLoginController($scope, trelloService) {
  "use strict";

  function isAuthorized() {
    return trelloService.isAuthorized();
  }

  function grantAccess() {
    $scope.authorized = trelloService.authorize();
  }

  function revokeAccess() {
    trelloService.unauthorize();
    $scope.authorized = false;
  }

  $scope.authorized = isAuthorized();

  $scope.grantAccess = grantAccess;
  $scope.revokeAccess = revokeAccess;
});
