angular.module('PrettyPrintTrello').filter('removeHashTags', function initials() {

  return function(text) {
  	return text.replace(/#\w+/g, '');
  }
});