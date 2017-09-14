app.controller("CustomerReportsController", ['$scope','$routeParams','$location', function ($scope, $routeParams, $location) {
    //Redirection to different tab section//
    $scope.RedirecttoBuisnessReport = function () {
        debugger;
        $location.path("/BuisnessReports/:CompanyId");
    }
    $scope.RedirecttoResourceReport = function () {
        $location.path("/ResourceReports/"+ $routeParams.CompanyId);
    }
    $scope.RedirecttoServiceReport = function () {
        $location.path("/ServiceReports/"+ $routeParams.CompanyId);
    }
    $scope.RedirecttoCustomerReport = function () {
        $location.path("/CustomerReports/"+  $routeParams.CompanyId);
    }
    $scope.redirecttoCustomer = function () {
        $location.path("/customer/" + $routeParams.CompanyId);
    }

    $scope.redirectToCalendar = function () {

        $location.path("/Calendar/" + $routeParams.CompanyId);
    }

    $scope.RedirecttoStaff = function () {
        $location.path("/Setting/" + $routeParams.CompanyId);
    }

    $scope.RedirecttoReport = function () {
        $location.path("/BuisnessReports/" + $routeParams.CompanyId);
    }
}])