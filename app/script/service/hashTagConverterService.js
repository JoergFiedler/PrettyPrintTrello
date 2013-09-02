angular.module('PrettyPrintTrello').service('hashTagConverterService', function hashTagConverterService() {
  "use strict";

  var epicRegex = /.*#epic*/;


  function convert(card) {
    var
      nameMatch,
      descMatch;

    nameMatch = epicRegex.exec(card.name);
    descMatch = epicRegex.exec(card.desc);

    if (nameMatch || descMatch) {
      card.isEpic = true;
    }
  }

  return {
    convert: convert
  }
});

