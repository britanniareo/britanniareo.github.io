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
        controller: 'HomeCtrl',
        templateUrl: '/html/home.html'
      });

      $stateProvider.state('services', {
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
      });

    }]).run(['$rootScope', '$location', '$window', '$state',  function($rootScope, $location, $window, $state) {

      $rootScope.$on('$stateChangeSuccess', function(event) {

        document.body.scrollTop = document.documentElement.scrollTop = 0;

        if (!$window.ga || $location.host().indexOf('www.britanniareo.com') < 0) {
          return;
        }

        $window.ga('send', 'pageview', { page: $location.path() });
      });

      $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        event.preventDefault();
        $state.go('error');
      });
    }])

    .controller('aniDistances', ['$scope', function($scope) {
      $scope.getScrollOffsets = function(w) {

        // Use the specified window or the current window if no argument 
        w = w || window;

        // This works for all browsers except IE versions 8 and before
        if (w.pageXOffset !== null) {
          return {
              x: w.pageXOffset,
              y: w.pageYOffset
          };
        }

        // For IE (or any browser) in Standards mode
        var d = w.document;
        if (document.compatMode === 'CSS1Compat') {
          return {
              x: d.documentElement.scrollLeft,
              y: d.documentElement.scrollTop
          };
        }

        // For browsers in Quirks mode
        return {
          x: d.body.scrollLeft,
          y: d.body.scrollTop
        };
      };
      $scope.getPosition = function(e) {
        return {
          x: e[0].offsetLeft,
          y: e[0].offsetTop
        };
      };
      $scope.getViewPortSize = function(w) {
        return {
          x: Math.max(document.documentElement.clientWidth, w.innerWidth || 0),
          y: Math.max(document.documentElement.clientHeight, w.innerHeight || 0)
        };
      };
    }])

    .directive('aniView', ['$window', function($window) {
      return {
        restrict: 'A',
        controller: 'aniDistances',
        transclude: true,
        replace: true,
        template: '<div ng-transclude ng-class="{ active: inView }"></div>',
        scope: {
          inView: '@'
        },
        link: function(scope, element, attrs) {
          angular.element($window).bind('scroll', function() {
            if (!scope.inView) {
              var position = scope.getPosition(element);
              var offset = scope.getScrollOffsets($window);
              var viewport = scope.getViewPortSize($window);
              var coverage = {
                  x: parseInt(viewport.x + offset.x),
                  y: parseInt(viewport.y + offset.y)
              }
              if (coverage.y >= (position.y + element[0].offsetHeight) && coverage.x >= position.x) {
                  scope.inView = true;
              } else {
                  scope.inView = false;
              }
              scope.$apply();
            }
          });
        }
      };
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

    .controller('HomeCtrl', ['$scope', function($scope) {

      $scope.services = [
        {
          name: 'Service',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ullamcorper consectetur eleifend. Integer quis turpis et ligula aliquet congue. Nullam pharetra lorem sem, vitae mollis odio lobortis et. Nunc lobortis pulvinar lacus et porta. Ut non placerat turpis'
        },
        {
          name: 'Service',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ullamcorper consectetur eleifend. Integer quis turpis et ligula aliquet congue. Nullam pharetra lorem sem, vitae mollis odio lobortis et. Nunc lobortis pulvinar lacus et porta. Ut non placerat turpis'
        },
        {
          name: 'Service',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ullamcorper consectetur eleifend. Integer quis turpis et ligula aliquet congue. Nullam pharetra lorem sem, vitae mollis odio lobortis et. Nunc lobortis pulvinar lacus et porta. Ut non placerat turpis'
        },
        {
          name: 'Service',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ullamcorper consectetur eleifend. Integer quis turpis et ligula aliquet congue. Nullam pharetra lorem sem, vitae mollis odio lobortis et. Nunc lobortis pulvinar lacus et porta. Ut non placerat turpis'
        },
        {
          name: 'Service',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ullamcorper consectetur eleifend. Integer quis turpis et ligula aliquet congue. Nullam pharetra lorem sem, vitae mollis odio lobortis et. Nunc lobortis pulvinar lacus et porta. Ut non placerat turpis'
        },
        {
          name: 'Service',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ullamcorper consectetur eleifend. Integer quis turpis et ligula aliquet congue. Nullam pharetra lorem sem, vitae mollis odio lobortis et. Nunc lobortis pulvinar lacus et porta. Ut non placerat turpis'
        }
      ];

    }])

    .controller('ServicesCtrl', ['$scope', '$timeout', '$mdMedia', function($scope, $timeout, $mdMedia) {

      $scope.$mdMedia = $mdMedia;
      $scope.services = [];
      $timeout(function() {
        $scope.services = [
          'Appliance Install',
          'Awnings/Patio Covers'
        ];
      }, 100);

    }]);

})(window, window.angular);
