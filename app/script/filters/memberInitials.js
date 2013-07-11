angular.module('TrelloPrettyPrint').filter('initials', function initials() {
  return function(members) {
    return members.map(function returnInitials(member) {
      return member.initials;
    }).join('/');
  }
});