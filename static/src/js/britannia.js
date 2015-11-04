(function(window, angular, undefined) {
  'use-strict';

  angular.module('Britannia', ['ui.router', 'ngMaterial'])

    .config(['$mdThemingProvider', function($mdThemingProvider) {
      $mdThemingProvider.definePalette('britannia-blue', {
        '50': '#e2edf9',
        '100': '#a3c5ec',
        '200': '#74a7e2',
        '300': '#3982d6',
        '400': '#2973c7',
        '500': '#2464ae',
        '600': '#1f5595',
        '700': '#1a477b',
        '800': '#143862',
        '900': '#0f2a49',
        'A100': '#e2edf9',
        'A200': '#a3c5ec',
        'A400': '#2973c7',
        'A700': '#1a477b',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50', '100', 
         '200', 'A100', 'A200']
      });
      $mdThemingProvider.theme('default')
        .primaryPalette('britannia-blue');
    }])

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.when('', '/');

      $stateProvider.state('home', {
        url:'/',
        templateUrl: '/html/home.html'
      });

      /*$stateProvider.state('services', {
        url:'/services',
        controller: 'ServicesCtrl',
        templateUrl: '/html/services.html'
      });

      $stateProvider.state('error', {
        url:'/error',
        templateUrl: '/html/not-found.html'
      });

      $stateProvider.state('not-found', {
        url:'*path',
        templateUrl: '/html/not-found.html'
      });*/

      $urlRouterProvider.otherwise('/');

    }]).run(['$rootScope', '$location', '$window', '$state',  function($rootScope, $location, $window, $state) {

      $rootScope.$on('$stateChangeSuccess', function(event) {

        document.body.scrollTop = document.documentElement.scrollTop = 0;

        /*if (!$window.ga) {
          return;
        }

        $window.ga('send', 'pageview', { page: $location.path() });*/
      });

      $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        event.preventDefault();
        $state.go('error');
      });
    }])

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

    }])

    .controller('ServicesCtrl', ['$scope', '$timeout', function($scope, $timeout) {

      $scope.services = [];
      $timeout(function() {
        $scope.services = [
          'Appliance Install',
          'Awnings/Patio Covers'
        ];
      }, 100);

    }]);

})(window, window.angular);
