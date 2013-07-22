angular.module('TrelloPrettyPrint').controller('BoardViewController', function BoardViewController($scope, $location, trelloService) {
  "use strict";

  function onSuccessLoadListsWithCards(listsWithCards) {
    $scope.$apply(function() {
      $scope.listsWithCards = listsWithCards;
    });
  }

  function onError(data) {
    console.log('Error while talking to trello:' + data);
  }

  function loadListsWithCards(event, ids) {
    trelloService.loadListsWithCards(ids.boardId, onSuccessLoadListsWithCards, onError);
  }

  function showPreview(event, data) {
    $location.path('/board/preview');
  }

  function init() {
    $scope.$emit('tpp:action', { label: 'Preview', 'event': 'tpp:preview:board' });
  }

  $scope.showPreview = showPreview;
  $scope.init = init;

  $scope.$on("tpp:board:ids", loadListsWithCards);
  $scope.$on("tpp:preview:board", showPreview);
});
