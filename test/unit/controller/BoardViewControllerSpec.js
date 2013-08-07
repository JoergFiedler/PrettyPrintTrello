describe('In BoardViewController', function() {

  var rootScope,
    scope,
    controller,
    location,
    trelloService;

  beforeEach(function createMocks() {
    angular.mock.module('PrettyPrintTrello');
    trelloService = jasmine.createSpyObj('trelloService', ['loadListsWithCards' ]);
    location = jasmine.createSpyObj('location', ['path' ]);
  });

  beforeEach(inject(function initializeController($controller, $rootScope) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    spyOn(scope, '$on').andCallThrough();

    controller = $controller("BoardViewController", {
      $scope: scope,
      $location: location,
      trelloService: trelloService
    })
  }));

  describe('after initialization', function() {

    it('should a function be bound to event tpp:ids', function() {
      expect(scope.$on).toHaveBeenCalledWith('tpp:board:ids', jasmine.any(Function));
    });

    it('should a function be bound to showPreview', function() {
      expect(scope.showPreview).toBeDefined();
    });
  });
  
  describe("function 'showPreview'", function(){
    it("should change the location to '/board/preview'", function() {
      scope.showPreview();

      expect(location.path).toHaveBeenCalledWith('/board/preview');
    });
  });

  describe('on event tpp:ids', function() {
    var listsWithCards;

    beforeEach(function createMocks() {
      listsWithCards = {id: '1'};
    });

    it('should call trelloService with boardId from event data', function() {
      rootScope.$broadcast('tpp:board:ids', {boardId: 'any-boardId', cardIdShort: 'any-cardIdShort'});

      expect(trelloService.loadListsWithCards).toHaveBeenCalledWith(
        'any-boardId', jasmine.any(Function), jasmine.any(Function)
      );
    });

    it('should set $scope.listsWithCards after a successful call to trelloService.listsWithCards', function() {
      var onSuccess;

      rootScope.$broadcast('tpp:board:ids', {boardId: 'any-boardId', cardIdShort: 'any-cardIdShort'});

      onSuccess = trelloService.loadListsWithCards.mostRecentCall.args[1];
      onSuccess(listsWithCards);

      expect(scope.listsWithCards).toBe(listsWithCards)
    });
  });
});
