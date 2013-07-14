angular.module('TrelloPrettyPrint').controller('ExtensionPopupController', function ExtensionPopupController($scope, $timeout, $location, $window, trelloService, googleExtensionApiService, options) {
  "use strict";

  var cardRegex = /.*\/card\/[^/]+\/([^/]+)\/([^/]+)*/,
    boardRegex = /.*\/board\/([^/]+)\/([^/]+)*/;

  $scope.itemsToPrint = [];
  $scope.activeTabUrl = '';
  $scope.authorized = trelloService.isAuthorized();

  function authorize() {
    googleExtensionApiService.openInNewTab(options.callbackUrl);
  }

  function sendEvent(name, data) {
    $timeout(function() {
      $scope.$broadcast('tpp:' + name, data);
    }, 0);
  }

  function switchView() {
    var cardMatch = cardRegex.exec($scope.activeTabUrl);
    var boardMatch = boardRegex.exec($scope.activeTabUrl);

    if (cardMatch) {
      $location.path('/card');
      sendEvent('card:ids', {boardId: cardMatch[1], cardIdShort: cardMatch[2]});
    } else if (boardMatch) {
      $location.path('/board');
      sendEvent('board:ids', {boardId: boardMatch[2]});
    }
  }

  function addToItemsToPrint(event, item) {
    $scope.itemsToPrint.add(item);
  }

  function removeFromItemsToPrint(event, item) {
    $scope.itemsToPrint.remove(item);
  }

  function onActiveTabUrl(url) {
    $scope.$apply(function() {
      $scope.activeTabUrl = url;
    });
  }

  function print() {
    googleExtensionApiService.print(angular.element('#tpp-print-frame').html());
  }

  googleExtensionApiService.getActiveTabUrl(onActiveTabUrl);

  $scope.authorize = authorize;
  $scope.print = print;

  $scope.$on('ttp:card:print:add', addToItemsToPrint);
  $scope.$on('ttp:card:print:remove', removeFromItemsToPrint);
  $scope.$on('tpp:checklistitem:print:add', addToItemsToPrint);
  $scope.$on('tpp:checklistitem:print:remove', removeFromItemsToPrint);

  $scope.$watch('activeTabUrl', switchView)
});
