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
        });
        var ServiceResult = bookingService.GetAllService($routeParams.CompanyId);
        ServiceResult.then(function(response)
        {
            $scope.ListofServices = [];
            $scope.ListofServices = response.data;
        })
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
    }

    $scope.UpdateStaff = function () {
        var CurrentDate = new Date();
        var requestedStaff=
        {
            "Id": $scope.StaffId,
            "CompanyId": $routeParams.CompanyId,
            "UserName": $scope.Email,
            "Password": "sample string 4",
            "FirstName": $scope.FirstName,
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
}]);