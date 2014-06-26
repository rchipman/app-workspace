`
Workspace = angular.module('Workspace', ['ui.router', 'ngTable']);

Workspace.run([
  '$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    return em.unit;
  }
]);

Workspace.config([
  '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app', {
      abstract: true,
      views: {
        'mainMenu': {
          templateUrl: 'partials/navigation/main-menu.tpl.html'
        },
        'sidebar': {
          templateUrl: 'partials/navigation/sidebar.tpl.html'
        }
      }
    }).state('app.dashboard', {
      url: '/',
      views: {
        'mainContentArea@': {
          templateUrl: 'partials/dashboard/dashboard.tpl.html',
          controller: 'DashboardCtrl'
        }
      }
    }).state('app.annotations', {
      url: '/annotations',
      views: {
        'mainContentArea@': {
          templateUrl: 'partials/annotations/annotations.tpl.html',
          controller: 'AnnotationCtrl'
        }
      }
    }).state('app.annotations.details', {
      url: '/:annotationID',
      views: {
        'mainContentArea@': {
          templateUrl: 'partials/annotations/annotation-details.tpl.html',
          controller: 'AnnotationDetailsCtrl'
        }
      }
    }).state('app.projects', {
      url: '/projects',
      views: {
        'mainContentArea@': {
          templateUrl: 'partials/projects/projects.tpl.html',
          controller: 'ProjectCtrl'
        }
      }
    }).state('app.projects.details', {
      url: '/:projectID',
      views: {
        'mainContentArea@': {
          templateUrl: 'partials/projects/project-details.tpl.html',
          controller: 'ProjectDetailsCtrl'
        }
      }
    });
    return em.unit;
  }
]);
`

# Workspace = angular.module 'Workspace', ['ui.router', 'ngTable']
#
# Workspace.run ['$rootScope', '$state', '$stateParams',
# ($rootScope, $state, $stateParams) ->
#     $rootScope.$state = $state
#     $rootScope.$stateParams = $stateParams
#     em.unit
# ]
#
# Workspace.config ['$locationProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider',
# ($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) ->
#
#     $stateProvider
#     .state 'app',
#         abstract: true
#         views:
#             'mainMenu':
#                 templateUrl: 'partials/navigation/main-menu.tpl.html'
#             'sidebar':
#                 templateUrl: 'partials/navigation/sidebar.tpl.html'
#
#     # .state 'app.view',
#     #     url: '/:view'
#     #     views:
#     #         'mainContentArea@':
#     #             templateUrl: "partials/#{attr.view}/#{attr.view}.tpl.html"
#     #             controller: "#{em.toController attr.view}Ctrl"
#     # .state 'app.viewDetails',
#     #     url: '/:view/:id'
#     #     views:
#     #         'mainContentArea@':
#     #             templateUrl: "partials/#{attr.view}/#{attr.view}-details.tpl.html"
#     #             controller: "#{em.toController attr.view}DetailsCtrl"
#
#     # `
#     # $stateProvider.state('app', {
#     #   abstract: true,
#     #   views: {
#     #     'mainMenu': {
#     #       templateUrl: 'partials/navigation/main-menu.tpl.html'
#     #     },
#     #     'sidebar': {
#     #       templateUrl: 'partials/navigation/sidebar.tpl.html'
#     #     }
#     #   }
#     # }).state('app.dashboard', {
#     #   url: '/',
#     #   views: {
#     #     'mainContentArea@': {
#     #       templateUrl: 'partials/dashboard/dashboard.tpl.html',
#     #       controller: 'DashboardCtrl'
#     #     }
#     #   }
#     # }).state('app.annotations', {
#     #   url: '/annotations',
#     #   views: {
#     #     'mainContentArea@': {
#     #       templateUrl: 'partials/annotations/annotations.tpl.html',
#     #       controller: 'AnnotationCtrl'
#     #     }
#     #   }
#     # }).state('app.annotations.details', {
#     #   url: '/:annotationID',
#     #   views: {
#     #     'mainContentArea@': {
#     #       templateUrl: 'partials/annotations/annotation-details.tpl.html',
#     #       controller: 'AnnotationDetailsCtrl'
#     #     }
#     #   }
#     # }).state('app.projects', {
#     #   url: '/projects',
#     #   views: {
#     #     'mainContentArea@': {
#     #       templateUrl: 'partials/projects/projects.tpl.html',
#     #       controller: 'ProjectCtrl'
#     #     }
#     #   }
#     # }).state('app.projects.det
ails', {
#     #   url: '/:projectID',
#     #   views: {
#     #     'mainContentArea@': {
#     #       templateUrl: 'partials/projects/project-details.tpl.html',
#     #       controller: 'ProjectDetailsCtrl'
#     #     }
#     #   }
#     # });
#     # `
#     em.unit
# ]
