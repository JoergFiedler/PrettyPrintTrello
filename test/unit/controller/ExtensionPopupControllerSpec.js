describe('In ExtensionPopupController', function() {

  var scope,
    controller,
    trelloService,
    googleExtensionApiService,
    timeout,
    location,
    options;

  beforeEach(function createMocks() {
    angular.mock.module('TrelloPrettyPrint');
    trelloService = jasmine.createSpyObj('trelloService', ['isAuthorized', 'authorize']);
    googleExtensionApiService = jasmine.createSpyObj('googleExtensionApiService', ['openInNewTab', 'getActiveTabUrl']);
    location = jasmine.createSpyObj('location', ['path']);
    options = {callbackUrl: 'anyCallbackUrl'};
  });

  beforeEach(inject(function initializeController($controller, $rootScope, $timeout) {
    timeout = $timeout;
    scope = $rootScope.$new();
    spyOn(scope, '$watch').andCallThrough();
    controller = $controller("ExtensionPopupController", {
      $scope: scope,
      $location: location,
      $timeout: timeout,
      trelloService: trelloService,
      googleExtensionApiService: googleExtensionApiService,
      options: options
    })
  }));

  describe('after initialization', function() {

    it('should scope property authorized to be false per default', function() {
      expect(scope.authorized).toBeFalsy();
    });

    it('should scope property activeTabUrl initialized by googleExtensionApiService', function() {
      googleExtensionApiService.getActiveTabUrl.mostRecentCall.args[0]('any-url');

      expect(googleExtensionApiService.getActiveTabUrl).toHaveBeenCalledWith(jasmine.any(Function));
      expect(scope.activeTabUrl).toBe('any-url');
    });

    it('should scope authorize set to a function', function() {
      expect(scope.authorize).toBeDefined();
    });

    it('should scope $watch have be called to register for activeTabUrl changes', function() {
      expect(scope.$watch).toHaveBeenCalledWith('activeTabUrl', jasmine.any(Function));
    });
  });

  describe('method authorize', function() {

    it('should call googleExtensionApiService', function() {
      scope.authorize();
      expect(googleExtensionApiService.openInNewTab).toHaveBeenCalledWith(options.callbackUrl)
    });
  });

  describe('method switch', function() {

    it('should change location path to /card when activeTabUrl contains /card/', function() {
      scope.activeTabUrl = 'any/card/any/boardId/cardIdShort';
      scope.$apply();

      expect(location.path).toHaveBeenCalledWith('/card');
    });

    it('should should broadcast boardId and cardShortId when activeTabUrl matches for card', function() {
      scope.activeTabUrl = 'any/card/any/boardId/cardIdShort';
      spyOn(scope, '$broadcast');

      scope.$apply();
      timeout.flush();

      expect(scope.$broadcast).toHaveBeenCalledWith('tpp:card:ids', {boardId: 'boardId', cardIdShort: 'cardIdShort'});
    });

    it('should change location path to /board when activeTabUrl contains /board/', function() {
      scope.activeTabUrl = 'any/board/any/id';

      scope.$apply();

      expect(location.path).toHaveBeenCalledWith('/board');
    });

    it('should should set scope.id to id when activeTabUrl matches for board', function() {
      scope.activeTabUrl = 'any/board/any/boardId';

      spyOn(scope, '$broadcast');

      scope.$apply();
      timeout.flush();

      expect(scope.$broadcast).toHaveBeenCalledWith('tpp:board:ids', {boardId: 'boardId'});
    });

    it('should leave location path untouched when activeTabUrl contains neither /board/ or /card/', function() {
      scope.activeTabUrl = 'any';
      scope.$apply();

      expect(location.path).wasNotCalled();
    });
  });

});
