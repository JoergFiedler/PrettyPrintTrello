angular.module('PrettyPrintTrello').controller('ExtensionPopupController', function ExtensionPopupController($scope, $timeout, $location, $window, trelloService, googleExtensionApiService, options) {
  "use strict";

  var cardRegex = /.*\/c\/([^/]+)\/([^/]+)*/,
    boardRegex = /.*\/b\/([^/]+)\/([^/]+)*/;

  $scope.statusBarMessage = '';
  $scope.action = {};
  $scope.itemsToPrint = [];
  $scope.activeTabUrl = '';
  $scope.authorized = trelloService.isAuthorized();

  function authorize() {
    googleExtensionApiService.openInNewTab(options.callbackUrl);
  }

  function sendEvent(name, data) {
    $timeout(function() {
      $scope.$broadcast(name, data);
    }, 0);
  }

  function showBoardView(boardId) {
    $location.path('/board');
    sendEvent('tpp:board:ids', {boardId: boardId});
  }

  function showCardView(cardId) {
    $location.path('/card');
    sendEvent('tpp:card:ids', {cardId: cardId});
  }

  function switchView() {
    var cardMatch = cardRegex.exec($scope.activeTabUrl);
    var boardMatch = boardRegex.exec($scope.activeTabUrl);

    if (cardMatch) {
      showCardView(cardMatch[1])
    } else if (boardMatch) {
      showBoardView(boardMatch[1])
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

  function sendActionEvent() {
    sendEvent($scope.action.event);
  }

  function updateStatusBarMessage(event, data) {
    $scope.statusBarMessage = data;
  }

  function registerAction(event, data) {
    $scope.action.label = data.label;
    $scope.action.event = data.event;
  }

  googleExtensionApiService.getActiveTabUrl(onActiveTabUrl);

  $scope.authorize = authorize;
  $scope.sendActionEvent = sendActionEvent;

  $scope.$on('ttp:card:print:add', addToItemsToPrint);
  $scope.$on('ttp:card:print:remove', removeFromItemsToPrint);
  $scope.$on('tpp:checklistitem:print:add', addToItemsToPrint);
  $scope.$on('tpp:checklistitem:print:remove', removeFromItemsToPrint);
  $scope.$on('tpp:statusbar:message', updateStatusBarMessage);
  $scope.$on('tpp:action', registerAction);

  $scope.$watch('activeTabUrl', switchView)
});
