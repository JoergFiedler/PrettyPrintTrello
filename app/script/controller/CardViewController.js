angular.module('TrelloPrettyPrint').controller('CardViewController', function CardViewController($scope, $location, hashTagConverterService, trelloService) {
  "use strict";

  $scope.card = undefined;

  function onError(data) {
    console.log('Error while talking to trello:' + data)
  }

  function onSuccessLoadMember(member) {
    $scope.$apply(function() {
      $scope.card.members.push(member);
    });
  }

  function loadMembers() {
    $scope.card.members = [];
    $scope.card.idMembers.each(function onMemberId(memberId) {
      trelloService.loadMember(memberId, onSuccessLoadMember, onError);
    });
  }

  function loadCheckLists() {
    if ($scope.card) {
      trelloService.loadCheckLists($scope.card.id, onSuccessLoadChecklists, onError);
    }
  }

  function createQrCodeUrl() {
    $scope.card.qrCodeUrl= 'https://chart.googleapis.com/chart?cht=qr&chs=100x100&chl='+$scope.card.shortUrl;
  }

  function onSuccessLoadCard(card) {
    $scope.$apply(function() {
      debugger;
      $scope.card = card;
      $scope.$emit('tpp:statusbar:message', "IP-" + card.idShort + ": " + card.name);
    });
  }

  function onSuccessLoadChecklists(checklists) {
    $scope.$apply(function() {
      $scope.card.checklists = checklists;
    });
  }

  function loadCard(event, ids) {
    trelloService.loadCard(ids.cardId, onSuccessLoadCard, onError);
  }

  function convertHashTags() {
    hashTagConverterService.convert($scope.card);
  }

  function updateCardsToPrint() {
    var event = $scope.toBePrinted ? 'ttp:card:print:add' : 'ttp:card:print:remove';
    $scope.$emit(event, $scope.card);
  }

  function togglePrintCard() {
    $scope.toBePrinted = $scope.toBePrinted ? false : true;
    updateCardsToPrint();
  }

  function printCard(event, data) {
    if ( event.name === 'tpp:list:print:add') {
      $scope.toBePrinted = true;
    } else if (event.name === 'tpp:list:print:remove') {
      $scope.toBePrinted = false;
    }

    updateCardsToPrint();
  }

  function showPreview() {
    $location.path('/card/preview');
  }

  function init() {
    $scope.$emit('tpp:action', { label: 'Preview', 'event': 'tpp:preview:card' });
  }

  $scope.init = init;
  $scope.showPreview = showPreview;
  $scope.togglePrintCard = togglePrintCard;

  $scope.$on("tpp:card:ids", loadCard);
  $scope.$on("tpp:list:print:add", printCard);
  $scope.$on("tpp:list:print:remove", printCard);
  $scope.$on("tpp:preview:card", showPreview);

  $scope.$watch("card", convertHashTags);
  $scope.$watch("card", loadMembers);
  $scope.$watch("card", loadCheckLists);
  $scope.$watch("card", createQrCodeUrl);
});
