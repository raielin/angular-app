// .controller in the filename is a convention that's used by Yeoman
// good practice, but not necessary.
angular.module('StaffingUI').controller('NavbarCtrl', function($scope, $location) {
    'use strict';

    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };
});
