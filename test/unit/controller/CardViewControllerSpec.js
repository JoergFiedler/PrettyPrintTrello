describe('In CardViewController', function() {

  var rootScope,
    scope,
    controller,
    trelloService;

  beforeEach(function createMocks() {
    angular.mock.module('TrelloPrettyPrint');
    trelloService = jasmine.createSpyObj('trelloService', ['loadCard', 'loadCheckLists', 'loadMember']);
  });

  beforeEach(inject(function initializeController($controller, $rootScope) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    spyOn(scope, '$on').andCallThrough();
    spyOn(scope, '$watch').andCallThrough();
    controller = $controller("CardViewController", {
      $scope: scope,
      trelloService: trelloService
    })
  }));

  describe('after initialization', function() {

    it('should a function be bound to event tpp:ids', function() {
      expect(scope.$on).toHaveBeenCalledWith('tpp:card:ids', jasmine.any(Function));
    });

    it('should a function be bound to scope variable loadMembers', function() {
      expect(scope.loadMembers).toEqual(jasmine.any(Function));
    });
  });

  describe('on event tpp:ids', function() {
    var card;

    beforeEach(function createMocks() {
      card = {id: '1', idMembers: ['any-member-id']};
    });

    it('should call trelloService with boardId and cardIdShort from event data', function() {
      rootScope.$broadcast('tpp:card:ids', {boardId: 'any-boardId', cardIdShort: 'any-cardIdShort'});

      expect(trelloService.loadCard).toHaveBeenCalledWith(
        'any-boardId', 'any-cardIdShort', jasmine.any(Function), jasmine.any(Function)
      );
    });

    it('should set $scope.card after a successful call to trelloService.loadCard', function() {
      var onSuccess;

      rootScope.$broadcast('tpp:card:ids', {boardId: 'any-boardId', cardIdShort: 'any-cardIdShort'});

      onSuccess = trelloService.loadCard.mostRecentCall.args[2];
      onSuccess(card);

      expect(scope.card).toBe(card)
    });
  });

});
