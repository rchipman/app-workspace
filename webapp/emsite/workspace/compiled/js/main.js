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
