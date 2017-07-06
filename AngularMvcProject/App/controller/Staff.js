app.controller("staffController", ['$scope', '$http', '$routeParams', '$timeout', '$location', 'bookingService', function ($scope, $http, $routeParams, $timeout, $location, bookingService) {


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

    $scope.init = function () {
        debugger;
        $scope.isvisibleMenuiconBar = true;
        $scope.IsVisibleAddNewStaffPopUp = false;

        //Use Wizard Controller to get AllStaffList through api//
        var StaffResult = bookingService.GetAllStaff($routeParams.CompanyId);
        StaffResult.then(function (response) {           
            $scope.ListofStaff = [];
            $scope.ListofStaff = response.data;
            $scope.TotalNoOfStaff = $scope.ListofStaff.length;
            $scope.EditStaff(response.data[0]);
        });

     
       
    }

    //Add Staff//
    $scope.AddStaff = function (form) {
        debugger;
        if(form.$invalid==true)
        {
            if(form.StaffName.$invalid==true)
            {            
              form.StaffName.$setTouched();
            }
            return false;
        }

        var CurrentDate=new Date();
        var requestedstaff = {           
                "Id": "",
                "CompanyId": $routeParams.CompanyId,
                "UserName": $scope.StaffEmail,
                "Password": "sample string 4",
                "FirstName": $scope.StaffName,
                "LastName": "sample string 6",
                "Address": "sample string 7",
                "Email": $scope.StaffEmail,
                "TelephoneNo": "sample string 9",
                "CreationDate": CurrentDate            
        }

        var result = bookingService.AddStaff(requestedstaff);
        result.then(function(response)
        {
            if(response.data.Success==true)
            {
                //$scope.StaffId= response.data.ReturnObject.EmloyeeId;
                $scope.MessageText = "Adding new Staff";
                $scope.IsVisible = true;
                $scope.init();
                $timeout(function()
                {
                    $scope.MessageText = "New Staff Added";
                    $timeout(function () {
                        $scope.IsVisible = false;
                    },1000);
                },800)
            }
        })
    }

    $scope.EditStaff=function(item)
    {
        debugger;
        $scope.StaffId = item.Id;
        $scope.staffName = item.FirstName;
        $scope.staffEmail = item.Email;


        var ServiceResult = bookingService.GetAllServiceStatus($routeParams.CompanyId, item.Id);
        ServiceResult.then(function (response) {
            $scope.ListofAllServices = [];
            $scope.ListofAllServices.push({ "Id": "", "CompanyId": $routeParams.CompanyId, "Name": "All Staff", "CategoryName": "", "CategoryId": "", "DurationInMinutes": "", "Cost": "", "Currency": "", "CreationDate": new Date() })
            angular.forEach(response.data, function (value, key) {
                $scope.ListofAllServices.push({ "Id": value.Id, "CompanyId": value.CompanyId, "Name": value.Name, "CategoryName": value.CategoryName, "CategoryId": value.CategoryId, "DurationInMinutes": value.DurationInMinutes, "Cost": value.Cost, "Currency": value.Currency, "CreationDate": new Date(), "Confirmed": value.Confirmed })
            });
            $scope.EmployeeServiceCount = response.data[0].AllocatedServiceCount;
            for (var i = 1; i < $scope.ListofAllServices.length; i++) {
                if ($scope.ListofAllServices[i].Confirmed == true) {
                    $scope.ListofAllServices[0].Confirmed = true;
                }
                else {
                    $scope.ListofAllServices[0].Confirmed = false;
                    break;
                }
            }
        });             
    }

    $scope.UpdateStaff = function () {
        debugger;
        var CurrentDate = new Date();
        var requestedStaff=
        {
            "Id": $scope.StaffId,
            "CompanyId": $routeParams.CompanyId,
            "UserName": $scope.staffEmail,
            "Password": "sample string 4",
            "FirstName": $scope.staffName,
            "LastName": "sample string 6",
            "Address": "sample string 7",
            "Email": $scope.staffEmail,
            "TelephoneNo": "sample string 9",
            "CreationDate": CurrentDate
        }
        var responseresult = bookingService.UpdateStaff(requestedStaff);
        responseresult.then(function (response) {
            if(response.data.Success==true)
            {
                $scope.IsVisible = true;
                $scope.MessageText = "Saving Staff Details";
                $timeout(function () {
                    $scope.MessageText = "Staff Details Saved";
                    $timeout(function () {
                        $scope.IsVisible = false;
                    },1000)
                },800)
            }
        });
    }

    $scope.AssignServicetoEmployee = function (item) {
        debugger;
        if(item.Confirmed==true)
        {
            //Assigned All Service to Staff
            if (item.Name == "All Staff") {
                angular.forEach($scope.ListofAllServices, function (value, key) {

                    value.Confirmed = true;
                    var requestedservice = {
                        "Id": "",
                        "CompanyId": $routeParams.CompanyId,
                        "EmployeeId": $scope.StaffId,
                        "ServiceId": value.Id,
                        "CreationDate": new Date()
                    }

                    var responseresult = bookingService.AssignedServicetoStaff(requestedservice);
                    responseresult.then(function (response) {
                        if (response.data.Success == true) {
                            $scope.MessageText = "Assigning all Service to Staff.";
                            $scope.IsVisible = true;
                            $timeout(function () {
                                $scope.MessageText = "Staff services saved.";
                                $timeout(function () {
                                    $scope.IsVisible = false;
                                }, 1000)
                            }, 500)
                        }
                    })
                });
               
            }
            else {
                //Assign Service to Staff
                var requestedservice = {
                    "Id": "",
                    "CompanyId": $routeParams.CompanyId,
                    "EmployeeId": $scope.StaffId,
                    "ServiceId": item.Id,
                    "CreationDate": new Date()
                }
                var responseresult = bookingService.AssignedServicetoStaff(requestedservice);
                responseresult.then(function (response) {
                    $scope.MessageText = "Assigning Service to Staff.";
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "Staff services saved.";
                        $timeout(function () {
                            $scope.IsVisible = false;
                        },1000)
                    },500)
                })
            }
        }
        else {
            //UnAssign All Service to Staff
            if (item.Name == "All Staff") {
                angular.forEach($scope.ListofAllServices, function (value, key) {
                    value.Confirmed = false;
                    var requestedservice = {
                        "Id": "",
                        "CompanyId": $routeParams.CompanyId,
                        "EmployeeId": $scope.StaffId,
                        "ServiceId": value.Id,
                        "CreationDate": new Date()
                    }
                    var responseresult = bookingService.AssignedServicetoStaff(requestedservice);
                    responseresult.then(function (response) {
                        if (response.data.Success == true) {
                            $scope.MessageText = "Unassigning all Service to Staff.";
                            $scope.IsVisible = true;
                            $timeout(function () {
                                $scope.MessageText = "Staff services saved.";
                                $timeout(function () {
                                    $scope.IsVisible = false;
                                }, 1000)
                            }, 500)
                        }
                    })
                });
               
            }
            else
            {
                //Unassign Service to Staff//
                var responseresult = bookingService.UnAssignServicetoStaff($routeParams.CompanyId, $scope.StaffId, item.Id);
            responseresult.then(function (response) {
                if(response.data.Success==true)
                {
                    $scope.MessageText = "Removing Service from Staff.";
                    $scope.IsVisible = true;

                    $timeout(function () {
                        $scope.MessageText = "Staff services saved.";
                        $timeout(function () {
                            $scope.IsVisible = false;
                        },1000)
                    },500)
                }
            })
         }
        }

        for (var i = 1; i < $scope.ListofAllServices.length; i++)
        {
            if ($scope.ListofAllServices[i].Confirmed == true)
            {
                $scope.ListofAllServices[0].Confirmed = true;
            }
            else {
                $scope.ListofAllServices[0].Confirmed = false;
                break;
            }
        }

    }
}]);