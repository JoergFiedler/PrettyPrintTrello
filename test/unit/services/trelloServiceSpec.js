describe("In TrelloService", function () {
  var service,
    options;

  beforeEach(function () {
    angular.mock.module('PrettyPrintTrello');
    angular.module('PrettyPrintTrello').value('trelloOptions', {
      interactive: { anyInteractiveOption: true },
      nonInteractive: { anyNonInteractiveOption: true }
    });
  });

  beforeEach(inject(function (trelloService, trelloOptions) {
    service = trelloService;
    options = trelloOptions;
  }));

  describe('the method isAuthorized', function () {

    it('should use options.nonInteractive with Trello.authorize', function () {
      spyOn(Trello, 'authorized').andReturn(false);
      spyOn(Trello, 'authorize');

      service.isAuthorized();
      expect(Trello.authorize).toHaveBeenCalledWith(options.nonInteractive);

    });

    it('should use call Trello.authorized', function () {
      spyOn(Trello, 'authorized').andReturn(false);

      service.isAuthorized();
      expect(Trello.authorized).toHaveBeenCalled();
    });

    it('should false when Trello responded false', function () {
      spyOn(Trello, 'authorized').andReturn(false);

      expect(service.isAuthorized()).toBeFalsy();
    });

    it('should true when Trello responded false', function () {
      spyOn(Trello, 'authorized').andReturn(true);

      expect(service.isAuthorized()).toBeTruthy();
    });
  });

  describe('the method authorize', function(){

    it('should call Trello.authorize with options.interactive', function () {
      spyOn(Trello, 'authorize');

      service.authorize();

      expect(Trello.authorize).toHaveBeenCalledWith(options.interactive);
    });

    it('should call isAuthorized on itself', function () {
      spyOn(service, 'isAuthorized');

      service.authorize();

      expect(service.isAuthorized).toHaveBeenCalled();
    });
  });
  
  
  describe('the method unauthorize', function(){

    it('should remove the local storage item trello_token', function () {
      spyOn(localStorage, 'removeItem');

      service.unauthorize();

      expect(localStorage.removeItem).toHaveBeenCalledWith('trello_token');
    });
  });
  
});
