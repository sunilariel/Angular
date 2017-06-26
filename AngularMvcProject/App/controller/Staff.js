app.controller("staffController", ['$scope', '$http', '$routeParams', '$timeout', '$location', function ($scope, $http, $routeParams, $timeout, $location) {


    $scope.showstaffpopup = false;
    //Redirection//

    $scope.redirecttoCustomer = function () {
        $location.path("/customer/" + $routeParams.CompanyId);
    }
    $scope.RedirecttoStaff = function () {
        $location.path("/Setting/" + $routeParams.CompanyId);
    }
    $scope.redirecttodashboard = function () {
        debugger;
        $location.path("/dashboard/" + $routeParams.CompanyId);
    }
    $scope.redirecttoServices=function()
    {
        $location.path("/Services/" + $routeParams.CompanyId);
    }


}]);