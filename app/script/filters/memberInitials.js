angular.module('TrelloPrettyPrint').filter('initials', function initials() {

  function filterMembersWithoutInitials(members) {
    return members.findAll(function(member) {
      return member.initials ? member.initials : undefined;
    });
  }

  function createInitials(members) {
    return members.map(function(member) {
      return member.initials;
    }).join('/');
  }

  return function(members) {
    var membersWithInitials = filterMembersWithoutInitials(members);
    return createInitials(membersWithInitials);
  }
});