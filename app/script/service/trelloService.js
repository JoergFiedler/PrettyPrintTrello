angular.module('TrelloPrettyPrint').service('trelloService', function TrelloService($rootScope, $q, trelloOptions) {
  "use strict";

  var options;

  options = trelloOptions;

  function isAuthorized() {
    Trello.authorize(options.nonInteractive);
    return Trello.authorized();
  }

  function unauthorize() {
    localStorage.removeItem('trello_token');
  }

  function authorize() {
    Trello.authorize(options.interactive);
    return this.isAuthorized();
  }

  function loadListsWithCards(boardId, success, error) {
    var url = 'boards/' + boardId + '/lists';
    callTrello(url, { cards: 'open'}, success, error);
  }

  function loadCard(cardId, success, error) {
    var url = 'cards/' + cardId;
    callTrello(url, {}, success, error);
  }

  function loadCheckLists(cardId, success, error) {
    var url = 'cards/' + cardId + '/checklists';
    callTrello(url, {}, success, error);
  }

  function loadMember(memberId, success, error) {
    var url = 'members/' + memberId;
    callTrello(url, {}, success, error);
  }

  function callTrello(url, params, success, error) {
    Trello.get(url, params, success, error);
  }

  return {
    isAuthorized: isAuthorized,
    authorize: authorize,
    unauthorize: unauthorize,
    loadListsWithCards: loadListsWithCards,
    loadCheckLists: loadCheckLists,
    loadCard: loadCard,
    loadMember: loadMember
  }
});
