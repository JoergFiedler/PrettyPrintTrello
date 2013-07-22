describe('Extension Popup Controller', function() {

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
    googleExtensionApiService = jasmine.createSpyObj(
      'googleExtensionApiService', ['openInNewTab', 'getActiveTabUrl', 'print']
    );
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

  describe('initialization', function() {

    it('should set scope property authorized to false per default', function() {
      expect(scope.authorized).toBeFalsy();
    });

    it('should initialize scope property activeTabUrl by googleExtensionApiService', function() {
      googleExtensionApiService.getActiveTabUrl.mostRecentCall.args[0]('any-url');

      expect(googleExtensionApiService.getActiveTabUrl).toHaveBeenCalledWith(jasmine.any(Function));
      expect(scope.activeTabUrl).toBe('any-url');
    });

    it('should set scope property authorize to a function', function() {
      expect(scope.authorize).toBeDefined();
    });

    it('should register scope a function to watch activeTabUrl changes', function() {
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
      scope.activeTabUrl = 'any/c/cardId/anything';
      scope.$apply();

      expect(location.path).toHaveBeenCalledWith('/card');
    });

    it('should should broadcast boardId and cardShortId when activeTabUrl matches for card', function() {
      scope.activeTabUrl = 'any/c/cardId/anything';
      spyOn(scope, '$broadcast');

      scope.$apply();
      timeout.flush();

      expect(scope.$broadcast).toHaveBeenCalledWith('tpp:card:ids', {cardId: 'cardId'});
    });

    it('should change location path to /board when activeTabUrl contains /board/', function() {
      scope.activeTabUrl = 'any/b/id/anything';

      scope.$apply();

      expect(location.path).toHaveBeenCalledWith('/board');
    });

    it('should should set scope.id to id when activeTabUrl matches for board', function() {
      scope.activeTabUrl = 'any/b/boardId/anything';

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
  
  describe("on events 'ttp:*:print:*'", function(){

    var item;

    beforeEach(function(){
      item ={ key: "value" };
      scope.itemsToPrint = [];
    });

    it("should add event data to list of items to print on event 'ttp:card:print:add'", inject(function($rootScope) {
      $rootScope.$broadcast('ttp:card:print:add', item);

      expect(scope.itemsToPrint[0]).toEqual(item);
    }));

    it("should remove event data from list of items to print on event 'ttp:card:print:remove'", inject(function($rootScope) {
      scope.itemsToPrint.push(item);
      $rootScope.$broadcast('ttp:card:print:remove', item);

      expect(scope.itemsToPrint.length).toEqual(0);
    }));

    it("should add event data to list of items to print on event 'tpp:checklistitem:print:add'", inject(function($rootScope) {
      $rootScope.$broadcast('tpp:checklistitem:print:add', item);

      expect(scope.itemsToPrint[0]).toEqual(item);
    }));

    it("should remove event data from list of items to print on event 'tpp:checklistitem:print:remove'", inject(function($rootScope) {
      scope.itemsToPrint.push(item);
      $rootScope.$broadcast('tpp:checklistitem:print:remove', item);

      expect(scope.itemsToPrint.length).toEqual(0);
    }));
  });
});
