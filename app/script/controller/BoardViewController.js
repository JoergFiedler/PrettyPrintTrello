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

  function showPreview() {
    $location.path('/board/preview');
  }

  $scope.showPreview = showPreview;
  $scope.$on("tpp:board:ids", loadListsWithCards);
});
