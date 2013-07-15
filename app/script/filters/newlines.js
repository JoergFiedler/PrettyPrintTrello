angular.module('TrelloPrettyPrint').filter('newlines', function initials() {

  return function(text) {
    return text.replace(/\n/g, '<br/>');
  }
});