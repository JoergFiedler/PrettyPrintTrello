describe('List View Controller', function() {

  var rootScope,
    scope;

  beforeEach(function createMocks() {
    angular.mock.module('PrettyPrintTrello');
  });

  beforeEach(inject(function initializeController($controller, $rootScope) {
    rootScope = $rootScope;
    scope = $rootScope.$new();

    controller = $controller("ListViewController", {
      $scope: scope
    })
  }));

  describe('controller initialization', function() {

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

  describe('function toggleShowHide', function() {

    it("should toggle scope property 'hidden'", function() {
      scope.toggleShowHide();
      expect(scope.hidden).toBeFalsy();

      scope.toggleShowHide();
      expect(scope.hidden).toBeTruthy();
    });
  });

  describe('function togglePrintAllNone', function(){

    beforeEach(function(){
      spyOn(scope, '$broadcast');
    });

    it("should toggle scope property 'printAll'", function() {
      scope.togglePrintAllNone();
      expect(scope.printAll).toBeTruthy();

      scope.togglePrintAllNone();
      expect(scope.printAll).toBeFalsy();
    });

    it("should broadcast event 'tpp:list:print:add' when scope property 'printAll' is false", function() {
      scope.printAll = false;
      scope.togglePrintAllNone();

      expect(scope.$broadcast).toHaveBeenCalledWith('tpp:list:print:add');
    });

    it("should broadcast event 'tpp:list:print:remove' when scope property 'printAll' is true", function() {
      scope.printAll = true;
      scope.togglePrintAllNone();

      expect(scope.$broadcast).toHaveBeenCalledWith('tpp:list:print:remove');
    });
  });


});
