app.controller("servicesController", ['$scope', '$http', '$routeParams', '$timeout', '$location','bookingService', function ($scope, $http, $routeParams, $timeout, $location,bookingService) {


    //Redirection to different pages////
    $scope.redirecttoCustomer = function () {
        $location.path("/customer/" + $routeParams.CompanyId);
    }
    $scope.RedirecttoStaff = function () {
        $location.path("/Setting/" + $routeParams.CompanyId);
    }
    $scope.redirecttodashboard = function () {        
        $location.path("/dashboard/" + $routeParams.CompanyId);
    }
    $scope.redirecttoServices = function () {
        $location.path("/Services/" + $routeParams.CompanyId);
    }


    $scope.init = function () {
        debugger;
        var CompanyId = $routeParams.CompanyId;
        var responsedata = bookingService.GetCategories(CompanyId);
        responsedata.then(function (response) {
            if (response.data.length > 0) {
                $scope.AllCategories = [];
                $scope.AllCategories = response.data;
            }
        })
    }

    $scope.AddCategory = function () {
        debugger;
        var CurrentDate=new Date();
        var data = {
            "Id": "",
            "CompanyId": $routeParams.CompanyId,
            "Name": $scope.CategoryName,
            "CreationDate": CurrentDate
        }
        var response = bookingService.AddCategory(data);

        response.then(function (response) {
            if(response.data.Success==true)
            {
                var CompanyId = $routeParams.CompanyId;
                var responsedata = bookingService.GetCategories(CompanyId);
                responsedata.then(function (response) {
                    if (response.data.length > 0) {
                        $scope.AllCategories = [];
                        $scope.AllCategories = response.data;
                    }
                })
                $scope.MessageText = "Adding new Category";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.IsVisible = false;
                }, 500);
            }
        });
    }

    $scope.SaveService = function () {
        debugger;          
            var service = {
                "Id": "",
                "CompanyId": $routeParams.CompanyId,
                "Name": $scope.ServiceName,
                "CategoryName": "sample string 4",
                "CategoryId": null,
                "DurationInMinutes": $scope.ServiceTime,
                "DurationInHours": 0,
                "Cost": $scope.ServiceCost,
                "Currency": "sample string 9",
                "CreationDate": "2017-06-26T11:08:28.4943519+00:00"
            }

            var responsedata = bookingService.AddService(service);

            responsedata.then(function (response) {
                debugger;
                if (response.data.Success == true) {
                    $scope.ServiceId = response.data.ReturnObject.ServiceId;;
                    angular.forEach($scope.AllCategories, function (value, key) {
                        if (value.hasOwnProperty("Confirmed")==true) {
                            if (value.Confirmed == true) {
                                var responsedata = bookingService.AssignCategoryToService($scope.ServiceId, value.Id);
                                responsedata.then(function (response) {
                                    if (response.data == "Success") {
                                        $scope.MessageText = "";
                                    }
                                })
                            }
                        }
                    });
                }
            })

       
    }
}]);