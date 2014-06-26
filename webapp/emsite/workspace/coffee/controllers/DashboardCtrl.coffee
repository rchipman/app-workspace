Workspace.controller 'DashboardCtrl',
['$scope',
($scope) ->
    $scope.testChangeButton =
    (text) ->
        text = 'now test is this!' if not text

        $scope.test = text

        em.unit
    em.unit
]
