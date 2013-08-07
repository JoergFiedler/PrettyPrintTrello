describe('In TrelloLoginController', function () {

  var rootScope,
    scope,
    controller,
    trelloService;

  beforeEach(function () {
    angular.mock.module('PrettyPrintTrello');
    trelloService = jasmine.createSpyObj('trelloService', ['isAuthorized', 'authorize']);
  });

  beforeEach(inject(function ($controller, $rootScope) {
    rootScope = $rootScope;
    scope = rootScope.$new();
    controller = $controller("TrelloLoginController", {
      $scope: scope,
      trelloService: trelloService
    })
  }));

  describe('scopy property authorized', function () {

    it('should be false per default', function () {
      expect(scope.authorized).toBeFalsy();
    });

    it('should return false when trelloService responds with false', function () {
      trelloService.authorize.andReturn(false);

      scope.grantAccess();

      expect(scope.authorized).toBeFalsy();
    });

    it('should return true when trelloService responds with true', function () {
      trelloService.authorize.andReturn(true);

      scope.grantAccess();

      expect(scope.authorized).toBeTruthy();
    });
  });

});
