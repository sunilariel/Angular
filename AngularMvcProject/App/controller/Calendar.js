/// <reference path="../View/Calendar/CalendarModal.html" />


app.controller('calendarController', ['$scope', '$location', '$filter', '$window', '$routeParams',
    '$q', '$http', '$timeout', 'bookingService', '$rootScope', 'uiCalendarConfig', '$templateCache', '$compile',
    function ($scope, $location, $filter, $window, $routeParams, $q, $http, $timeout, bookingService, $rootScope,
        uiCalendarConfig, $templateCache, $compile) {
        var isFirstTime = true;
        //Redirection
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
        $scope.redirecttodashboard = function () {
            debugger;
            $location.path("/dashboard/" + $routeParams.CompanyId);
        }
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);


        $scope.eventSources = [];
        $scope.events = [];
        $scope.WorkingHours = [];
        $scope.BuisnessWorkingHours = [];

        $scope.uiConfig = {
            calendar: {
                height: 577,
                editable: true,
                displayEventTime: false,
                header: {
                    left: '',
                    center: 'title',
                    right: 'today prev,next'
                },

                
                //views: {

                //        type: 'agendaWeek',
                //       // duration: { days: 7 },
                //        titleFormat: 'EEE,MMM dd ', //YYYY
                //        //buttonText: '7 day',
                //       // columnFormat: 'dddd',
                //        //hiddenDays: [0, 6] // Hide Sunday and Saturday?

                //},
                //views: {
                //    week: { // name of view
                //        columnFormat: 'EEE,MMM dd',
                //        // other view-specific options here
                //    }
                //},
                eventAfterAllRender: $scope.eventAfterAllRender,
                eventClick: $scope.GetCurrentEvent,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender,
                dayClick: $scope.CurrentDateClick,
                updateEvents: $scope.updateEventsClick,
                getEventSources: $scope.getEventSources,
                refetchEvents: $scope.refetchEvents,
                businessHours: $scope.WorkingHours,
//                businessHours: [
//{
//dow: [2],
//end:"17:00:00",
//start:"08:00:00",
//},
//{
//dow:[1],
//end:"17:00:00",
//start:"08:00:00",
//},
//{
//dow:[4],
//end:"17:00:00",
//start:"08:00:00",
//},
//{
//dow:[5],
//end:"17:00:00",
//start:"08:00:00",
//}
//]

                //eventClick: function (event) {
                //    $scope.SelectedEvent = event;
                //},
            }
        };

        $scope.ViewList = [{"Name":"Monthly","ViewName":"month"},
            {"Name":"Daily","ViewName":"agendaDay"},
            {"Name":"Weekly","ViewName":"agendaWeek"}];
        $scope.SelectedView = "month";


        //Initialize funtion//

        $scope.init = function () {
            debugger;
            $scope.FilterCustomerList = [];
            $scope.StatusList = [{ Status: "No Label", "Value": 1 },
           { Status: "Pending", "Value": 2 },
           { Status: "Confirmed", "Value": 3 },
           { Status: "Done", "Value": 4 },
           { Status: "Paid", "Value": 6 },
           { Status: "NoShow ", "Value": 5 },
           { Status: "RunningLate", "Value": 7 }
            ]

            $scope.DisabledAddCustomerTab = true;
            $scope.ContinueAppointment = true;
            $scope.ShowSubmit = false;

            $scope.CreateCustomer = false;
            $scope.timeInfoFrom = [];
            $scope.AppointmentSchedule = [];
            $scope.appointmentDetailisVisible = false;
            $scope.SelectedEvent = null;
            // $scope.events = [];
            $scope.eventSources = [$scope.events];
            $scope.Provider = [];
            $scope.CustomerList = [];
            $scope.WorkingHours = [];
            $scope.BuisnessWorkingHours = [];

            var GetCustomer = bookingService.GetAllCustomer($routeParams.CompanyId);
            GetCustomer.then(function (response) {
                $scope.CustomerList = response.data;
                $scope.CustomerCount = response.data.length;
            })

            //Getting all employees(provider) for appointment dropdown(Add Appointment)
            var GetStaffProvider = bookingService.GetStaffData($routeParams.CompanyId);
            GetStaffProvider.then(function (response) {

                for (var i = 0; i < response.data.length; i++) {
                    $scope.Provider.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'UserName': response.data[i].UserName, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email });
                }

                var apirequest = bookingService.GetBookingsForEmployeesByIdBetweenDates($routeParams.CompanyId, $scope.Provider[0].Id, firstDay, lastDay);
                apirequest.then(function (response) {
                    debugger;

                    angular.forEach(response.data[0].Employee.WorkingHours, function (value, key) {
                        if (value.IsOffAllDay == false) {
                            $scope.BuisnessWorkingHours.push({ "dow": [value.NameOfDay], "start": value.Start, "end": value.End })
                        }
                    });

                    $scope.WorkingHours[0] = $scope.BuisnessWorkingHours;
                    
                    //uiCalendarConfig.calendars['myCalendar'].fullCalendar('render');

                    uiCalendarConfig.calendars['myCalendar'].fullCalendar('option', {
                        businessHours: $scope.WorkingHours[0]
                    });


                    angular.forEach(response.data, function (value, key) {
                        $scope.events.push({
                            title: value.Service.Name,
                            id: value.Id + "," + value.Service.Name + "," + value.Service.Cost + "," + value.Employee.FirstName + "," + value.Status + "," + value.Service.DurationInMinutes + "," + value.Service.Id + "," + value.Employee.Id + "," + value.Customers[0].FirstName + value.Customers[0].Id +"," + value.Customers[0].Email +","+ value.Customers[0].TelephoneNo,
                            description: value.Id,
                            start: value.Start,
                            end: value.End,
                            allDay: value.IsFullDay,
                            color: value.Service.Colour,
                            textColor: "black"
                        });
                    })
                    if (response.data.status == 1) {
                        $scope.UpdatedStatus = "No Label";
                    }
                    else if (response.data.status == 2) {
                        $scope.UpdatedStatus = "Pending";
                    }
                    else if (response.data.status == 3) {
                        $scope.UpdatedStatus = "Confirmed";
                    }
                    else if (response.data.status == 5) {
                        $scope.UpdatedStatus = "No-Show";
                    }
                    else if (response.data.status == 4) {
                        $scope.UpdatedStatus = "Done";
                    }
                    else if (response.data.status == 7) {
                        $scope.UpdatedStatus = "RunningLate";
                    }
                    else if (response.data.status == 6) {
                        $scope.UpdatedStatus = "Paid";
                    }
                    //$scope.AppointmentBookingId = item.BookingId;
                })


            });


            //$scope.counted = $scope.CustomerCount;
            //$scope.$watch("SearchCustomer", function (query) {
            //    debugger;
            //    $scope.counted = $filter("filter")($scope.CustomerList, query).length;
            //});
           
        }

        //Add event on Calendar//

        $scope.EditCustomer = function (item) {
            debugger;
            $scope.SearchCustomer = "";
            $scope.ShowSubmit = true;
            $scope.CustomerId = item.Id
            $scope.CustomerEmail = item.Email;
            $scope.customerPassword = item.Password;
            $scope.CustomerName = item.FirstName;
            $scope.CustomerPreMobileNo = item.TelephoneNo;
            $scope.CustomerAddress = item.Address;
            $scope.CustomerCity = item.CustomerCity;
            $scope.Zip = item.PostCode;

            angular.element(document.querySelector("#searchCustomer")).css("display", "none");
            angular.element(document.querySelector("#searchCustomer")).removeClass("active");
            angular.element(document.querySelector("#Calendarcustomer")).css("display", "block");
            angular.element(document.querySelector("#Calendarcustomer")).addClass("active");
            angular.element(document.querySelector("#modalfooter")).css("display", "block");
        }

        $scope.GotoCustomerTab = function () {
            $scope.FilterCustomerList = [];
            $scope.SearchCustomer = "";
            angular.element(document.querySelector("#searchCustomer")).css("display", "block");
            angular.element(document.querySelector("#Calendartab")).addClass("active");
            angular.element(document.querySelector("#calendardetail")).css("display", "none");
            angular.element(document.querySelector("#Appointmenttab")).removeClass("active");
            angular.element(document.querySelector("#modalfooter")).css("display", "none");
        }

        $scope.AddnewCustomer = function () {           
            $scope.ShowSubmit = true;
            $scope.CustomerId = "";
            $scope.CustomerEmail = "";
            $scope.customerPassword = "";
            $scope.CustomerName = "";
            $scope.CustomerPreMobileNo = "";
            $scope.CustomerAddress = "";
            $scope.CustomerCity = "";
            $scope.Zip = "";

            angular.element(document.querySelector("#searchCustomer")).css("display", "none");
            angular.element(document.querySelector("#Calendarcustomer")).css("display", "block");
            angular.element(document.querySelector("#modalfooter")).css("display", "block");
        }

        $scope.CloseAddCustomertab = function () {
            $scope.FilterCustomerList = [];
            $scope.SearchCustomer = "";
            angular.element(document.querySelector("#searchCustomer")).css("display", "block");
            angular.element(document.querySelector("#modalfooter")).css("display", "none");
            angular.element(document.querySelector("#Calendarcustomer")).css("display", "none");
        }

        $scope.Appointmenttab = function () {
            debugger;
            angular.element(document.querySelector("#searchCustomer")).css("display", "none");
            angular.element(document.querySelector("#Calendartab")).removeClass("active");
            angular.element(document.querySelector("#Calendarcustomer")).css("display", "none");
            angular.element(document.querySelector("#calendardetail")).css("display", "block");
            angular.element(document.querySelector("#Appointmenttab")).addClass("active");
            angular.element(document.querySelector("#modalfooter")).css("display", "block");


        }

        $scope.Calendartab = function () {
            if ($scope.DisabledAddCustomerTab == false) {
                $scope.FilterCustomerList = [];
                $scope.SearchCustomer = "";
                angular.element(document.querySelector("#searchCustomer")).css("display", "block");
                angular.element(document.querySelector("#Appointmenttab")).removeClass("active");
                angular.element(document.querySelector("#Calendarcustomer")).css("display", "none");
                angular.element(document.querySelector("#Calendartab")).addClass("active");
                angular.element(document.querySelector("#calendardetail")).css("display", "none");
                angular.element(document.querySelector("#modalfooter")).css("display", "none");
            }
        }





        $scope.headerinit = true;
        $scope.eventAfterAllRender = function () {

            debugger;
            //$scope.headerinit = false;
            if ($scope.headerinit == true) {
                $scope.headerinit = false
                var apirequest = bookingService.GetStaffData($routeParams.CompanyId);
                apirequest.then(function (response) {
                    debugger;
                    $scope.AllStaff = response.data;
                    // df.resolve($scope.AllStaff);
                    $scope.selectedstaff = ($scope.AllStaff[0].Id).toString();
                    var e = document.getElementsByClassName("fc-left");
                    var staffhtml = "<select class='form-control' ng-model='selectedstaff' ng-change = getSelectedStaff(selectedstaff) style='width:77px;height: 30px;'>";
                    angular.forEach($scope.AllStaff, function (value, key) {
                        staffhtml = staffhtml + "<option value=" + value.Id + ">" + value.FirstName + "</option>";
                    })
                    staffhtml = staffhtml + "</select>";
                    var tempstaffhtml = $compile(staffhtml)($scope);
                    angular.element(e).append(tempstaffhtml);

                    ////
                    var ViewHtml = "<select class='form-control' ng-model='SelectedView' ng-change = ChangeView(SelectedView) style='width:92px;height: 30px;'>";
                    angular.forEach($scope.ViewList, function (value, key) {
                        ViewHtml = ViewHtml + "<option value=" + value.ViewName + ">" + value.Name + "</option>";
                    });
                    ViewHtml = ViewHtml + "</select>";                    
                    var ViewOptionsHtml = $compile(ViewHtml)($scope);
                    angular.element(e).append(ViewOptionsHtml);

                    //angular.element(document.querySelector("fc-header-toolbar")).innerHTML('');

                    //var e = document.getElementsByClassName("fc-header-toolbar");
                    //var headerhtml = "<section class='calendarHeader'><div class='container'><div class='row'><div class='col-md-3'><div class='weeklyContent'><div class='maildiv'><span class='emailuserImg'><img src='images/provider_img2.png' /></span><span class='mailtext'>testerariel </span><span class='downcaretIcon'><i class='fa fa-caret-down' aria-hidden='true'></i></span></div><div class='maildiv weeklyDiv'><span class='mailtext'>Weekly </span><span class='downcaretIcon'><i class='fa fa-caret-down' aria-hidden='true'></i></span></div></div></div><div class='col-md-6'><div class='todaycalendardiv'>	<span>Today</span></div></div><div class='col-md-3'><div class='weeklystatsDiv'><ul class='list-inline'><li><a href='#'><i class='fa fa-plus' aria-hidden='true'></i></a></li><li><a href='#'><i class='fa fa-signal' aria-hidden='true'></i></a></li><li><a href='#'><i class='fa fa-cog' aria-hidden='true'></i></a></li></ul></div></div></div></div></section>"

                    //var compileheaderhtml = $compile(headerhtml)($scope);
                    //angular.element(e).append(compileheaderhtml);

                })
            }
        }

        $scope.ChangeView = function (View) {
            debugger;
           
            uiCalendarConfig.calendars['myCalendar'].fullCalendar('changeView', View);

        }

        $scope.getSelectedStaff = function (Id) {
            debugger;
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            uiCalendarConfig.calendars['myCalendar'].fullCalendar('removeEventSources');
            $scope.events = [];
            $scope.eventSources = [];
            $scope.WorkingHours = [];
            $scope.BuisnessWorkingHours = [];
            debugger;
            var apirequest = bookingService.GetBookingsForEmployeesByIdBetweenDates($routeParams.CompanyId, Id, firstDay, lastDay);
            apirequest.then(function (response) {
                if(response.data.length!=0){
                angular.forEach(response.data[0].Employee.WorkingHours, function (value, key) {
                    if (value.IsOffAllDay == false) {
                        $scope.BuisnessWorkingHours.push({ "dow": [value.NameOfDay], "start": value.Start, "end": value.End });
                    }
                })

                $scope.WorkingHours[0] = $scope.BuisnessWorkingHours;

                uiCalendarConfig.calendars['myCalendar'].fullCalendar('option', {
                    businessHours: $scope.WorkingHours[0]
                });

                angular.forEach(response.data, function (value, key) {
                    $scope.events.push({
                        title: value.Service.Name,
                        id: value.Id + "," + value.Service.Name + "," + value.Service.Cost + "," + value.Employee.FirstName + "," + value.Status + "," + value.Service.DurationInMinutes + "," + value.Service.Id + "," + value.Employee.Id  + value.Customers[0].FirstName + value.Customers[0].Id,
                        description: value.Id,
                        start: value.Start,
                        end: value.End,
                        allDay: value.IsFullDay,
                        color: value.Service.Colour,
                        textColor: "black"
                    });
                })

                uiCalendarConfig.calendars['myCalendar'].fullCalendar('addEventSource', $scope.events)
               
                debugger;
                if (response.data.status == 1) {
                    $scope.UpdatedStatus = "No Label";
                }
                else if (response.data.status == 2) {
                    $scope.UpdatedStatus = "Pending";
                }
                else if (response.data.status == 3) {
                    $scope.UpdatedStatus = "Confirmed";
                }
                else if (response.data.status == 5) {
                    $scope.UpdatedStatus = "No-Show";
                }
                else if (response.data.status == 4) {
                    $scope.UpdatedStatus = "Done";
                }
                else if (response.data.status == 7) {
                    $scope.UpdatedStatus = "RunningLate";
                }
                else if (response.data.status == 6) {
                    $scope.UpdatedStatus = "Paid";
                }
            }
            })

        }

        $scope.alertOnEventClick = function (event) {
            alert(event);
        }

        $scope.CurrentDateClick = function (date, jsEvent, view, resourceObj) {
            debugger;
           
            angular.element(document.querySelector("#squarespaceModal")).css("display", "block");
            angular.element(document.querySelector("#squarespaceModal")).css("opacity", 1);
            // $scope.today();
            $scope.dt = date._d;
            $scope.timeslotsloading = false;
            $scope.selectedservice = null;
            $scope.price = null;
            $scope.time = "";
            $scope.timeoption = "";
            $scope.timeInfoFrom = [];
            $scope.Status = "1";
            $scope.selectedprovider = "-- Select a Provider --";
            $scope.notes = "";
            $scope.ServicePriceTimeDetailIsVisible = false;

            angular.element(document.querySelector("#searchCustomer")).css("display", "none");
            angular.element(document.querySelector("#Calendartab")).removeClass("active");
            angular.element(document.querySelector("#Calendarcustomer")).css("display", "none");
            angular.element(document.querySelector("#calendardetail")).css("display", "block");
            angular.element(document.querySelector("#Appointmenttab")).addClass("active");
            angular.element(document.querySelector("#modalfooter")).css("display", "block");


            //$scope.eventSources = [$scope.events[0]];
        }

        $scope.CloseAppointmentModal = function () {

            // $scope.today();
          
            $scope.timeslotsloading = false;
            $scope.selectedservice = null;
            $scope.price = null;

            $scope.time = "";
            $scope.timeoption = "";
            $scope.timeInfoFrom = [];
            $scope.Status = "1";
            $scope.selectedprovider = "-- Select a Provider --";
            $scope.notes = "";
            $scope.ServicePriceTimeDetailIsVisible = false;
            angular.element(document.querySelector("#squarespaceModal")).css("display", "none");
            angular.element(document.querySelector("#squarespaceModal")).css("opacity", 0);
        }

        $scope.updateEventsClick = function () {
            alert("update events");
        }

        //Click on event function//
        $scope.GetCurrentEvent = function (event) {

            debugger;

            angular.element(document.querySelector("#detailPopup")).css("display", "block");
            var appointmentdetail = event.id.split(",");
            $scope.AppointmentStartDate = event.start._i;
            $scope.AppointmentEndDate = event.end._i;
            $scope.AppointmentProvider = appointmentdetail[3];
            $scope.AppointmentService = appointmentdetail[1];
            $scope.AppointmentServiceCost = appointmentdetail[2];
            $scope.AppointmentBookingId = appointmentdetail[0];
            $scope.AppointmentServiceId = appointmentdetail[6];
            $scope.AppointmentEmployeeId = appointmentdetail[7];
            $scope.AppointmentDuration = appointmentdetail[5];
            $scope.CustomerId = appointmentdetail[7];
            $scope.CustomerName = appointmentdetail[8];
            $scope.CustomerEmail = appointmentdetail[9];
            $scope.CustomerTelephone = appointmentdetail[10];

            $scope.StatusId = appointmentdetail[4];
            if (appointmentdetail[4] == 1) {
                $scope.UpdatedStatus = "No Label";
            }
            else if (appointmentdetail[4] == 2) {
                $scope.UpdatedStatus = "Pending";
            }
            else if (appointmentdetail[4] == 3) {
                $scope.UpdatedStatus = "Confirmed";
            }
            else if (appointmentdetail[4] == 5) {
                $scope.UpdatedStatus = "No-Show";
            }
            else if (appointmentdetail[4] == 4) {
                $scope.UpdatedStatus = "Done";
            }
            else if (appointmentdetail[4] == 7) {
                $scope.UpdatedStatus = "RunningLate";
            }
            else if (appointmentdetail[4] == 6) {
                $scope.UpdatedStatus = "Paid";
            }

        }
        $scope.Closebtn = function () {
            angular.element(document.querySelector("#detailPopup")).css("display", "None");
        }

        $scope.eventRender = function (event, element) {
            debugger;
            if (event.hasOwnProperty("id") == true) {
                var eventdetail = event.id.split(",");

                var status = "";
                if (eventdetail[4] == 1) {
                    status = "No Label";
                }
                else if (eventdetail[4] == 2) {
                    status = "Pending";
                }
                else if (eventdetail[4] == 3) {
                    status = "Confirmed";
                }
                else if (eventdetail[4] == 5) {
                    status = "No-Show";
                }
                else if (eventdetail[4] == 4) {
                    status = "Done";
                }
                else if (eventdetail[4] == 7) {
                    status = "RunningLate";
                }
                else if (eventdetail[4] == 6) {
                    status = "Paid";
                }
                var html = "<div class='fc-content'><span class='fc-title'>s1</span><span class='fc-title' style='text-align: right;float: right;'>s1</span><div style='margin-top: 20px;'><span>fsdf</span><span>fsdf</span></div></div>";

                element[0].innerHTML = "<div class='fc-content'><span class='fc-title' style='padding-left:5px;font-size: 12px;font-weight: 500;'>" + eventdetail[8] + "</span><span class='fc-title' style='text-align: right;float: right;font-size: 9px;padding: 0px 5px;'>" + status + "</span><div style='margin-top: 20px;'><span style='padding-left:5px;font-size: 12px;'>" + eventdetail[1] + "  " + "£" + eventdetail[2] + "</span></div></div>";
            }
        }


        $scope.UpdateStatus = function (item) {
            debugger;
            var status = $scope.StatusValue;
            $scope.UpdatedStatus = item.Status;
            $scope.StatusId = item.Value;
            var SetStatus = bookingService.SetStatusofAppointment(item.Status, $scope.AppointmentBookingId);
            SetStatus.then(function (response) {
                debugger;
                if (response.data.Success == true) {
                    $scope.MessageText = "Updating Appointment Label";
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "Appointment Label Saved";
                        $timeout(function () {
                            $scope.IsVisible = false;
                            $scope.GetEventDetails($scope.AppointmentBookingId, "Update");

                            //$scope.init();
                            //$scope.eventRender();
                            // $scope.uiConfig.calendar.refetchEvents;
                            // $scope.calendar.Calendar('refetchEvents');
                            setTimeout(function () {
                                // $scope.calendar.fullCalendar('refetchEvents');
                                //uiCalendarConfig.calendars.myCalendar.fullCalendar('changeView', 'agendaWeek');
                                // uiCalendarConfig.calendars.myCalendar.fullCalendar('refetchEvents');

                            }, 2000);
                            //  $scope.calendar.fullCalendar('refetchEvents');
                            // var calendar = angular.element(document.querySelector("calendar")).fullCalendar('refetchEvents');
                        }, 800)
                    }, 1000)
                }
            })
        }

        $scope.EditAppointment = function () {
            debugger;
            //Close the Detail PopUp//
            angular.element(document.querySelector("#detailPopup")).css("display", "none");

            //Get All Staff of particular CompanyId
            var GetStaffProvider = bookingService.GetStaffData($routeParams.CompanyId);
            GetStaffProvider.then(function (response) {
                $scope.Provider = [];
                for (var i = 0; i < response.data.length; i++) {
                    $scope.Provider.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'UserName': response.data[i].UserName, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email });
                }
            });
            $scope.Status = $scope.UpdatedStatus;

            $scope.selectedprovider = $scope.AppointmentEmployeeId;
            $scope.GetAllocateServiceToEmployee($scope.AppointmentEmployeeId);
            $scope.selectedservice = $scope.AppointmentServiceId;
            var date = $scope.AppointmentStartDate.split("T");
            var appointmentdate = new Date(date[0]);
            var time = date[1].split(":");
            var appointmenttime = new Date(1997, 4, 5, time[0], time[1], time[2]);
            $scope.timeoption = $filter('date')(appointmenttime, 'h:mm a');
            $scope.dt = appointmentdate;
            $scope.ServiceDetail($scope.AppointmentServiceId);

            $scope.price = $scope.AppointmentServiceCost;
            $scope.time = $scope.AppointmentDuration;


        }

        //Update Event on Calendar//
        $scope.UpdateAppointment = function () {
            debugger;
            var appointment =
                 {
                     "Id": $scope.AppointmentBookingId,
                     "CompanyId": $routeParams.CompanyId,
                     "ServiceId": $scope.selectedservice,
                     "EmployeeId": $scope.selectedprovider,
                     //"CustomerIdsCommaSeperated": $scope.CustomerId,
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
                     "Status": $scope.StatusId
                 }



            var apirequest = bookingService.UpdateAppointment(appointment);
            apirequest.then(function (response) {
                if (response.data.Success == false) {
                    if (response.data.Message == "Booking Cannot Be Added , Not Free Slot Available.") {
                        $scope.MessageText = "Not Free Slot Available";
                        $scope.IsVisible = true;
                        $timeout(function () {

                            $scope.IsVisible = false;
                        }, 1000)
                    }
                }
                if (response.data.Success == true) {
                    $scope.MessageText = "Updating Appointment";
                    $scope.IsVisible = true;
                    $scope.AppointmentId = response.data.ReturnObject;
                    $timeout(function () {
                        $scope.MessageText = "Appointment Updated";
                        $timeout(function () {
                            $scope.IsVisible = false;
                            // $scope.GetAppointmentDetails($scope.CustomerId);
                            //  $scope.GetAppointmentDetails(5);
                            //  $scope.GetEventDetails($scope.AppointmentId);

                            var apirequest = bookingService.GetBookingsForEmployeesByIdBetweenDates($routeParams.CompanyId, $scope.Provider[0].Id, firstDay, lastDay);
                            apirequest.then(function (response) {
                                debugger;
                                angular.forEach(response.data, function (value, key) {
                                    for (var i = 0; i < $scope.events.length; i++) {

                                        if ($scope.events[i].description == value.Id) {

                                            $scope.events[i].title = value.ServiceName;
                                            $scope.events[i].id = value.BookingId + "," + value.ServiceName + "," + value.Cost + "," + value.EmployeeName + "," + value.status + "," + value.DurationInMinutes + "," + value.ServiceId + "," + value.EmployeeId  + "," + value.Customers[0].FirstName +","+ value.Customers[0].Id + "," + value.Customers[0].Email + value.Customers[0].TelephoneNo,
                                            $scope.events[i].description = value.BookingId;
                                            $scope.events[i].start = value.StartTime;
                                            $scope.events[i].end = value.EndTime;
                                            uiCalendarConfig.calendars['myCalendar'].fullCalendar('updateEvent', $scope.events[i]);
                                            break;

                                        }
                                    }
                                })
                            })



                            angular.element(document.querySelector("#UpdateAppointmentPopup")).css("display", "none");
                            angular.element(document.querySelector("#UpdateAppointmentPopup")).css("opacity", 0);
                        }, 1000);
                    }, 500)
                }
            })
        }

        //Get Allocated Service to Employee//
        $scope.GetAllocateServiceToEmployee = function (EmployeeId) {
            debugger;
            $scope.EmployeeId = EmployeeId;
            $scope.EmployeeServices = [];
            var EmployeeServices = bookingService.GetAllocatedServicetoEmployee($routeParams.CompanyId, EmployeeId);
            EmployeeServices.then(function (result) {
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
                //  $scope.today();
            }), function () {
                alert('Error in getting post records');
            };
        }


        //Get timeslots corespond to service//
        $scope.ServiceDetail = function (SelectedServiceId) {

            $scope.ServiceId = SelectedServiceId;
            var SelectedService = bookingService.GetSelectedService(SelectedServiceId);
            SelectedService.then(function (response) {

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
                    $scope.DisabledAddCustomerTab = false;
                    $scope.ContinueAppointment = false;
                });

            });
        }


        //Save Event on Calendar//
        $scope.SaveAppointment = function (form) {
            debugger;
            var selectedvalue = $scope.option;

            if (form.$invalid == true) {
                if (form.providerdd.$invalid == true) {
                    form.providerdd.$setTouched();
                    form.providerdd.$touched = true;
                    return false;
                }
                if (form.Servicedd.$invalid == true) {
                    form.Servicedd.$setTouched();
                    form.Servicedd.$touched = true;
                    return false;
                }
                if (form.email.$invalid == true) {
                    form.email.$setTouched();
                    form.email.$touched = true;
                    return false;
                }
                if (form.name.$invalid == true) {
                    form.name.$setTouched();
                    form.name.$touched = true;
                    return false;
                }
                if (form.CustomerMobileNo.$invalid == true) {
                    form.CustomerMobileNo.$setTouched();
                    form.CustomerMobileNo.$touched = true;
                    return false;
                }

            }

            if ($scope.CustomerId == "" || $scope.CustomerId == null) {
                var obj = {
                    Url: '/api/customer/Create',
                    ReqStaffData: {
                        "Id": "",
                        "CompanyId": $routeParams.CompanyId,
                        "UserName": $scope.CustomerEmail,
                        "Password": $scope.customerPassword,
                        "FirstName": $scope.CustomerName,
                        "LastName": "",
                        "Address": "",
                        "PostCode": "",
                        "Email": $scope.CustomerEmail,
                        "TelephoneNo": $scope.CustomerMobileNo,
                        "CreationDate": new Date()
                    }
                }

                var createcustomer = bookingService.CreateCustomer(obj);
                createcustomer.then(function (response) {
                    if (response.data.Success == true) {
                        $scope.CustomerId = response.data.ReturnObject.CustomerId;

                        //Create Appointment of Customer

                        var time = $scope.timeoption.split(" ");
                        var starttime = time[0].split(":");

                        var appointment = {
                            "CompanyId": $routeParams.CompanyId,
                            "ServiceId": $scope.selectedservice,
                            "EmployeeId": $scope.selectedprovider,
                            //"CustomerIdsCommaSeperated": $scope.CustomerId,
                            "CustomerIdsCommaSeperated": $scope.CustomerId,
                            "StartHour": $scope.timeoption,
                            "StartMinute": "",
                            "EndHour": 0,
                            "EndMinute": $scope.time,
                            "IsAdded": true,
                            "Message": $scope.notes,
                            //"CustomerIds": [$scope.CustomerId],
                            "CustomerIds": [$scope.CustomerId],
                            "Start": $scope.dt,
                            "End": $scope.dt,
                            "Status":$scope.Status
                        }

                        var addappointment = bookingService.AddAppointment(appointment);

                        addappointment.then(function (response) {
                            if (response.data.Success == false) {
                                if (response.data.Message == "Booking Cannot Be Added , Not Free Slot Available.") {
                                    $scope.MessageText = "Not Free Slot Available";
                                    $scope.IsVisible = true;
                                    $timeout(function () {

                                        $scope.IsVisible = false;
                                    }, 1000)
                                }
                            }
                            if (response.data.Success == true) {
                                $scope.MessageText = "Creating Appointment";
                                $scope.IsVisible = true;
                                $scope.AppointmentId = response.data.ReturnObject;
                                $timeout(function () {
                                    $scope.MessageText = "Created Appointment";

                                    $timeout(function () {
                                        var SetStatus = bookingService.SetStatusofAppointment($scope.Status, $scope.AppointmentId);
                                        SetStatus.then(function (response) {
                                            $scope.GetEventDetails($scope.AppointmentId);
                                            angular.element(document.querySelector("#squarespaceModal")).css("display", "none");
                                            angular.element(document.querySelector("#squarespaceModal")).css("opacity", 0);
                                            $scope.IsVisible = false;
                                            //})

                                        })
                                    }, 1000);
                                }, 500)
                            }
                        });


                    }
                    else {
                        if (response.data.Message == "Customer creation failed: Already member") {
                            $scope.MessageText = "Customer Already Exits";
                            $scope.IsVisible = true;

                            $timeout(function () {
                                $scope.IsVisible = false;
                            }, 800)

                        }
                    }
                })
            }

            else {
                var time = $scope.timeoption.split(" ");
                var starttime = time[0].split(":");

                var appointment = {
                    "CompanyId": $routeParams.CompanyId,
                    "ServiceId": $scope.selectedservice,
                    "EmployeeId": $scope.selectedprovider,
                    //"CustomerIdsCommaSeperated": $scope.CustomerId,
                    "CustomerIdsCommaSeperated": $scope.CustomerId,
                    "StartHour": $scope.timeoption,
                    "StartMinute": "",
                    "EndHour": 0,
                    "EndMinute": $scope.time,
                    "IsAdded": true,
                    "Message": $scope.notes,
                    //"CustomerIds": [$scope.CustomerId],
                    "CustomerIds": [$scope.CustomerId],
                    "Start": $scope.dt,
                    "End": $scope.dt,
                    "Status": $scope.Status
                }

                var addappointment = bookingService.AddAppointment(appointment);

                addappointment.then(function (response) {
                    if (response.data.Success == false) {
                        if (response.data.Message == "Booking Cannot Be Added , Not Free Slot Available.") {
                            $scope.MessageText = "Not Free Slot Available";
                            $scope.IsVisible = true;
                            $timeout(function () {

                                $scope.IsVisible = false;
                            }, 1000)
                        }
                    }
                    if (response.data.Success == true) {
                        $scope.MessageText = "Creating Appointment";
                        $scope.IsVisible = true;
                        $scope.AppointmentId = response.data.ReturnObject;
                        $timeout(function () {
                            $scope.MessageText = "Created Appointment";

                            $timeout(function () {
                                var SetStatus = bookingService.SetStatusofAppointment($scope.Status, $scope.AppointmentId);
                                SetStatus.then(function (response) {
                                    $scope.GetEventDetails($scope.AppointmentId);
                                    angular.element(document.querySelector("#squarespaceModal")).css("display", "none");
                                    angular.element(document.querySelector("#squarespaceModal")).css("opacity", 0);
                                    $scope.IsVisible = false;
                                    //})

                                })
                            }, 1000);
                        }, 500)
                    }
                });
            }
        }

        //Delete Event on Calendar//
        $scope.DeleteAppointment = function () {
            debugger
            var checkdelete = false;
            var apirequest = bookingService.GetBookingsForEmployeesByIdBetweenDates($routeParams.CompanyId, $scope.selectedstaff, firstDay, lastDay);
            apirequest.then(function (response) {
                debugger;
                angular.forEach(response.data, function (value, key) {
                    for (var i = 0; i < $scope.events.length; i++) {
                        if ($scope.events[i].description.includes(value.Id) && checkdelete == false) {
                            checkdelete = true;
                            var index = $scope.events[i].description.indexOf(value.BookingId);;
                            $scope.events.splice(index, 1);
                            //var event = $scope.events[i];
                            //uiCalendarConfig.calendars['myCalendar'].fullCalendar('removeEvents', event);
                            break;
                        }
                    }
                })
                var apirequest = bookingService.DeleteAppointment($scope.AppointmentBookingId);
                apirequest.then(function (response) {
                    if (response.data.Success == true) {
                        $scope.MessageText = "Deleting Appointment";
                        $scope.IsVisible = true;
                        $timeout(function () {
                            $scope.MessageText = "Appointment Deleted";
                            $timeout(function () {
                                // $scope.GetEventDetails($scope.AppointmentBookingId,"Delete");

                                angular.element(document.querySelector("#detailPopup")).css("display", "none");
                                $scope.IsVisible = false;

                            }, 800)
                        }, 1000)
                    }
                })

            })
        }

        $scope.GetEventDetails = function (AppointmentId, Operation) {
            debugger;
            var apirequest = bookingService.GetBookingsForEmployeesByIdBetweenDates($routeParams.CompanyId, $scope.Provider[0].Id, firstDay, lastDay);
            apirequest.then(function (response) {
                //$scope.events = [];                                  
                angular.forEach(response.data, function (value, key) {


                    if (AppointmentId == value.Id) {
                        $scope.events.push({
                            title: value.Service.Name,
                            id: value.Id + "," + value.Service.Name + "," + value.Service.Cost + "," + value.Employee.FirstName + "," + value.Status + "," + value.Service.DurationInMinutes + "," + value.Service.Id + "," + value.Employee.Id + "," + value.Customers[0].FirstName + value.Customers[0].Id +"," + value.Customers[0].Email +","+ value.Customers[0].TelephoneNo,
                            description: value.Id,
                            start: value.Start,
                            end: value.End,
                            allDay: value.IsFullDay,
                            color: value.Service.Colour,
                            textColor: "black"
                        });
                        $scope.selectedstaff = value.Employee.Id;
                    }
                })
                $scope.eventSources[0] = $scope.events;
            })
        }


        $scope.today = function () {
            $scope.dt = new Date();
        };

        $scope.CloseUpdateAppointmentPopup = function () {
            $scope.today();
            $scope.timeslotsloading = false;
            $scope.selectedservice = "";
            $scope.price = "";
            $scope.time = "";
            $scope.timeoption = "";
            $scope.timeInfoFrom = [];
            $scope.Status = "1";
            $scope.selectedprovider = "-- Select a Provider --";
            $scope.notes = "";
            $scope.ServicePriceTimeDetailIsVisible = false;
        }


        //$scope.SetDatePicker = function () {
        //    //if ($scope.count == 0) {
        //    //    $scope.count = $scope.count + 1;
        //   // $scope.today();
        //    //}
        //}

        $scope.EditDatePicker = function () {
            //if ($scope.editcount == 0) {
            //    $scope.editcount = $scope.editcount + 1;
            $scope.today();
            //}              
        }
        $scope.disabled = function (date, mode) {
            return (mode == 'day' && (date.getDay() == $scope.AppointmentSchedule[0] || date.getDay() == $scope.AppointmentSchedule[1] || date.getDay() == $scope.AppointmentSchedule[2] || date.getDay() == $scope.AppointmentSchedule[3] || date.getDay() == $scope.AppointmentSchedule[4] || date.getDay() == $scope.AppointmentSchedule[5] || date.getDay() == $scope.AppointmentSchedule[6]));
        };

        $scope.open = function () {
            $timeout(function () {
                $scope.opened = true;
            });
        };

        $scope.$watch("dt", function (newValue, oldValue) {
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
                        $scope.timeoption = $scope.timeInfoFrom[0];
                        $scope.timeslotsloading = false;
                    }
                });
            }
        });

      
        $scope.SetDatePicker = function () {
            //if ($scope.count == 0) {
            //    $scope.count = $scope.count + 1;
            //$scope.today();
            //}
        }
        $scope.open = function () {
            $timeout(function () {
                $scope.opened = true;
            });
        };

        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        };

        $scope.Logout = function () {
            $rootScope.IsLoggedInUser = false;
            var apirequest = bookingService.SignOut();
            sessionStorage.removeItem('userInfo-token');
            $location.path("/signin");
        }


        //Get Customer by Search term//
        $scope.GetSearchCustomer = function (searchterm) {
            $scope.FilterCustomerList = [];
            debugger;
            if (searchterm != "") {
                var apirequest = bookingService.GetSearchCustomer($routeParams.CompanyId, searchterm);
                apirequest.then(function (response) {
                    $scope.counted = response.data.length;
                    $scope.FilterCustomerList = response.data;
                })
            }
            }
        


    }]);