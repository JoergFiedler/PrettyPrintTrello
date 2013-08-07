(function initPrettyPrintTrelloApp() {
  'use strict';
  var appName = 'PrettyPrintTrello';

  angular
    .module(appName, [], function ($routeProvider) {
      $routeProvider.
        when('/', {redirectTo: '/'}).
        when('/card', {templateUrl: '/tpp-card.html'}).
        when('/board', {templateUrl: '/tpp-board.html'}).
        when('/board/preview', {templateUrl: '/partial/board-preview.html'}).
        when('/card/preview', {templateUrl: '/partial/card-preview.html'}).

        otherwise({redirectTo: '/'});
    })
    .value('options', {
      callbackUrl: './../callback.html'
    })
    .value('trelloOptions', {
      nonInteractive: {
        name: appName,
        interactive: false,
        scope: { read: true },
        expiration: 'never',
        persist: true
      },
      interactive: {
        name: appName,
        interactive: true,
        type: 'redirect',
        scope: { read: true },
        expiration: 'never',
        persist: true
      }
    });
})();
