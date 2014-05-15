describe("PreviewController", function() {

  var scope, controller;

  beforeEach(function() {
    angular.mock.module('PrettyPrintTrello');
  });

  beforeEach(inject(function($controller, $rootScope, googleExtensionApiService) {
    scope = $rootScope.$new();

    $controller("PreviewController", {
      $scope: scope,
      googleExtensionApiService: googleExtensionApiService
    });
  }));

  describe('getStoryStyle', function() {
    it('should return default-styles if no label is selected', function() {
      var color = scope.getStoryStyle({labels: []});

      expect(color).toEqual({ border : '10px solid #dbdb57' });
    });

    it('should return blue-styles if label blue is selected', function() {
      var color = scope.getStoryStyle({labels: [{color: 'blue'}]});

      expect(color).toEqual({ border : '10px solid #4d77cb' });
    });

    it('should return green-styles if label green and blue is selected', function() {
      var color = scope.getStoryStyle({labels: [{color: 'green'}, {color: 'blue'}]});

      expect(color).toEqual({ border : '10px solid #34b27d' });
    });
  });

});