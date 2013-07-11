describe('In ListViewController', function() {

  var rootScope,
    scope;

  beforeEach(function createMocks() {
    angular.mock.module('TrelloPrettyPrint');
  });

  beforeEach(inject(function initializeController($controller, $rootScope) {
    rootScope = $rootScope;
    scope = $rootScope.$new();

    controller = $controller("ListViewController", {
      $scope: scope
    })
  }));

  describe('after initialization', function() {

    it("should set the property hidden to 'true'", function() {
      expect(scope.hidden).toBe(true);
    });

    it("should a function be bound to 'togglePrintAllNone'", function() {
      expect(scope.togglePrintAllNone).toEqual(jasmine.any(Function));
    });

    it("should a function be bound to 'toggleShowHide'", function() {
      expect(scope.toggleShowHide).toEqual(jasmine.any(Function));
    });
  });
  
});
