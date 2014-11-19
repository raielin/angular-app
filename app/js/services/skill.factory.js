angular.module('StaffingUI').factory('SkillFactory', function($http, ServerUrl) {
  var skills = [];

  var resetChecked = function() {
    // underscore is from a library called Lo-Dash - has a lot of nice helpers
    _.forEach(skills, function(item) {
        item.checked = false;
    });
  };


  var fetch = function() {
    $http.get(ServerUrl + 'skills').success(function(response) {
      angular.copy(response, skills);

      // add checked field to each skill for checkboxes
      resetChecked();
    });
  };

  return {
    skills: skills,
    fetch: fetch,
    resetChecked: resetChecked
  };
});
