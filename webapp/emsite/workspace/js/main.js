/* can't see any functional difference between this js and the example */

var Workspace = angular.module('Workspace', ['ngTable']);

Workspace.controller('collabTable', function($scope, $filter, ngTableParams) {
	 var data = 
		  [
		  {id: '47', project: 'July 2014', collab: 'Cover page Belize', owner: 'Shane Sandefur', approval: '3/5', last: '6/7/14'},
		  {id: '113', project: 'July 2014', collab: 'Honeybee colony collapse infographic', owner: 'Hilde Schwarzbiene', approval: '7/7', last: '6/4/14'},
		  {id: '57', project: 'Advertising', collab: 'Antarctica cruise ad 3', owner: 'James Roberson', approval: '1/3', last: '5/31/14'},
		  {id: '133', project: 'August 2014', collab: 'new TOC layout', owner: 'Bill Brasky', approval: '4/5', last: '6/17/14'}
		  ]
	      $scope.tableParams = new ngTableParams({
	    	  page: 1,				// show first page
	    	  count: 5,				// show 5 per page
	    	  sorting: {			// sorting init
	    		  id: 'asc'
	    	  }
	      }, {
	    	  total: data.length, 	// length of data var
	    	  getData: function($defer, params) {
	              // use build-in angular filter
	              var orderedData = params.sorting() ?
	                                  $filter('orderBy')(data, params.orderBy()) :
	                                  data;
	                                  
                  $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	    	  }    
	      });
  });
