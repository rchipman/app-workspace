var Workspace, em;

em = (function() {
	var unit;

	function em() {}

	unit = {};

	em.unit = unit;

	return em;

})();

Workspace = angular.module('Workspace', ['ui.router', 'ngTable', 'colorpicker.module', 'btford.socket-io']);

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
				'svgIncludes': {
					templateUrl: 'partials/svg/svg-definitions.tpl.html'
			},
				'mainMenu': {
					templateUrl: 'partials/navigation/main-menu.tpl.html'
				},
				'sidebar': {
					templateUrl: 'partials/navigation/sidebar.tpl.html',
					controller: 'SidebarCtrl'
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
		}).state('app.programs', {
			url: '/#/',
			views: {
				'mainContentArea@': {
					templateUrl: 'partials/projects/program-details.tpl.html',
					controller: 'ProgramDetailsCtrl'
				}
			}
		}).state('app.libraries', {
			url: '/#/',
			views: {
				'mainContentArea@': {
					templateUrl: 'partials/projects/library-details.tpl.html',
					controller: 'LibraryDetailsCtrl'
				}
			}
		}).state('app.collections', {
			url: '/#/',
			views: {
				'mainContentArea@': {
					templateUrl: 'partials/projects/collection-details.tpl.html',
					controller: 'CollectionDetailsCtrl'
				}
			}
		});
		return em.unit;
	}
]);
