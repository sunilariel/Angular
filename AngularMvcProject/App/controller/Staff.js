app.controller("staffController", ['$scope', '$http', '$routeParams', '$filter', '$timeout', '$location', 'bookingService', '$rootScope','$route',
    function ($scope, $http, $routeParams, $filter, $timeout, $location, bookingService, $rootScope, $route) {


    $scope.showstaffpopup = false;
    //Redirection//

    $scope.redirecttoCustomer = function () {
        $location.path("/customer/" + $routeParams.CompanyId);
    }
    $scope.redirectToCalendar = function () {
        $location.path("/Calendar/" + $routeParams.CompanyId);
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
    $scope.RedirecttoReport = function () {
        $location.path("/BuisnessReports/" + $routeParams.CompanyId);
    }
    $scope.init = function () {
        debugger;
        $scope.ShowDeletePopUp=false;
        $scope.isvisibleMenuiconBar = true;
        $scope.IsVisibleAddNewStaffPopUp = false;
        
        //$scope.alldaystatus = true;
     
        $scope.startdate = $filter('date')(new Date(), "dd MMM yyyy");
        $scope.enddate = $filter('date')(new Date(), "dd MMM yyyy");

        //Use Wizard Controller to get AllStaffList through api//
        var StaffResult = bookingService.GetAllStaff($routeParams.CompanyId);
        StaffResult.then(function (response) {           
            $scope.ListofStaff = [];
            $scope.ListofStaff = response.data;
            $scope.TotalNoOfStaff = $scope.ListofStaff.length;
          
          
           // $scope.StartTime = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"];

            $scope.StartTime = ["12:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"];
            $scope.EndTime = ["12:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"];

           // $scope.EndTime = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"];

            if (response.data.length > 0) {
                $scope.EditStaff(response.data[0]);
            }
        });
        var CompanyDetails = bookingService.GetCompanyDetails($routeParams.CompanyId);
        CompanyDetails.then(function (response) {

            $scope.companyEmail = response.data.Email;
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
                "Password": "",
                "FirstName": $scope.StaffName,
                "LastName": "",
                "Address": "",
                "Email": $scope.StaffEmail,
                "TelephoneNo": "",
                "CreationDate": CurrentDate            
        }

        var result = bookingService.AddStaff(requestedstaff);
        result.then(function(response)
        {
            if (response.data.Success == false) {
                if (response.data.Message.includes("Already member")) {
                    $scope.MessageText = "Staff already exists!";
                    $scope.IsVisible = true;
                }
                $timeout(function () {
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.IsVisible = false;
                    },800)
                },1000)
            }

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

                        //Clear the form elements value//
                        $scope.StaffEmail = "";
                        $scope.StaffName = "";
                        form.StaffName.$setUntouched();
                        form.StaffName.$untouched = true;

                        var StaffResult = bookingService.GetAllStaff($routeParams.CompanyId);
                        StaffResult.then(function (response) {
                            $scope.ListofStaff = [];
                            $scope.ListofStaff = response.data;
                            $scope.EditStaff(response.data[0]);
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
            }
        })
    }

    $scope.StaffCancel = function(form) {
        debugger;
        $scope.IsVisibleAddNewStaffPopUp = false
        //Clear the form elements value
        $scope.StaffEmail = "";
        $scope.StaffName = "";      
        form.StaffName.$untouched = true;
        form.StaffName.$setUntouched();
     
    }



    $scope.EditStaff=function(item)
    {
        debugger;
        $scope.StaffId = item.Id;
        $scope.staffName = item.FirstName;
        $scope.staffEmail = item.Email;
        $scope.staffMobileNo = item.TelephoneNo;
        
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
        angular.element(document.querySelector("#staff-break")).removeClass('active');
        angular.element(document.querySelector("#staff-hours")).removeClass('active');
        angular.element(document.querySelector("#staff-timeoff")).removeClass('active');
        angular.element(document.querySelector("#staff-services")).removeClass('active');
       

        var ServiceResult = bookingService.GetAllServiceStatus($routeParams.CompanyId, item.Id);
        ServiceResult.then(function (response) {
            $scope.ListofAllServices = [];
            if (response.data.length > 0) {
                $scope.ListofAllServices.push({ "Id": "", "CompanyId": $routeParams.CompanyId, "Name": "All Services", "CategoryName": "", "CategoryId": "", "DurationInMinutes": "", "Cost": "", "Currency": "", "CreationDate": new Date() })
            }
            angular.forEach(response.data, function (value, key) {
                $scope.ListofAllServices.push({ "Id": value.Id, "CompanyId": value.CompanyId, "Name": value.Name, "CategoryName": value.CategoryName, "CategoryId": value.CategoryId, "DurationInMinutes": value.DurationInMinutes, "Cost": value.Cost, "Currency": value.Currency, "CreationDate": new Date(), "Confirmed": value.Confirmed })
              //  $scope.EmployeeServiceCount = response.data.length;
            });
            if (response.data.length > 0) {
                $scope.EmployeeServiceCount = response.data[0].AllocatedServiceCount;
            }
            else {
                $scope.EmployeeServiceCount = 0;
            }
          
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

      
        
        ///BreakTimeHours//
        var BreakTimeHours = bookingService.GetBreakTimeHoursofEmployee(item.Id);
        BreakTimeHours.then(function (response) {
            debugger;
            $scope.listofBreakingHours = [];            
                for( var i=0;i<response.data.length;i++)
                {
                    $scope.listofBreakingHours.push({ "EmployeeId": response.data[i].EmployeeId, "Id": response.data[i].Id, "Available": response.data[i].Available, "CompanyId": response.data[i].CompanyId, "Day": response.data[i].Day, "DayOfWeek": response.data[i].DayOfWeek, "CreationDate": response.data[i].CreationDate, "StartEndTime": response.data[i].StartEndTime });
                }

            //}
        })
    }

    //Delete Staff by using wizard Controller DeleteStaff method by api
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
                        $scope.ShowDeletePopUp = false;
                        var StaffResult = bookingService.GetAllStaff($routeParams.CompanyId);
                        StaffResult.then(function (response) {
                            $scope.ListofStaff = [];
                            $scope.ListofStaff = response.data;
                            if (response.data.length > 0) {
                                $scope.EditStaff(response.data[0]);
                            }
                            else {                                
                                $route.reload();
                            }
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
        if ($scope.StaffId != null) {
            var requestedStaff =
            {
                "Id": $scope.StaffId,
                "CompanyId": $routeParams.CompanyId,
                "UserName": $scope.staffEmail,
                "Password": "",
                "FirstName": $scope.staffName,
                "LastName": "",
                "Address": "",
                "Email": $scope.staffEmail,
                "TelephoneNo": $scope.staffMobileNo,
                "CreationDate": CurrentDate
            }
            var responseresult = bookingService.UpdateStaff(requestedStaff);
            responseresult.then(function (response) {
                if (response.data.Success == true) {
                    $scope.IsVisible = true;
                    $scope.MessageText = "Saving Staff Details";
                    $timeout(function () {
                        $scope.MessageText = "Staff Details Saved";
                        $timeout(function () {
                            var StaffResult = bookingService.GetAllStaff($routeParams.CompanyId);
                            StaffResult.then(function (response) {
                                $scope.ListofStaff = [];
                                $scope.ListofStaff = response.data;
                                $scope.TotalNoOfStaff = $scope.ListofStaff.length;
                            });
                            $scope.IsVisible = false;
                        }, 1000)
                    }, 800)
                }
            });
        }
    }

    $scope.AssignServicetoEmployee = function (item) {
        debugger;
        if(item.Confirmed==true)
        {
            //Assigned All Service to Staff
            if (item.Name == "All Staff") {
               // angular.forEach($scope.ListofAllServices, function (value, key) {
                for (var i = 0; i < $scope.ListofAllServices.length; i++)
                {
                    if(i>0){
                        $scope.ListofAllServices[i].Confirmed = true;
                    var requestedservice = {
                        "Id": "",
                        "CompanyId": $routeParams.CompanyId,
                        "EmployeeId": $scope.StaffId,
                        "ServiceId": $scope.ListofAllServices[i].Id,
                        "CreationDate": new Date()
                    }

                    var responseresult = bookingService.AssignedServicetoStaff(requestedservice);
                    responseresult.then(function (response) {
                        if (response.data.Success == true) {
                            $scope.MessageText = "Assigning all Service to Staff.";
                            $scope.IsVisible = true;
                            $timeout(function () {
                                $scope.MessageText = "Staff services saved.";
                                $scope.GetAllocatedStaffServiceCount();
                                $timeout(function () {
                                    $scope.IsVisible = false;
                                }, 1000)
                            }, 800)
                        }
                    })

                }
                }
               
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
                        $scope.GetAllocatedStaffServiceCount();
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
                // angular.forEach($scope.ListofAllServices, function (value, key) {
                for (var i = 0; i < $scope.ListofAllServices.length; i++) {
                    if (i > 0) {
                        $scope.ListofAllServices[i].Confirmed = false;

                        var responseresult = bookingService.UnAssignServicetoStaff($routeParams.CompanyId, $scope.StaffId, $scope.ListofAllServices[i].Id);
                        responseresult.then(function (response) {
                            if (response.data.Success == true) {
                                $scope.MessageText = "Unassigning all Service to Staff.";
                                $scope.IsVisible = true;
                                $timeout(function () {
                                    $scope.MessageText = "Staff services saved.";
                                    $scope.GetAllocatedStaffServiceCount();
                                    $timeout(function () {
                                        $scope.IsVisible = false;
                                    }, 1000)
                                }, 500)
                            }
                        })
                    }
                }
               
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
                        $scope.GetAllocatedStaffServiceCount();
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

   //Get Allocated Staff Service Count//
    $scope.GetAllocatedStaffServiceCount = function () {
        debugger;
        var ServiceResult = bookingService.GetAllServiceStatus($routeParams.CompanyId, $scope.StaffId);
        ServiceResult.then(function (response) {           
            $scope.EmployeeServiceCount = response.data[0].AllocatedServiceCount!=null?response.data[0].AllocatedServiceCount:0;
        });      
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
                            //Geting Break Hours.As days are enabled/disabled//
                            var BreakTimeHours = bookingService.GetBreakTimeHoursofEmployee($scope.StaffId);
                            BreakTimeHours.then(function (response) {
                                debugger;
                                $scope.listofBreakingHours = [];
                                for (var i = 0; i < response.data.length; i++) {
                                    $scope.listofBreakingHours.push({ "EmployeeId": response.data[i].EmployeeId, "Available": response.data[i].Available, "CompanyId": response.data[i].CompanyId, "Day": response.data[i].Day, "DayOfWeek": response.data[i].DayOfWeek, "CreationDate": response.data[i].CreationDate, "StartEndTime": response.data[i].StartEndTime });
                                }
                            })
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
                            //Geting Break Hours.As days are enabled/disabled//
                            var BreakTimeHours = bookingService.GetBreakTimeHoursofEmployee($scope.StaffId);
                            BreakTimeHours.then(function (response) {
                                debugger;
                                $scope.listofBreakingHours = [];
                                for (var i = 0; i < response.data.length; i++) {
                                    $scope.listofBreakingHours.push({ "EmployeeId": response.data[i].EmployeeId, "Available": response.data[i].Available, "CompanyId": response.data[i].CompanyId, "Day": response.data[i].Day, "DayOfWeek": response.data[i].DayOfWeek, "CreationDate": response.data[i].CreationDate, "StartEndTime": response.data[i].StartEndTime });
                                }
                            })
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
        if ($scope.EndoffTime < $scope.StartoffTime)
        {
            $scope.MessageText = "Start date cannot be greater than end date.";
            $scope.IsVisible = true;
            $timeout(function () {
                $scope.IsVisible = false;                
            }, 800);
            return false;
        }
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

    
    $scope.SetEmployeeBreakTime=function(time)
    {
        debugger;
        
        var BreakTime = {               
                "CompanyId": $routeParams.CompanyId,
                "EmployeeId": time.EmployeeId,
                "DayOfWeek": time.DayOfWeek,
                "Start": time.StartEndTime[0].Start,
                "End": time.StartEndTime[0].End,
                "CreationDate": new Date()
            }
        var apirequest = bookingService.AddEmployeeBreakTime(BreakTime);
        apirequest.then(function (response) {
            if(response.data.Success==true)
            {
                debugger;
                var BreakTimeHours = bookingService.GetBreakTimeHoursofEmployee(time.EmployeeId);
                BreakTimeHours.then(function (response) {
                    debugger;
                    $scope.listofBreakingHours = [];                   
                    for (var i = 0; i < response.data.length; i++) {
                        $scope.listofBreakingHours.push({ "EmployeeId": response.data[i].EmployeeId, "Available": response.data[i].Available, "CompanyId": response.data[i].CompanyId, "Day": response.data[i].Day, "DayOfWeek": response.data[i].DayOfWeek, "CreationDate": response.data[i].CreationDate, "StartEndTime": response.data[i].StartEndTime });
                    }                    
                })
             
            
                $scope.MessageText = "Saving staff breaks";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.MessageText = "staff breaks saved";
                    $timeout(function () {
                        $scope.IsVisible = false;
                    },1000)
                },800)
            }
        });
    }

    $scope.UpdateTimeOff=function()
    {
        debugger;
        var UpdatedTimeoff = {
            "Id": $scope.TimeOffId,
            "CompanyId": $routeParams.CompanyId,
            "EmployeeId": $scope.StaffId,
            "StartDate": $scope.EditStartDate,
            "EndDate":$scope.EditEndDate,
            "StartTime":  $scope.EditStartoffTime,
            "EndTime": $scope.EditEndoffTime,
            "CreationDate": new Date(),
            "IsOffAllDay": $scope.alldaystatus
        }

        var apirequest = bookingService.UpdateTimeOff(UpdatedTimeoff);
        apirequest.then(function (response) {
            if(response.data.Success==true)
            {
                $scope.MessageText = "Saving Timeoff";
                $scope.IsVisible = true;
                $scope.GetTimeOffDetail($scope.StaffId);
                angular.element(document.querySelector('#UpdatetimeoffPopUp')).css('display', 'none');
                $timeout(function () {
                    $scope.MessageText = "Timeoff Saved";
                    $timeout(function () {
                        $scope.IsVisible = false;
                    },1000)
                },800)
            }
        })
    }
   
    $scope.EditTimeOff=function(item)
    {
        debugger;
        angular.element(document.querySelector('#UpdatetimeoffPopUp')).css('display', 'block');
        $scope.TimeOffId = item.Id;
        var StartDateTime = item.Start.split('T');
        var EndDateTime = item.End.split('T');
        $scope.EditStartDate = $filter('date')(StartDateTime[0], 'dd MMM yyyy');
        $scope.EditEndDate = $filter('date')(EndDateTime[0], 'dd MMM yyyy');
        $scope.alldaystatus = item.IsOffAllDay;

        var Time=StartDateTime[1].split(":");
        var Stime=new Date(1970,5,6,Time[0],Time[1],Time[2]);
        var FormatedTime=$filter('date')(Stime,'hh:mm a')
        $scope.EditStartoffTime = FormatedTime;
      
        var Time = EndDateTime[1].split(":");
        var Stime = new Date(1970, 5, 6, Time[0], Time[1], Time[2]);
        var FormatedTime = $filter('date')(Stime, 'hh:mm a')
        $scope.EditEndoffTime = FormatedTime;

            
    }


    $scope.Deletetimeoff=function()
    {
        debugger;
        var apirequest = bookingService.DeleteTimeOff($scope.TimeOffId);
        apirequest.then(function (response) {
            if(response.data.Success==true)
            {
                $scope.MessageText = "Deleting TimeOff";
                $scope.IsVisible = true;
              
                angular.element(document.querySelector('#UpdatetimeoffPopUp')).css('display', 'none');
                $timeout(function () {
                    $scope.MessageText = "TimeOff Deleted";
                    $scope.GetTimeOffDetail($scope.StaffId);
                    $timeout(function () {
                        $scope.IsVisible = false;
                    },700)
                },1000)
            }
        })
    }

    $scope.CloseEditTimeOffModel = function () {
        debugger;
        angular.element(document.querySelector('#UpdatetimeoffPopUp')).css('display', 'none');
    }


    $scope.GetTimeOffDetail = function (Id) {
        debugger;
        var result = bookingService.GetTimeOffDetail(Id);
        result.then(function (response) {
            $scope.timeOffDetail = response.data;
        });
    }

    $scope.AddBreak = function (item) {
        debugger;
        var BreakTime = {

            "CompanyId": $routeParams.CompanyId,
            "EmployeeId": item.EmployeeId,
            "DayOfWeek": item.DayOfWeek,
            "Start": "1:00 PM ",
            "End": "2:00 PM",
            "CreationDate": new Date()
        }
        // $scope.SetEmployeeBreakTime(BreakTime);


        var apirequest = bookingService.AddEmployeeBreakTime(BreakTime);
        apirequest.then(function (response) {
            if (response.data.Success == true) {
                debugger;
                //var BreakTimeHours = bookingService.GetBreakTimeHoursofEmployee(item.EmployeeId);
                //BreakTimeHours.then(function (response) {
                //    debugger;
                //    $scope.listofBreakingHours = [];
                //    for (var i = 0; i < response.data.length; i++) {
                //        $scope.listofBreakingHours.push({ "EmployeeId": response.data[i].EmployeeId, "Available": response.data[i].Available, "CompanyId": response.data[i].CompanyId, "Day": response.data[i].Day, "DayOfWeek": response.data[i].DayOfWeek, "CreationDate": response.data[i].CreationDate, "StartEndTime": response.data[i].StartEndTime });
                //    }
                //})
                $scope.GetBreakHours(item.EmployeeId);

                $scope.MessageText = "Saving staff break";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.MessageText = "staff break saved";
                    $timeout(function () {
                        $scope.IsVisible = false;
                    }, 1000)
                }, 800)
            }
        });
    }
        //Update BreakTime of Employee
        $scope.UpdateBreakTime = function(time,status)
        {
            debugger;
            var UpdatedbreakTime = {
                "Id": time.Id,
                "CompanyId": $routeParams.CompanyId,
                "EmployeeId": $scope.StaffId,
                "DayOfWeek": time.DayOfWeek,
                "Start": time.Start,
                "End": time.End,
                "CreationDate": new Date()
            }
            var ApiRequest = bookingService.UpdateBreakTime(UpdatedbreakTime, status);
            ApiRequest.then(function (response) {
                if (response.data.Success == true) {
                   
                    $scope.MessageText = "Saving staff break";
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "staff breaks saved";
                        $scope.GetBreakHours($scope.StaffId);$scope.listofBreakingHours
                        $timeout(function () {

                            $scope.IsVisible = false;
                        },1000)
                    },500)
                }
            })
        }



        //Delete BreakTime of Employee//
        $scope.DeleteBreakTime = function (Id) {
            debugger;
            var requestapi = bookingService.DeleteBreak(Id);
            requestapi.then(function (response) {
                if (response.data.Success == true) {
                    $scope.GetBreakHours($scope.StaffId);
                    $scope.MessageText = "Saving Staff Breaks";
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "Staff Breaks Saved";
                        $timeout(function () {
                            $scope.IsVisible = false;
                        }, 800)
                    }, 1000)
                }

            })
        }
       
    

        $scope.GetBreakHours=function(Id)
        {
            debugger;
            var BreakTimeHours = bookingService.GetBreakTimeHoursofEmployee(Id);
            BreakTimeHours.then(function (response) {
                debugger;
                $scope.listofBreakingHours = [];
                for (var i = 0; i < response.data.length; i++) {
                    $scope.listofBreakingHours.push({ "EmployeeId": response.data[i].EmployeeId,"Id":response.data[i].Id, "Available": response.data[i].Available, "CompanyId": response.data[i].CompanyId, "Day": response.data[i].Day, "DayOfWeek": response.data[i].DayOfWeek, "CreationDate": response.data[i].CreationDate, "StartEndTime": response.data[i].StartEndTime });
                }
            })
        }

        $scope.Logout = function () {
            debugger;
            $rootScope.IsLoggedInUser = false;
            var apirequest = bookingService.SignOut();
            sessionStorage.removeItem('userInfo-token');
            $location.path("/signin");
        }
   
}]);