angular.module('StaffingUI').factory('SkillFactory', function($http) {
  var skills = [];

  var fetch = function() {
    $http.get('http://localhost:3000/skills').success(function(response) {
      angular.copy(response, skills);
    });
  };

  return {
    skills: skills,
    fetch: fetch
  };
});
