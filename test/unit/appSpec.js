describe('In PrettyPrintTrello module', function () {

  beforeEach(function () {
    angular.mock.module('PrettyPrintTrello')
  });

  describe('the service: googleExtensionApiService', function () {
    var service;

    beforeEach(inject(function (googleExtensionApiService) {
      service = googleExtensionApiService;
    }));

    it('should be defined', function () {
      expect(service).toBeDefined();
    });
  });

  describe('the service: TrelloService', function () {
    var service;

    beforeEach(inject(function (trelloService) {
      service = trelloService;
    }));

    it('should contain a service named trelloService', function () {
      expect(service).toBeDefined();
    });
  });

  describe('the value: trelloOptions', function () {
    var options;

    beforeEach(inject(function (trelloOptions) {
      options = trelloOptions;
    }));

    it('should be defined', function () {
      expect(options).toBeDefined();
    });


    it('should be defined for interactive with values', function () {
      expect(options.interactive).toEqual({
          name: 'PrettyPrintTrello',
          interactive: true,
          type: 'redirect',
          scope: { read: true },
          expiration: 'never',
          persist: true
        }
      );
    });

    it('should be defined for nonInteractive with values', function () {
      expect(options.nonInteractive).toEqual({
        name: 'PrettyPrintTrello',
        interactive: false,
        scope: { read: true },
        expiration: 'never',
        persist: true
      });
    });
  });

  describe('the controller: TrelloLoginController', function () {
    var controller;

    beforeEach(inject(function ($controller, $rootScope) {
      controller = $controller("TrelloLoginController", { $scope: $rootScope })
    }));

    it('should be defined', function () {
      expect(controller).toBeDefined();
    });
  });

  describe('the controller: ExtensionPopupController', function () {
    var controller;

    beforeEach(inject(function ($controller, $rootScope) {
      var googleExtensionApiService = jasmine.createSpyObj('googleExtensionApiService', ['getActiveTabUrl']);
      controller = $controller('ExtensionPopupController', {
        $scope: $rootScope,
        googleExtensionApiService: googleExtensionApiService
      })
    }));

    it('should be defined', function () {
      expect(controller).toBeDefined();
    });
  });

  describe('the controller: BoardViewController', function () {
    var controller;

    beforeEach(inject(function ($controller, $rootScope) {
      var trelloService = jasmine.createSpyObj('trelloService', ['loadListsWithCards']);
      controller = $controller('BoardViewController', {
        $scope: $rootScope
      })
    }));

    it('should be defined', function () {
      expect(controller).toBeDefined();
    });
  });

  describe('the controller: ListViewController', function () {
    var controller,
      scope;

    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      scope.list = {};
      controller = $controller('ListViewController', {
        $scope: scope
      })
    }));

    it('should be defined', function () {
      expect(controller).toBeDefined();
    });
  });

  describe('the controller: CardViewController', function () {
    var controller;

    beforeEach(inject(function ($controller, $rootScope) {
      controller = $controller('CardViewController', {
        $scope: $rootScope
      })
    }));

    it('should be defined', function () {
      expect(controller).toBeDefined();
    });
  });
});
