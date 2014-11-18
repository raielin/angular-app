// Factory allows us to list out our titles in the dropdown
// Unless you have a good reason to use a service, it's better to use a Factory
// We use a factory for sharing data or functionality between controllers.
// Allows us to keep our logic out of our controllers.

angular.module('StaffingUI').factory('UserFactory', function($http) {
  var users = [];

  var fetch = function() {
    $http.get('http://localhost:3000/users').success(function(response) {
      angular.copy(response, users);
    });
  };

  return {
    users: users,
    fetch: fetch
  };
});
