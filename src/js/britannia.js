(function(window, angular, undefined) {

  angular.module('Britannia', ['ngMaterial'])

    .controller('NavCtrl', ['$scope', function($scope) {

      $scope.menuOpen = false;
      $scope.menuStyle = '';

      $scope.closeMenu = function() {
        $scope.menuOpen = false;
        $scope.menuStyle = '';
      };

      $scope.toggleMenu = function() {
        $scope.menuOpen = !$scope.menuOpen;
        if ($scope.menuOpen) {
          $scope.menuStyle = 'height:' + document.getElementById('menu-wrapper').offsetHeight + 'px;';
        } else {
          $scope.menuStyle = '';
        }
      };

    }]);

})(window, window.angular);
