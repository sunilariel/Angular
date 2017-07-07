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
          
          

            ////Set default working hours for Employee//
            //for(var i=0;i<$scope.ListofStaff.length;i++) {
            //    debugger;
            //    angular.forEach($scope.WorkingHours, function (value, key) {
            //        bool = true;
            //        if (value.Available == true)
            //        {
            //            bool = false;
            //        }
            //        var CurrentDate = new Date();                    
            //        var workinghours =
            //        {
            //            "Id": 1,
            //            "CompanyId": $routeParams.CompanyId,
            //            "EmployeeId": $scope.ListofStaff[i].Id,
            //            "Start": value.StartTime + ":00.1234567",
            //            "End": value.EndTime + ":00.1234567",
            //            "NameOfDay": value.NameOfDay,
            //            "NameOfDayAsString": value.Day,
            //            "IsOffAllDay": bool,
            //            "CreationDate": CurrentDate
            //        }
            //        var result = bookingService.SetEmployeeWorkingHours(workinghours);
            //    });
            //}
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
                }, 800)

                //////////////////////

              
                //Set Working hours in Staff Section in MileStone_4//

                $scope.StartTime = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00 ", "19:00", "20:00"];
                $scope.EndTime = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00 ", "19:00", "20:00"];

                $scope.WorkingHours = [{ "Day": "Monday", "StartTime": "08:00", "EndTime": "17:00", "Available": true, "NameOfDay": 1 },
               { "Day": "Tuesday", "StartTime": "08:00", "EndTime": "17:00", "Available": true, "NameOfDay": 2 },
               { "Day": "Wednesday", "StartTime": "08:00", "EndTime": "17:00", "Available": true, "NameOfDay": 3 },
               { "Day": "Thursday", "StartTime": "08:00", "EndTime": "17:00", "Available": true, "NameOfDay": 4 },
               { "Day": "Friday", "StartTime": "08:00", "EndTime": "17:00", "Available": true, "NameOfDay": 5 },
               { "Day": "Saturday", "StartTime": "08:00", "EndTime": "17:00", "Available": false, "NameOfDay": 6 },
               { "Day": "Sunday", "StartTime": "08:00", "EndTime": "17:00", "Available": false, "NameOfDay": 0 }
                ]
               
                angular.forEach($scope.WorkingHours, function (value, key) {
                    bool = true;
                    if (value.Available == true) {
                        bool = false;
                    }
                    var CurrentDate = new Date();
                    var workinghours =
                    {
                        "Id": 1,
                        "CompanyId": $routeParams.CompanyId,
                        "EmployeeId": response.data.ReturnObject.EmloyeeId,
                        "Start": value.StartTime + ":00.1234567",
                        "End": value.EndTime + ":00.1234567",
                        "NameOfDay": value.NameOfDay,
                        "NameOfDayAsString": value.Day,
                        "IsOffAllDay": bool,
                        "CreationDate": CurrentDate
                    }
                    var result = bookingService.SetEmployeeWorkingHours(workinghours);
                });
                /////////////
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

        $scope.GetAllWorkingHoursOfEmployees(item.Id);
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
                            }, 800)
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
                    
                    var responseresult = bookingService.UnAssignServicetoStaff($routeParams.CompanyId, $scope.StaffId, value.Id);
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

    

    $scope.EnabledDisabledDay =function(timeInfo)
    {
        debugger;
        angular.forEach($scope.WorkingHours, function (value, key) {
            if(timeInfo.Day==value.Day)
            {
                var CurrentDate = new Date();
                var starttime = value.StartTime.split(" ");
                var endtime = value.EndTime.split(" ");

                if(timeInfo.Available==false)
                {                                      
                    var workinghours=
                    {
                        "Id": 1,
                        "CompanyId": $routeParams.CompanyId,
                        "EmployeeId": $scope.StaffId,
                        "Start": starttime[0] + ":00.1234567",
                        "End": endtime[0] + ":00.1234567",
                        "NameOfDay": value.NameOfDay,
                        "NameOfDayAsString": value.Day,
                        "IsOffAllDay": false,
                        "CreationDate": CurrentDate
                    }
                    var result = bookingService.SetEmployeeWorkingHours(workinghours);
                    result.then(function (response) {
                        if(response.data.Success==true)
                        {
                            $scope.MessageText = "Saving Staff Working Hours";
                            $scope.IsVisible = true;
                            $timeout(function () {
                                $scope.MessageText = "Staff working hours saved"
                                $timeout(function () {
                                    $scope.IsVisible = false;
                                },1000);
                            },800);
                        }
                    });

                    value.Available = true;
                }
                else
                {
                    var workinghours =
                   {
                       "Id": 1,
                       "CompanyId": $routeParams.CompanyId,
                       "EmployeeId": $scope.StaffId,
                       "Start": starttime[0] + ":00.1234567",
                       "End": endtime[0] + ":00.1234567",
                       "NameOfDay": value.NameOfDay,
                       "NameOfDayAsString": value.Day,
                       "IsOffAllDay": true,
                       "CreationDate": CurrentDate
                   }
                    var result = bookingService.SetEmployeeWorkingHours(workinghours);
                    result.then(function (response) {
                        if (response.data.Success == true) {
                            $scope.MessageText = "Saving Staff Working Hours";
                            $scope.IsVisible = true;
                            $timeout(function () {
                                $scope.MessageText = "Staff working hours saved"
                                $timeout(function () {
                                    $scope.IsVisible = false;
                                }, 1000);
                            }, 800);
                        }
                    });
                    value.Available = false;
                }
            }
        });       
    }

    //Set Enable and disable working Time
    $scope.SetEmployeeWorkingTime = function (timedetail) {
        debugger;
        var CurrentDate = new Date();
        var starttime = timedetail.StartTime.split(" ");
        var endtime = timedetail.EndTime.split(" ");
                                          
            var workinghours=
            {
                "Id": 1,
                "CompanyId": $routeParams.CompanyId,
                "EmployeeId": $scope.StaffId,
                "Start": starttime[0] + ":00.1234567",
                "End": endtime[0] + ":00.1234567",
                "NameOfDay": timedetail.NameOfDay,
                "NameOfDayAsString": timedetail.Day,
                "IsOffAllDay": false,
                "CreationDate": CurrentDate
            }
            var result = bookingService.SetEmployeeWorkingHours(workinghours);
            result.then(function (response) {
                if(response.data.Success==true)
                {
                    $scope.MessageText = "Saving Staff Working Hours";
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "Staff working hours saved"
                        $timeout(function () {
                            $scope.IsVisible = false;
                        },1000);
                    },800);
                }
            });
    }

    //Get Working Hours of Employee//
    $scope.GetAllWorkingHoursOfEmployees = function (EmployeeId) {
        debugger
        var result = bookingService.GetWorkingHoursofEmployee(EmployeeId);
        result.then(function (response) {
            $scope.WorkingHours = [];
            angular.forEach(response.data,function(value,key)
            {
                var start = value.Start.split(":");
                var end = value.End.split(":");
                var available = false;
                if (value.IsOffAllDay == false)
                {
                    available = true;
                }
                $scope.WorkingHours.push({ "Day": value.NameOfDayAsString, "StartTime": start[0] + ":00", "EndTime": end[0] + ":00", "Available": available, "NameOfDay": value.NameOfDay });
            })
        });
    }

}]);