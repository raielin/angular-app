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
        .when('/users', {
          templateUrl: 'templates/users.html',
          controller: 'UserCtrl'
        })
        .when('/titles', {
          templateUrl: 'templates/titles.html',
          controller: 'TitleCtrl'
        })
        .when('/skills', {
          templateUrl: 'templates/skills.html',
          controller: 'SkillCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
});
