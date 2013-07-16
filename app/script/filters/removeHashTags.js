angular.module('TrelloPrettyPrint').filter('removeHashTags', function initials() {

  return function(text) {
    return text.replace(/#\w+/g, '');
  }
});