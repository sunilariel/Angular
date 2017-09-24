﻿/// <reference path="../View/Calendar/CalendarModal.html" />


app.controller('calendarController', ['$scope', '$location', '$filter', '$window', '$routeParams',
    '$q', '$http', '$timeout', 'bookingService', '$rootScope', 'uiCalendarConfig','$templateCache','$compile',
    function ($scope, $location, $filter, $window, $routeParams, $q, $http, $timeout, bookingService, $rootScope,
        uiCalendarConfig,$templateCache,$compile) {
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

        $scope.init = function () {           
            debugger;
            $scope.timeInfoFrom = [];
            $scope.AppointmentSchedule = [];
            $scope.appointmentDetailisVisible = false;
            $scope.SelectedEvent = null;
            $scope.events = [];
            $scope.eventSources = [$scope.events];

            var apirequest = bookingService.GetAppointmentDetails(5);
            apirequest.then(function (response) {
                debugger;
                angular.forEach(response.data, function (value, key) {
                    $scope.events.push({
                        title: value.ServiceName,
                        id: value.BookingId + "," + value.ServiceName + "," + value.Cost + "," + value.EmployeeName + "," + value.status + "," + value.DurationInMinutes + "," + value.ServiceId + "," + value.EmployeeId,
                        description: value.Description,
                        start: value.StartTime,
                        end: (value.EndTime),
                        allDay: value.IsFullDay,
                        color: value.Colour,
                        textColor:"black"
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

            //Load events from server
            //$http.get('/Calendar/getevents', {
            //    cache: false,
            //    params: { companyId: $routeParams.CompanyId },
            //    headers: bookingService.GetHeader()
            //}).then(function (data) {
            //    $scope.events.slice(0, $scope.events.length);
            //    angular.forEach(data.data, function (value) {
            //        $scope.events.push({
            //            title: value.Title,
            //            id: value.EventID,
            //            description: value.Description,
            //            start: new Date(parseInt(value.StartAt.substr(6))),
            //            end: new Date(parseInt(value.EndAt.substr(6))),
            //            allDay: value.IsFullDay
            //        });
            //    });
            //});
            $scope.StatusList = [{ Status: "No Label", "Value": 1 },
            { Status: "Pending", "Value": 2 },
            { Status: "Confirmed", "Value": 3 },
            { Status: "Done", "Value": 4 },
            { Status: "Paid", "Value": 6 },
            { Status: "NoShow ", "Value": 5 },
            { Status: "RunningLate", "Value": 7 }
            ]


            //Getting all employees(provider) for appointment dropdown(Add Appointment)
            var GetStaffProvider = bookingService.GetStaffData($routeParams.CompanyId);
            GetStaffProvider.then(function (response) {
                $scope.Provider = [];
                for (var i = 0; i < response.data.length; i++) {
                    $scope.Provider.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'UserName': response.data[i].UserName, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email });
                }
            });
         
        }
        $scope.uiConfig = {
            calendar: {
                height: 577,
                editable: true,
                displayEventTime: false,
                header: {
                    left: 'month agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                eventAfterAllRender: $scope.eventAfterAllRender,
                eventClick: $scope.GetCurrentEvent,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender,           
                dayClick: $scope.CurrentDateClick,
                updateEvents: $scope.updateEventsClick,
                getEventSources: $scope.getEventSources,
                refetchEvents: $scope.refetchEvents,
                businessHours: [ // specify an array instead
    {
        dow: [1, 3], // Monday, Tuesday, Wednesday
        start: '08:00', // 8am
        end: '14:00' // 6pm
    },
    {
        dow: [2],
        start: "08:00",
        end: '20:00'
    },
    {
        dow: [4, 5], // Thursday, Friday
        start: '10:00', // 10am
        end: '16:00' // 4pm
    }
                ],
                eventSources: [

       // your event source
       {
           events: [],
           // an option!
           
       }

       // any other event sources...

                ],
                //eventClick: function (event) {
                //    $scope.SelectedEvent = event;
                //},

               
            }
             
        };

        $scope.getSelectedStaff = function (item) {
            
            alert(item);
        };
          
        $scope.headerinit = true;
        $scope.eventAfterAllRender= function () {
            
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
                })
            }

                //var viewhtml = "<select class='form-control' ng-model='selectedview' ng-change = changeView() style='width:77px;height: 30px;'><option value='Weekly'>Weekly</option><option value='Daily'>Daily</option><option value='Monthly' class='fc-month-button fc-button fc-state-default fc-corner-left fc-corner-right'>Monthly</option></select>";
                //var tempviewhtml = $compile(viewhtml)($scope);
                //angular.element(e).append(tempviewhtml);

           
            //var script = document.getElementsByTagName("script");
            //var id = script[29].id;
            //var htmlContent = $templateCache.get(id);
            //var e = document.getElementsByClassName("fc-left");
            //var html = "<select class='form-control' ng-model='selectedstaff' ng-change = getSelectedStaff(selectedstaff) ><option value='A1'>'A1'</option><option value='A2'>'A2'</option></select>";
            //var temphtml = $compile(html)($scope);
            //angular.element(e).append(temphtml);

            //if ($scope.events.length > 0 && isFirstTime) {
            //    //Focus first event
            //    uiCalendarConfig.calendars.myCalendar.fullCalendar('gotoDate', $scope.events[0].start);
            //    //https://github.com/angular-ui/ui-calendar/issues/418
            //    //angular.element('.calendar').fullCalendar('gotoDate');
            //}
        }
        $scope.getSelectedStaff = function (item) {
            alert(item);
        }

        $scope.alertOnEventClick = function (event) {            
            alert(event);
        }

        $scope.CurrentDateClick = function (date, jsEvent, view, resourceObj) {
            debugger;          
            angular.element(document.querySelector("#squarespaceModal")).css("display", "block");
            angular.element(document.querySelector("#squarespaceModal")).css("opacity", 1);
            $scope.today();
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
        }
      
        $scope.CloseAppointmentModal = function () {
            angular.element(document.querySelector("#squarespaceModal")).css("display", "none");
            angular.element(document.querySelector("#squarespaceModal")).css("opacity", 0);
        }

        $scope.updateEventsClick = function () {
            alert("update events");
        }

        //Click on event function//
        $scope.GetCurrentEvent = function (event) {              
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
            if (event.hasOwnProperty("id")==true) {
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

                element[0].innerHTML = "<div class='fc-content'><span class='fc-title' style='padding-left:5px;font-size: 12px;font-weight: 500;'>c1</span><span class='fc-title' style='text-align: right;float: right;font-size: 9px;padding: 0px 5px;'>" + status + "</span><div style='margin-top: 20px;'><span style='padding-left:5px;font-size: 12px;'>" + eventdetail[1] + "  " + "£" + eventdetail[2] + "</span></div></div>";
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
                     "CustomerIdsCommaSeperated": 5,
                     "StartHour": $scope.timeoption,
                     "StartMinute": "",
                     "EndHour": 0,
                     "EndMinute": $scope.time,
                     "IsAdded": true,
                     "Message": "",
                     "CustomerIds": [5],
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
                       // $scope.timeoption = $scope.timeInfoFrom[0];
                    }
                    $scope.timeslotsloading = false;
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
            }
            var time = $scope.timeoption.split(" ");
            var starttime = time[0].split(":");



            var appointment = {

                "CompanyId": $routeParams.CompanyId,
                "ServiceId": $scope.selectedservice,
                "EmployeeId": $scope.selectedprovider,
                //"CustomerIdsCommaSeperated": $scope.CustomerId,
                "CustomerIdsCommaSeperated": 5,
                "StartHour": $scope.timeoption,
                "StartMinute": "",
                "EndHour": 0,
                "EndMinute": $scope.time,
                "IsAdded": true,
                "Message": $scope.notes,
                //"CustomerIds": [$scope.CustomerId],
                "CustomerIds": [5],
                "Start": $scope.dt,
                "End": $scope.dt,
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
                         $scope.uiConfig = {
            calendar: {
                height: 577,
                editable: true,
                displayEventTime: false,
                header: {
                    left: 'month agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                eventAfterAllRender: $scope.eventAfterAllRender,
                eventClick: $scope.GetCurrentEvent,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender,           
                dayClick: $scope.CurrentDateClick,
                updateEvents: $scope.updateEventsClick,
                getEventSources: $scope.getEventSources,
                refetchEvents: $scope.refetchEvents,
                businessHours: [ // specify an array instead
    {
        dow: [1, 3], // Monday, Tuesday, Wednesday
        start: '08:00', // 8am
        end: '14:00' // 6pm
    },
    {
        dow: [2],
        start: "08:00",
        end: '20:00'
    },
    {
        dow: [4, 5], // Thursday, Friday
        start: '10:00', // 10am
        end: '16:00' // 4pm
    }
                ],
                eventSources: [

       // your event source
       {
           events: [],
           // an option!
           
       }

       // any other event sources...

                ],
                //eventClick: function (event) {
                //    $scope.SelectedEvent = event;
                //},

               
            }
             
        };
                        $timeout(function () {
                            var SetStatus = bookingService.SetStatusofAppointment($scope.Status, $scope.AppointmentId);
                            SetStatus.then(function (response) {
                                //  $scope.GetAppointmentDetails($scope.CustomerId);
                                angular.element(document.querySelector("#UpdateAppointmentPopup")).css("display", "none");
                                angular.element(document.querySelector("#UpdateAppointmentPopup")).css("opacity", 0);
                                $scope.IsVisible = false;
                            })
                        }, 1000);
                    }, 500)
                }
            });
        }








        //Delete Event on Calendar//
        $scope.DeleteAppointment = function () {
            var apirequest = bookingService.DeleteAppointment($scope.AppointmentBookingId);
            apirequest.then(function (response) {
                if (response.data.Success == true) {
                    $scope.MessageText = "Deleting Appointment";
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "Appointment Deleted";
                        $timeout(function () {
                           // $scope.GetAppointmentDetails($scope.CustomerId);
                            angular.element(document.querySelector("#detailPopup")).css("display", "none");
                            $scope.IsVisible = false;

                        }, 800)
                    }, 1000)
                }
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


        $scope.SetDatePicker = function () {
            //if ($scope.count == 0) {
            //    $scope.count = $scope.count + 1;
            $scope.today();
            //}
        }

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
}]);