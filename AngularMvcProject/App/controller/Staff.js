﻿app.controller("staffController", ['$scope', '$http', '$routeParams','$filter', '$timeout', '$location', 'bookingService', function ($scope, $http, $routeParams,$filter, $timeout, $location, bookingService) {


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
        
        //$scope.alldaystatus = true;
     
        $scope.startdate = $filter('date')(new Date(), "dd MMMM yyyy");
        $scope.enddate = $filter('date')(new Date(), "dd MMMM yyyy");

        //Use Wizard Controller to get AllStaffList through api//
        var StaffResult = bookingService.GetAllStaff($routeParams.CompanyId);
        StaffResult.then(function (response) {           
            $scope.ListofStaff = [];
            $scope.ListofStaff = response.data;
            $scope.TotalNoOfStaff = $scope.ListofStaff.length;
          
          
            $scope.StartTime = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"];
            $scope.EndTime = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"];

         
           

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
            //            "Start": value.StartTime,
            //            "End": value.EndTime,
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
                //$scope.init();
                $timeout(function()
                {
                    $scope.MessageText = "New Staff Added";
                    $timeout(function () {
                        $scope.IsVisible = false;
                        $scope.IsVisibleAddNewStaffPopUp = false;
                        var StaffResult = bookingService.GetAllStaff($routeParams.CompanyId);
                        StaffResult.then(function (response) {
                            $scope.ListofStaff = [];
                            $scope.ListofStaff = response.data;
                            $scope.TotalNoOfStaff = $scope.ListofStaff.length;
                        });
                    },1000);
                }, 800)

                //////////////////////
              
                //Set Working hours in Staff Section in MileStone_4//
                $scope.WorkingHours = [{ "Day": "Monday", "StartTime": "08:00 AM", "EndTime": "05:00 PM", "Available": true, "NameOfDay": 1 },
             { "Day": "Tuesday", "StartTime": "08:00 AM", "EndTime": "05:00 PM", "Available": true, "NameOfDay": 2 },
             { "Day": "Wednesday", "StartTime": "08:00 AM", "EndTime": "05:00 PM", "Available": true, "NameOfDay": 3 },
             { "Day": "Thursday", "StartTime": "08:00 AM", "EndTime": "05:00 PM", "Available": true, "NameOfDay": 4 },
             { "Day": "Friday", "StartTime": "08:00 AM", "EndTime": "05:00 PM", "Available": true, "NameOfDay": 5 },
             { "Day": "Saturday", "StartTime": "08:00 AM", "EndTime": "05:00 PM", "Available": false, "NameOfDay": 6 },
             { "Day": "Sunday", "StartTime": "08:00 AM", "EndTime": "05:00 PM", "Available": false, "NameOfDay": 0 }
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
                        "Start": value.StartTime,
                        "End": value.EndTime ,
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
        $scope.GetTimeOffDetail(item.Id);
        $scope.GetWorkingHoursOfEmployee(item.Id);

        //Active and DeActive tab in Staff Section
        var tabelement1 = angular.element(document.querySelector("#StaffDetailsLink"));
        tabelement1.addClass('active');
        var divelement1 = angular.element(document.querySelector("#staff_details"));
        divelement1.addClass('active');
        var tabelement2 = angular.element(document.querySelector("#StaffServicesLink"));
        tabelement2.removeClass('active');
        var tabelement3 = angular.element(document.querySelector("#StaffHoursLink"));
        tabelement3.removeClass('active');
        var tabelement4 = angular.element(document.querySelector("#StaffBreakLink"));
        tabelement4.removeClass('active');
        var tabelement5 = angular.element(document.querySelector("#StaffTimeOffLink"));
        tabelement5.removeClass('active');
        
    }


    //Delete  Staff by using wizard Controller DeleteStaff method by api
    $scope.DeleteStaff = function () {
        debugger;
        var result = bookingService.DeleteStaff($scope.StaffId);
        result.then(function (response) {
            if(response.data.Success==true)
            {
                $scope.MessageText = "Deleting Staff.";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.MessageText = "Staff Deleted.";
                    $timeout(function()
                    {
                        $scope.IsVisible = false;
                        var StaffResult = bookingService.GetAllStaff($routeParams.CompanyId);
                        StaffResult.then(function (response) {
                            $scope.ListofStaff = [];
                            $scope.ListofStaff = response.data;
                            $scope.TotalNoOfStaff = $scope.ListofStaff.length;
                        });
                    },1000)
                },800)
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
               

                if(timeInfo.Available==false)
                {                                      
                    var workinghours=
                    {
                        "Id": 1,
                        "CompanyId": $routeParams.CompanyId,
                        "EmployeeId": $scope.StaffId,
                        "Start": value.StartTime ,
                        "End": value.EndTime,
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
                       "Start": value.StartTime,
                       "End": value.EndTime,
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
      
                                          
            var workinghours=
            {
                "Id": 1,
                "CompanyId": $routeParams.CompanyId,
                "EmployeeId": $scope.StaffId,
                "Start": timedetail.StartTime ,
                "End": timedetail.EndTime,
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
    $scope.GetWorkingHoursOfEmployee = function (EmployeeId) {
        debugger
        var result = bookingService.GetWorkingHoursofEmployee(EmployeeId);
        result.then(function (response) {
            $scope.WorkingHours = [];
            angular.forEach(response.data,function(value,key)
            {            
                var available = false;
                if (value.IsOffAllDay == false)
                {
                    available = true;
                }
                $scope.WorkingHours.push({ "Id":value.Id,"EmployeeId":value.EmployeeId,"Day": value.NameOfDayAsString, "StartTime": value.Start , "EndTime": value.End , "Available": available, "NameOfDay": value.NameOfDay });
            })
        });
    }


    //Set Time Off//
    $scope.AddtimeOff = function () {
        debugger;
      
        
        var timeOff = {           
            "CompanyId": $routeParams.CompanyId,
            "EmployeeId": $scope.StaffId,
            "StartDate": $scope.startdate ,
            "EndDate": $scope.enddate ,
            "StartTime": $scope.StartoffTime,
            "EndTime":$scope.EndoffTime,
            "CreationDate": new Date(),
            "IsOffAllDay": $scope.alldaystatus
        }
        var result = bookingService.AddtimeOff(timeOff);
        result.then(function (response) {
            if (response.data.Success == true) {
                $scope.MessageText = "Saving TimeOff";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.MessageText = "TimeOff Saved";
                    $timeout(function () {
                        $scope.IsVisible = false;
                        angular.element(document.querySelector('#timeoffPopUp')).css('display','None');
                        $scope.isVisibleTimeOffPopup = true;
                        $scope.GetTimeOffDetail($scope.StaffId);
                       
                    }, 1000)
                }, 800)
            }
        });
    }
   
    $scope.GetTimeOffDetail = function (Id) {
        debugger;
        var result = bookingService.GetTimeOffDetail(Id);
        result.then(function (response) {
            $scope.timeOffDetail = response.data;
        });
    }
}]);