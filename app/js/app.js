// Include "angular-route"; "~1.3.2" in bower.json
// lots of other angular dependencies you can bring in when you
// need them. Makes the app leaner.
// initialize the app
// Declare Angular routes as a dependency so that Angular knows to pull in the
// code we installed with bower.
// Order doesn't matter too much. Realistically, this will all get separated into different files.
angular.module('StaffingUI', [
    'ngRoute'
]);

// A run module will run this function right away as soon as the
// page loads. Here, we're going out and grabbing the titles.
angular.module('StaffingUI').run(function(TitleFactory) {
  TitleFactory.fetch();
};

angular.module('StaffingUI').config(function($routeProvider) {
    'use strict';

    // Similar to backbone router. Angular routes gives us $routeProvider.
    // .when maps up to routes.
    // Don't need to put in the hash - Angular assumes that, can
    // see it in the browser address bar. Routing starts after the hash.
    // Templates are JUST HTML files. Go to HTML file - look for ng-view.
    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html'
        })
        .when('/about', {
            templateUrl: 'templates/about.html'
        })
        .when('/contact', {
            templateUrl: 'templates/contact.html'
        })
        .when('/users', {
            templateUrl: 'templates/users.html'
        })
        .when('/titles', {
            templateUrl: 'templates/titles.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});

angular.module('StaffingUI').controller('NavbarCtrl', function($scope, $location) {
    'use strict';

    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };
});

// Factory allows us to list out our titles in the dropdown
// Unless you have a good reason to use a service, it's better to use a Factory
// We use a factory for sharing data or functionality between controllers.
// Allows us to keep our logic out of our controllers.
angular.module('StaffingUI').factory('TitleFactory', function($http) {
  var titles = [];

  var fetch = function() {
    $http.get('http://localhost:3000/titles').success(function(response) {
      // use angular.copy() to retain the original array which the controllers
      // are bound to. tasks = response will overwrite the array with a new one
      // and the controllers loose the reference. could also do tasks.length = 0,
      // then push in the new items
      angular.copy(response, titles);
    });
  };

  return {
    titles: titles,
    fetch: fetch
  };
})

// Remember to pass in TitleFactory as a parameter for controllers where we need to access it.
angular.module('StaffingUI').controller('TitlesCtrl', function($scope, $http, TitleFactory) {
  'use strict';

  $scope.titles = TitleFactory.titles;

  $http.get('http://localhost:3000/titles').success(function(response) {
    $scope.titles = response;
  });

  $scope.createAndUpdateTitles = function(title) {
    var params = {
      title: title
    };

    if (title.id) {
      $http.put('http://localhost:3000/titles/' + title.id, params).success(function(response) {
        $scope.title = response;
      });
    } else {
        $http.post('http://localhost:3000/titles', params).success(function(response) {
          $scope.titles.push(response)
        });
    }

    $scope.title = {};

  };

  $scope.upsertTitle = function(title) {
    $scope.title = title;
  };

  $scope.deleteTitle = function(title) {
    $http.delete('http://localhost:3000/titles/' + title.id).success(function(response) {
        var index = $scope.titles.indexOf(title);
        $scope.titles.splice(index, 1);
      })
    };
});

angular.module('StaffingUI').controller('UsersCtrl', function($scope, $http, TitleFactory) {
  'use strict';

  $scope.titles = TitleFactory.titles;

  $http.get('http://localhost:3000/users').success(function(response) {
    $scope.users = response;
  });

  $scope.createAndUpdateUsers = function(user) {
    var params = {
      user: {
        first_name: user.first_name,
        last_name: user.last_name
      }
    };

    if (user.id) {
      $http.put('http://localhost:3000/users/' + user.id, params).success(function(response) {
        $scope.user = response;
      });
    } else {
        $http.post('http://localhost:3000/users', params).success(function(response) {
          $scope.users.push(response)
        });
    }

    $scope.user = {};

  };

  $scope.upsertUser = function(user) {
    $scope.user = user;
  };

  $scope.deleteUser = function(user) {
    $http.delete('http://localhost:3000/users/' + user.id).success(function(response) {
        var index = $scope.users.indexOf(user);
        $scope.users.splice(index, 1);
      })
    };
});
