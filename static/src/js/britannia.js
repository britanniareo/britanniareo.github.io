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
        .primaryPalette('britannia-blue')
        .accentPalette('red');
    }])

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.when('', '/');

      $stateProvider.state('home', {
        url:'/',
        controller: 'HomeCtrl',
        templateUrl: '/html/home.html',
        resolve: {
          services: ['ServicesService', function(ServicesService) {
              return ServicesService.getFeatured();
          }],
          areas: ['ServiceAreasService', function(ServiceAreasService) {
              return ServiceAreasService.getSummary();
          }]
        }
      });

      $stateProvider.state('services', {
        url:'/services',
        controller: 'ServicesCtrl',
        templateUrl: '/html/services.html',
        resolve: {
          services: ['ServicesService', function(ServicesService) {
              return ServicesService.getAll();
          }]
        }
      });

      $stateProvider.state('service-areas', {
        url:'/service-areas',
        controller: 'ServiceAreasCtrl',
        templateUrl: '/html/service-areas.html',
        resolve: {
          areas: ['ServiceAreasService', function(ServiceAreasService) {
              return ServiceAreasService.getAll();
          }]
        }
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

    .factory('ServicesService', ['$http', function($http) {
      var servicesService = {};

      servicesService.getAll = function() {
        return $http.get('/api/services/v1').then(function(response) {
            return response.data;
        });
      };

      servicesService.getFeatured = function() {
        return $http.get('/api/services/v1').then(function(response) {
            return response.data.filter(function(service) {
              return service.featured;
            });
        });
      };

      return servicesService;
    }])

    .factory('ServiceAreasService', ['$http', function($http) {
      var areasService = {};

      areasService.getAll = function() {
        return $http.get('/api/service-areas/v1').then(function(response) {
            return response.data;
        });
      };

      areasService.getSummary = function() {
        return $http.get('/api/service-areas/v1').then(function(response) {
            var stateCount = 0;
            var countyCount = 0;

            angular.forEach(response.data.states, function(state, sIndex) {
              stateCount++;
              angular.forEach(state.counties, function(county, cIndex) {
                countyCount++;
              });
            });
            
            return { 
              states: stateCount,
              counties: countyCount 
            };
        });
      };

      return areasService;
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

    .controller('HomeCtrl', ['$scope', 'ServicesService', 'ServicesService', 'services', 'areas', function($scope, ServicesService, ServiceAreasService, services, areas) {

      $scope.services = services;
      $scope.areas = areas;

    }])

    .controller('ServicesCtrl', ['$scope', 'ServicesService', 'services', function($scope, ServicesService, services) {

      $scope.serviceFilter = '';
      $scope.services = services;

      $scope.clearFilters = function() {
        $scope.serviceFilter = '';
      }

      $scope.showService = function(service) {
        var filter = $scope.serviceFilter.toLowerCase();
        var show = (!filter || filter === '' || service.name.toLowerCase().indexOf(filter) >= 0 || service.description.toLowerCase().indexOf(filter) >= 0);
        service.showing = show;
        return show;
      };

      $scope.servicesShowing = function() {
        return $scope.services.filter(function(service) {
          return service.showing;
        }).length;
      }

    }])

    .controller('ServiceAreasCtrl', ['$scope', 'ServiceAreasService', 'areas', function($scope, ServiceAreasService, areas) {

      var _showCounty = function(county) {
        var filter = $scope.countyFilter.toLowerCase();
        return (!filter || filter === '' || county.name.toLowerCase().indexOf(filter) >= 0);
      };

      $scope.countyFilter = '';
      $scope.stateFilter = '';
      $scope.states = areas.states;

      $scope.clearFilters = function() {
        $scope.countyFilter = '';
        $scope.stateFilter = '';
      }

      $scope.showCounty = function(county) {
        return _showCounty(county);
      };

      $scope.showState = function(state) {
        var show = true;
        
        if ($scope.stateFilter!=='' && state.abbr!==$scope.stateFilter) {
          show = false
        }

        var filteredCounties = state.counties.filter(_showCounty);
        if (filteredCounties.length === 0) {
          show = false;
        }

        state.showing = show;
        return show;
      };

      $scope.statesShowing = function () {
        return $scope.states.filter(function(state) {
          return state.showing;
        }).length;
      }

    }]);

})(window, window.angular);
