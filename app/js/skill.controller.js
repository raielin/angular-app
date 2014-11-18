angular.module('StaffingUI').controller('SkillCtrl', function($scope, $http, SkillFactory) {
  'use strict';

  $scope.skills = SkillFactory.skills;

  $scope.upsertSkills = function(skill) {
    var params = {
      skill: skill
    };

    if (skill.id) {
      $http.put('http://localhost:3000/skills/' + skill.id, params).success(function(response) {
        SkillFactory.fetch();
      });
    } else {
        $http.post('http://localhost:3000/skills', params).success(function(response) {
          SkillFactory.fetch();
        });
    }

    $scope.skill = {};

  };

  $scope.editSkill = function(skill) {
    $scope.skill = skill;
  };

  $scope.deleteSkill = function(skill) {
    $http.delete('http://localhost:3000/skills/' + skill.id).success(function(response) {
        var index = $scope.skills.indexOf(skill);
        $scope.skills.splice(index, 1);
      })
    };
});
