describe('In ListViewController', function() {

  var rootScope,
    scope;

  beforeEach(function createMocks() {
    angular.mock.module('TrelloPrettyPrint');
  });

  beforeEach(inject(function initializeController($controller, $rootScope) {
    rootScope = $rootScope;
    scope = $rootScope.$new();

    controller = $controller("BoardViewController", {
      $scope: scope,
    })
  }));

  describe('after initialization', function() {

  });
  
});
