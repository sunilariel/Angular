/// <reference path="dashboard.js" />
//var app = angular.module('MyApp', [])
app.controller('dashboardController', ['$scope', '$timeout', '$window', '$http', '$routeParams', '$filter', '$location', 'bookingService', '$rootScope',
    function ($scope, $timeout, $window, $http, $routeParams, $filter, $location, bookingService, $rootScope) {
    //This will hide the DIV by default.
    $scope.procedures = [
{
    definition: 'Monday',
    show: false,
    choice: []
},
{
    definition: 'Tuesday',
    show: false,
    choice: []
},
{
    definition: 'Wednesday',
    show: false,
    choice: []
},
{
    definition: 'Thursday',
    show: false,
    choice: []
},
{
    definition: 'Friday',
    show: false,
    choice: []
},
{
    definition: 'Saturday',
    show: false,
    choice: []
},
{
    definition: 'Sunday',
    show: false,
    choice: []
}
    ];

    $scope.MessageText = "";
    $scope.IsVisible = false;
    $scope.choices = [];
    $scope.showcustomer = false;


    //Redirection
    $scope.redirecttoCustomer = function () {
        $location.path("/customer/" + $routeParams.CompanyId);
    }

    $scope.redirectToCalendar = function () {

        $location.path("/Calendar/" + $routeParams.CompanyId);

    }

    $scope.RedirecttoStaff = function ()
    {
        $location.path("/Setting/" + $routeParams.CompanyId);
    }

    $scope.RedirecttoReport = function () {
        $location.path("/BuisnessReports/" + $routeParams.CompanyId);
    }

    $scope.addNewChoice = function (procedure) {
        debugger;
        $scope.IsVisible = true;
        $scope.MessageText = "Saving Staff breaks..";
        var newItemNo = procedure.choice.length + 1;

        procedure.choice.push([{ 'id': 'choice' + newItemNo }]);
        $timeout(function () { $scope.MessageText = "Staff breaks saved."; $timeout(function () { $scope.IsVisible = false; }, 1000) }, 500);
    };
    $scope.showPopup = function (procedure) {
        procedure.show = true;
    };
    $scope.hidePopup = function (procedure) {
        debugger;
        procedure.show = false;
    };
    $scope.removeChoice = function (procedure) {
        debugger;
        $scope.IsVisible = true;
        var lastItem = procedure.choice.length - 1;
        procedure.choice.splice(lastItem);
        $scope.MessageText = "Saving Staff breaks..";
        $timeout(function () { $scope.MessageText = "Staff breaks saved."; $timeout(function () { $scope.IsVisible = false; }, 1000) }, 500);
    };

    $scope.showCustomerpopup = function () {
        debugger;
        $scope.showcustomer != $scope.showcustomer;
    };

    $scope.init = function () {
        $scope.showdashboardloader = true;
        $scope.AppointmentSchedule = [];
        $scope.MessageText = "Fetching Data...";
        $scope.IsVisible = true;
        var apirequestWeeksRevenue = bookingService.GetCurrentWeeksRevenueSummary($routeParams.CompanyId);
        apirequestWeeksRevenue.then(function (response) {
            debugger;
            var CurrentDate = new Date();
             var first =CurrentDate.getDate() - CurrentDate.getDay();
             var last = first + 6;
            $scope.WeekFirstDate = new Date(CurrentDate.setDate(first));
            $scope.WeekLastDate = new Date(CurrentDate.setDate(last));
            $scope.WeekRevenueSummary = response.data;


            //Get Weeks Activity Summary//
            var apirequestWeeksActivity = bookingService.GetWeeksActivitySummary($routeParams.CompanyId);
            apirequestWeeksActivity.then(function (response) {
                $scope.WeekActivityList = [];
                $scope.WeekActivityList = response.data;

           //Get Week Schedule Summary//
             var apirequestWeeksSchedule = bookingService.GetWeeksSchedule($routeParams.CompanyId);
             apirequestWeeksSchedule.then(function (response) {
             $scope.ListofWeekSchedule = [];
             $scope.ListofWeekSchedule = response.data;
             $scope.IsVisible = false;
             $scope.showdashboardloader = false;
              })
            })


        })
        var GetStaffProvider = bookingService.GetStaffData($routeParams.CompanyId);
        GetStaffProvider.then(function (response) {
            debugger;
            $scope.Provider = [];
            for (var i = 0; i < response.data.length; i++) {
                $scope.Provider.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'UserName': response.data[i].UserName, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email });
            }
        });

        $scope.StatusList = [{ Status: "No Label", "Value": 1 },
         { Status: "Pending", "Value": 2 },
         { Status: "Confirmed", "Value": 3 },
         { Status: "Done", "Value": 4 },
         { Status: "Paid", "Value": 6 },
         { Status: "NoShow ", "Value": 5 },
         { Status: "RunningLate", "Value": 7 }
        ]

        var CompanyDetails = bookingService.GetCompanyDetails($routeParams.CompanyId);
        CompanyDetails.then(function (response) {

            $scope.companyEmail = response.data.Email;
        });
    }

    $scope.DashboardAppointmentDetail = function (item) {
        debugger;  //1111
        $scope.AppointmentStartDate = item.BookingStartDate;
        $scope.AppointmentEndDate = new Date(item.BookingStartDate).setMinutes(item.BookingDuration,0,0);
        $scope.AppointmentProvider = item.EmployeeName;
        $scope.AppointmentService = item.ServiceName;
        $scope.AppointmentServiceCost = item.BookingCost;
        $scope.AppointmentEmployeeId = item.EmployeeId;
        $scope.AppointmentServiceId = item.ServiceId;
        $scope.ServiceTime = item.BookingDuration;        
        $scope.UpdatedStatus = item.BookingStatusDisplay;
        $scope.StatusId = item.BookingStatus;
        $scope.AppointmentBookingId = item.BookingId;
        $scope.CustomerName = item.CustomerNames[0];
        $scope.CustomerId = item.CustomerIds[0];
        var apirequest = bookingService.GetCustomerById($scope.CustomerId);
        apirequest.then(function (response) {
            debugger;
            $scope.CustomerName = response.data.FirstName;
            $scope.CustomerEmail = response.data.Email;
            $scope.CustomerTelephone = response.data.TelephoneNo.substring(2,response.data.TelephoneNo.length);
            $scope.Code = response.data.TelephoneNo.substring(0, 2);
            $scope.CustomerAddress = response.data.Address;
        })
        $scope.appointmentDetailisVisible = !$scope.appointmentDetailisVisible;
        var date = $scope.AppointmentStartDate.split("T");
        var appointmentdate = new Date(date[0]);
        var time = date[1].split(":");
        var appointmenttime = new Date(1997, 4, 5, time[0], time[1], time[2]);
        $scope.timeoption = $filter('date')(appointmenttime, 'h:mm a');
        $scope.dt = appointmentdate;
    }

    $scope.UpdateStatus = function (item) {
        debugger;
        var status = $scope.StatusValue;
        $scope.UpdatedStatus = item.Status;
        var SetStatus = bookingService.SetStatusofAppointment(item.Status, $scope.AppointmentBookingId);
        SetStatus.then(function (response) {
            if (response.data.Success == true) {

                $scope.MessageText = "Updating Appointment Label";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.MessageText = "Appointment Label Saved";
                    $timeout(function () {
                        $scope.IsVisible = false;
                        var apirequestWeeksSchedule = bookingService.GetWeeksSchedule($routeParams.CompanyId);
                        apirequestWeeksSchedule.then(function (response) {
                            $scope.ListofWeekSchedule = [];
                            $scope.ListofWeekSchedule = response.data;
                            $scope.IsVisible = false;
                        })
                    }, 800)
                }, 1000)
            }
        })
    }


    $scope.DeleteAppointment = function () {
        var apirequest = bookingService.DeleteAppointment($scope.AppointmentBookingId);
        apirequest.then(function (response) {
            if (response.data.Success == true) {
                $scope.MessageText = "Deleting Appointment";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.MessageText = "Appointment Deleted";                   
                    $timeout(function () {                        
                        $scope.appointmentDetailisVisible = false;
                        $scope.IsVisible = false;
                        $scope.init();
                        angular.element(document.querySelector("#UpdateDashboardAppointmentPopup")).css("display", "none");
                    }, 800)
                }, 1000)
            }
        })
    }

    $scope.EditAppointment = function () {
        debugger;
        $scope.appointmentDetailisVisible = false;
        $scope.Status = $scope.UpdatedStatus;
        $scope.selectedprovider = $scope.AppointmentEmployeeId.toString();
        $scope.selectedservice = $scope.AppointmentServiceId.toString();
        $scope.price = $scope.AppointmentServiceCost;
        $scope.time = $scope.ServiceTime;
        var date = $scope.AppointmentStartDate.split("T");
        var appointmentdate = new Date(date[0]);
        var time = date[1].split(":");
        var appointmenttime = new Date(1997, 4, 5, time[0], time[1], time[2]);
        $scope.timeoption = $filter('date')(appointmenttime,'h:mm a');
        $scope.dt = appointmentdate;
        // $scope.ServiceDetail($scope.AppointmentServiceId);
        $scope.GetAllocateServiceToEmployee($scope.AppointmentEmployeeId);
        $scope.ServiceId = $scope.AppointmentServiceId;
        $scope.UpdateAppointmentId = $scope.AppointmentBookingId;
        $scope.count = 0;
        $scope.notes = "";
       
        //$scope.EmployeeId = $scope.AppointmentEmployeeId;
    }


    $scope.GetAllocateServiceToEmployee = function (EmployeeId) {
        debugger;

        $scope.EmployeeId = EmployeeId;
        $scope.EmployeeServices = [];
        var EmployeeServices = bookingService.GetAllocatedServicetoEmployee($routeParams.CompanyId, EmployeeId);

        EmployeeServices.then(function (result) {
            debugger;

            $scope.EmployeeServices = result.data;

            // $scope.selectedservice = $scope.EmployeeServices[0].Id;
            //Get Staff Appointment working hours ///
            $scope.AppointmentSchedule = [];
            var resultAppontmentWorkingHours = bookingService.GetAppointmentWorkingHours(EmployeeId);
            resultAppontmentWorkingHours.then(function (response) {

                angular.forEach(response.data, function (value, key) {
                    if (value.IsOffAllDay == true) {
                        $scope.AppointmentSchedule.push(value.NameOfDay);
                    }
                });
            });

        }), function () {
            alert('Error in getting post records');
        };
    }

    $scope.ServiceDetail = function (SelectedServiceId) {
        debugger;
        $scope.ServiceId = SelectedServiceId;
        var SelectedService = bookingService.GetSelectedService(SelectedServiceId);
        SelectedService.then(function (response) {
            debugger;
            $scope.price = response.data.Cost;
            $scope.time = response.data.DurationInMinutes;
            $scope.ServicePriceTimeDetailIsVisible = true;
            // $scope.today();

            $scope.timeInfoFrom = [];
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            RequestValues = {
                CompanyId: $routeParams.CompanyId,
                ServiceId: $scope.ServiceId,
                EmployeeId: $scope.EmployeeId,
                DateofBooking: $filter('date')($scope.dt, "dd-MM-yyyy"),
                Day: days[$scope.dt.getDay()],
            }
            $scope.timeslotsloading = true;
            var result = bookingService.GetFreeBookingSlotsForEmployee(RequestValues);
            result.then(function (response) {
                if (response.data.Value != null) {
                    for (var i = 0; i < response.data.Value.length; i++) {
                        if (i == 0) {
                            var startdate = response.data.Value[i].Start.split(":");
                            var startdatetime = new Date(1970, 0, 1, startdate[0], startdate[1], startdate[2]);
                            var starttime = $filter('date')(startdatetime, 'h:mm a');
                            $scope.timeInfoFrom.push(starttime);
                            var enddate = response.data.Value[i].End.split(":");
                            var enddatetime = new Date(1970, 0, 1, enddate[0], enddate[1], enddate[2]);
                            var endtime = $filter('date')(enddatetime, 'h:mm a');
                            $scope.timeInfoFrom.push(endtime);
                        }
                        else {
                            var date = response.data.Value[i].End.split(":");
                            var datetime = new Date(1970, 0, 1, date[0], date[1], date[2]);
                            var time = $filter('date')(datetime, 'h:mm a');
                            $scope.timeInfoFrom.push(time);

                        }
                    }
                    $scope.timeoption = $scope.timeInfoFrom[0];
                }
                $scope.timeslotsloading = false;
            });

        });
    }

    $scope.UpdateAppointment = function () {
        debugger;
        var appointment =
         {
             "Id": $scope.UpdateAppointmentId,
             "CompanyId": $routeParams.CompanyId,
             "ServiceId": $scope.selectedprovider,
             "EmployeeId": $scope.selectedservice,
             "CustomerIdsCommaSeperated": $scope.CustomerId,
             "StartHour": $scope.timeoption,
             "StartMinute": "",
             "EndHour": 0,
             "EndMinute": $scope.time,
             "IsAdded": true,
             "Message": "",
             "CustomerIds": [$scope.CustomerId],
             "Start": $scope.dt,
             "End": $scope.dt,
         }

        var apirequest = bookingService.UpdateAppointment(appointment);
        apirequest.then(function (response) {
            if (response.data.Success == true)
            {
                $scope.appointmentDetailisVisible = true;
                $scope.init();
            }
            if (response.data.Success == false) {
                if (response.data.Message == "Booking Cannot Be Added , Not Free Slot Available.") {
                    $scope.MessageText = "Not Free Slot Available";
                    $scope.IsVisible = true;
                    $timeout(function () {

                        $scope.IsVisible = false;
                    }, 1000)
                }
            }
        })
    }

    //DateTime Picker
    $scope.today = function () {
        $scope.dt = new Date();
    };

    //  $scope.today();
    $scope.showWeeks = true;
    $scope.toggleWeeks = function () {
        $scope.showWeeks = !$scope.showWeeks;
    };

   
    $scope.EditDatePicker = function () {
        debugger;
        if ($scope.count == 0) {
            $scope.count = $scope.count + 1;
            $scope.today();
        }
    }

    //Disable weekend selection
    $scope.disabled = function (date, mode) {
        return (mode == 'day' && (date.getDay() == $scope.AppointmentSchedule[0] || date.getDay() == $scope.AppointmentSchedule[1] || date.getDay() == $scope.AppointmentSchedule[2] || date.getDay() == $scope.AppointmentSchedule[3] || date.getDay() == $scope.AppointmentSchedule[4] || date.getDay() == $scope.AppointmentSchedule[5] || date.getDay() == $scope.AppointmentSchedule[6]));
    };

    $scope.open = function () {
        $timeout(function () {
            $scope.opened = true;
        });
    };

    $scope.dateOptions = {
        'year-format': "'yy'",
        'starting-day': 1
    };


    $scope.$watch("dt", function (newValue, oldValue) {
        debugger;
        $scope.timeInfoFrom = [];
        if (newValue != null && oldValue != null) {
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            RequestValues = {
                CompanyId: $routeParams.CompanyId,
                ServiceId: $scope.ServiceId,
                EmployeeId: $scope.EmployeeId,
                DateofBooking: $filter('date')(newValue, "dd-MM-yyyy"),
                Day: days[newValue.getDay()],
            }
            $scope.timeslotsloading = true;
            var result = bookingService.GetFreeBookingSlotsForEmployee(RequestValues);
            result.then(function (response) {
                if (newValue != oldValue) {
                    if (response.data.Value != null) {
                        for (var i = 0; i < response.data.Value.length; i++) {
                            if (i == 0) {
                                var startdate = response.data.Value[i].Start.split(":");
                                var startdatetime = new Date(1970, 0, 1, startdate[0], startdate[1], startdate[2]);
                                var starttime = $filter('date')(startdatetime, 'h:mm a');
                                $scope.timeInfoFrom.push(starttime);
                                var enddate = response.data.Value[i].End.split(":");
                                var enddatetime = new Date(1970, 0, 1, enddate[0], enddate[1], enddate[2]);
                                var endtime = $filter('date')(enddatetime, 'h:mm a');
                                $scope.timeInfoFrom.push(endtime);
                            }
                            else {
                                var date = response.data.Value[i].End.split(":");
                                var datetime = new Date(1970, 0, 1, date[0], date[1], date[2]);
                                var time = $filter('date')(datetime, 'h:mm a');
                                $scope.timeInfoFrom.push(time);
                            }
                        }
                    }
                    $scope.timeslotsloading = false;
                }
            });
        }
    });

    $scope.Logout = function () {
        debugger;
         $rootScope.IsLoggedInUser = false;
        var apirequest = bookingService.SignOut();
        sessionStorage.removeItem('userInfo-token');      
        $location.path("/signin");
    } 
}]);
