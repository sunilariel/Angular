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

        //Global Variables//
        $scope.eventSources = [];
        $scope.events = [];       
        $scope.WorkingHours = [];
        $scope.BuisnessWorkingHours = [];
        $scope.headerinit = true;
        $scope.AllProviders = "";
        $scope.ViewList = [{ "Name": "Monthly", "ViewName": "month" },
           { "Name": "Daily", "ViewName": "agendaDay" },
           { "Name": "Weekly", "ViewName": "agendaWeek" }];
        $scope.SelectedView = "month";


        //Set Company Buisness Working Hours//

        $scope.timeInfFrom = ["12:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"];
      

        $scope.timeInfoTo = ["12:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"];
        
        $scope.businessHourInfo = [{ 'day': 'Monday', 'timeFrom': "08:00 AM", 'timeTo': "05:00 PM", 'available': true, 'NameOfDay': 1 },
        { 'day': 'Tuesday', 'timeFrom': "08:00 AM", 'timeTo': "05:00 PM", 'available': true, 'NameOfDay': 2 },
        { 'day': 'Wednesday', 'timeFrom': "08:00 AM", 'timeTo': "05:00 PM", 'available': true, 'NameOfDay': 3 },
        { 'day': 'Thursday', 'timeFrom': "08:00 AM", 'timeTo': "05:00 PM", 'available': true, 'NameOfDay': 4 },
        { 'day': 'Friday', 'timeFrom': "08:00 AM", 'timeTo': "05:00 PM", 'available': true, 'NameOfDay': 5 },
        { 'day': 'Saturday', 'timeFrom': "08:00 AM", 'timeTo': "05:00 PM", 'available': false, 'NameOfDay': 6 },
        { 'day': 'Sunday', 'timeFrom': "08:00 AM", 'timeTo': "05:00 PM", 'available': false, 'NameOfDay': 0 }, ]


        //--------------Initialize Full Calendar-----------//

        $scope.uiConfig = {
            calendar: {
                height: 577,
                editable: true,
                displayEventTime: false,
                header: {
                    left: '',
                   center: 'today prev,next',                 
                    right: ''
                },
                resources: [],
                views: {
                    agendaWeek: { // name of view
                        columnFormat: 'ddd,MMM D',
                        titleFormat:'MMM D'                        
                    }
                },
                viewRender: function (view, element) {
                    debugger;
                    view.title = 'Your Custom Title';
                },
                allDaySlot: false,                                             
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
                
            }
        };
       
       

        //Initialize funtion//
        $scope.init = function () {
            debugger;
           
            $scope.cdate = new Date();
            $scope.FilterCustomerList = [];
            $scope.showProviderDrpDwn = false;
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
            var AllStaff = "";
            $scope.CreateCustomer = false;
            $scope.timeInfoFrom = [];
            $scope.AppointmentSchedule = [];
            $scope.appointmentDetailisVisible = false;
            $scope.SelectedEvent = null;
             $scope.events = [];           
             $scope.Provider = [];    
            $scope.CustomerList = [];
            $scope.WorkingHours = [];
            $scope.BuisnessWorkingHours = [];
            var resourceobj = "";

            var GetCustomer = bookingService.GetAllCustomer($routeParams.CompanyId);
            GetCustomer.then(function (response) {
                $scope.CustomerList = response.data;
                $scope.CustomerCount = response.data.length;
            })

            //Getting all employees(provider) for appointment dropdown(Add Appointment)
            var GetStaffProvider = bookingService.GetStaffData($routeParams.CompanyId);
            GetStaffProvider.then(function (response) {

                for (var i = 0; i < response.data.length; i++) {
                    resourceobj = "";
                    $scope.Provider.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'UserName': response.data[i].UserName, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email });                  
                    resourceobj = {
                        id: response.data[i].Id,
                        title: response.data[i].FirstName
                    }
                    
                   // $('#selectedprovider').val($scope.Provider[0].FirstName);
                     //AllStaff = response.data[i].Id + "," + AllStaff;
                                 
                    uiCalendarConfig.calendars['myCalendar'].fullCalendar('addResource', resourceobj);

                }               
                //$scope.selectedid = (response.data[0].id).tostring();
                //$scope.selectedstaff = (response.data[0].firstname).tostring();

                //$scope.AllProviders = AllStaff.substring(0, AllStaff.length - 1);

                var apirequest = bookingService.GetBookingsForEmployeesByIdBetweenDates($routeParams.CompanyId, $scope.Provider[0].Id, firstDay, lastDay);
                apirequest.then(function (response) {
                    debugger;
                    if (response.data.length != 0) {
                        angular.forEach(response.data[0].Employee.WorkingHours, function (value, key) {
                            if (value.IsOffAllDay == false) {
                                $scope.BuisnessWorkingHours.push({ "dow": [value.NameOfDay], "start": value.Start, "end": value.End })
                            }
                        });
                    }
                    $scope.WorkingHours[0] = $scope.BuisnessWorkingHours;                    
                    //uiCalendarConfig.calendars['myCalendar'].fullCalendar('render');
                    uiCalendarConfig.calendars['myCalendar'].fullCalendar('option', {
                        businessHours: $scope.WorkingHours[0]
                    });
                                                         
                    angular.forEach(response.data, function (value, key) {
                        $scope.events.push({
                            title: value.Service.Name,
                            //id: value.Id + "," + value.Service.Name + "," + value.Service.Cost + "," + value.Employee.FirstName + "," + value.Status + "," + value.Service.DurationInMinutes + "," + value.Service.Id + "," + value.Employee.Id + "," + value.Customers[0].FirstName +","+ value.Customers[0].Id + "," + value.Customers[0].Email + value.Customers[0].TelephoneNo ,
                            id: value.Id + "," + value.Service.Name + "," + value.Service.Cost + "," + value.Employee.FirstName + "," + value.Status + "," + value.Service.DurationInMinutes + "," + value.Service.Id + "," + value.Employee.Id,
                            description: value.Id,
                            resourceId:value.Employee.Id,
                            start: value.Start,
                            end: value.End,
                            allDay: value.IsFullDay,
                            color: value.Service.Colour,
                            textColor: "black"
                        });                                               
                    })

                    uiCalendarConfig.calendars['myCalendar'].fullCalendar('addEventSource', $scope.events);
                   
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
        }
     
        //-----------------Full Calendar Events--------------------//
      
        //Events Executed after all events has been rendered//        
        $scope.eventAfterAllRender = function () {
            debugger;

            //This code will render only on intialize time.
            if ($scope.headerinit == true) {
                $scope.headerinit = false
                var apirequest = bookingService.GetStaffData($routeParams.CompanyId);
                apirequest.then(function (response) {
                    debugger;
                    $scope.AllStaff = response.data;

                    //Dynamically adding html for full calendar header left section//
                    var e = document.getElementsByClassName("fc-left");

                    //Adding Staff Dropdown html //
                    var staffhtml = "<div class='dropdownwtest' style='float:left;'><button class='dropbtntesta' ng-hide = 'showProviderDrpDwn'> <img class='testimgs' src='../Content/Assets/images/provider_img2.png'><span class='barhdermrgns' id='selectedprovider'>{{selectedstaff}} </span> <span class='bariconodersd'><i class='fa fa-caret-down cheaderic' aria-hidden='true'></i></span></button><div class='dropdowntestcontent' style='left:0;'><input type='text' class='providersrchb' ng-model='SearchStaff' placeholder='Search Provider...'>";
                  
                    staffhtml = staffhtml + "<a class='subcmrgnf cursorhand' ng-repeat='item in AllStaff | filter:SearchStaff' ng-click = 'getSelectedStaff(item.Id)' ><img class='testimgs' src='../Content/Assets/images/provider_img2.png'><span class='econtent' style='display: inline-block;float: left;margin-top: 6px;'>{{item.FirstName}}</span><span class='bariconoder'><i class='fa fa-bars' aria-hidden='true'></i></span></a>";
                   
                    staffhtml = staffhtml + "</div></div>";

                    var tempstaffhtml = $compile(staffhtml)($scope);
                    angular.element(e).append(tempstaffhtml);

                    $scope.selectedstaff = response.data[0].FirstName;
                    
                    //Adding View Dropdown Html//
                    var ViewHtml = "<div class='dropdownweeky'><button class='dropbtnweeky'>{{SelectedView}}<span class='caret cmpdng'></span></button><ul class='dropcntentwkly'>";                                     
                     angular.forEach($scope.ViewList, function (value, key) {
                         ViewHtml = ViewHtml + "<li ng-click = ChangeView('"+ value.ViewName +"') ><a class='cursorhand'>" + value.Name + "</a></li>";
                     });
                     ViewHtml = ViewHtml + "</ul></div>";

                    var ViewOptionsHtml = $compile(ViewHtml)($scope);
                    angular.element(e).append(ViewOptionsHtml);


                    //Adding datepicker in full calendar center section//
                    var e = document.getElementsByClassName("fc-prev-button");
                    var datepickerhtml = "<input id='cldtest' type='text' class='form-control calendarBox' datepicker-popup='EEE, MMM d' ng-model='cdate' is-open='Opened' ng-mouseover='Opened=true;$event.stopPropagation();' datepicker-options='dateOptions' ng-click='SetDatePicker()' name='theDate' style='width: 131px;height: 30px;' />";                    
                    angular.element(e).after(datepickerhtml);
                    $compile($('#cldtest'))($scope);

                    //Adding dropdown in full calendar righ section//
                    var e = document.getElementsByClassName("fc-right");                   
                    var headerhtml = "<div class='row tooldropdwn'><div class='col-sm-3'><div class='dropdownrighticon'> <i class='fa fa-plus maindricons' aria-hidden='true'></i><div class='dropdownbox'><a href='#'><i class='fa fa-users plusbox' aria-hidden='true'></i>Add staff</a><a href='#'><i class='fa fa-truck plusbox' aria-hidden='true'></i>Add service</a><a href='#'><i class='fa fa-book  plusbox' aria-hidden='true'></i>Add customer</a><a href='#'><i class='fa fa-sitemap plusbox' aria-hidden='true'></i>Add class</a></div></div></div><div class='col-sm-3'><div class='dropdownrighticon'><i class='fa fa-signal maindricons' aria-hidden='true'></i><div class='dropdownbox'><a class='signalheader' href='#'>testerariel's Weekly Stats</a><ul class='signalbox'><li class=''><a href='#'><span id='totalApptsCount' class='scontent'>1</span><label class='pricetexts'>Appts.</label></a></li><li><a href='#'><span id='confirmedApptsCost' class='scontent'>₹0</span><label class='pricetexts'>Confirmed</label></a></li><li><a href='#'><span id='projectedApptsCost' class='scontent'>₹0</span><label class='pricetexts'>Projected</label></a></li><div class='clear_all'></div></ul></div></div></div><div class='col-sm-3'><div class='dropdownrighticon'><i class='fa fa-cog settingt maindricons' aria-hidden='true'></i><div class='dropdownbox droprmegnp'><a href='#'>Providers</a><a class='listbbordermtor' href='#'><i class='fa fa-check checkbtn' aria-hidden='true'></i>View as dropdown</a><a class='listbborder' href='#'><i class='fa fa-tablet tabletbtn' aria-hidden='true'></i>view as tabs</a><a class='listbborder' href='#'>Disable off-hours booking</a><a class='listbborder' href='#'>Enable double booking</a><a class='listbborder' href='#'>Disable custom service duration</a><a class='listbborder' href='#'>Disable custom service cost</a><a class='listbborder cursorhand' data-toggle='modal' data-target='#myModal' >Change business hours</a><a class='listbborder' href='#'>Hide calendar stats</a></div></div></div><div class='col-sm-3'> </div></div>";
                  
                    $compile($(headerhtml))($scope);
                    angular.element(e).append(headerhtml);
                 
                })
            }
        }

        //Change View function//
        $scope.ChangeView = function (View) {
            debugger;
            $scope.showProviderDrpDwn = true;
            if (View == "month") {
                $scope.SelectedView="Monthly";
            }
            else if (View == "agendaDay")
            {
                $scope.SelectedView="Daily";
            }
            else if (View == "agendaWeek")
            {
                $scope.SelectedView = "Weekly";
            }
           
            uiCalendarConfig.calendars['myCalendar'].fullCalendar('changeView', View);
            if(View=="agendaDay")
            {
                $scope.events = [];               
                $scope.WorkingHours = [];
                $scope.BuisnessWorkingHours = [];
                var date = new Date();
                var mm = date.getMonth();
                var dd = date.getDate();
                var yy = date.getFullYear();

                var enddate = date.setDate(10, mm, yy);
                var eDate = new Date(enddate);               
                var AllStaff = "";
              
                var GetStaffProvider = bookingService.GetStaffData($routeParams.CompanyId);
                GetStaffProvider.then(function (response) {
                    for (var i = 0; i < response.data.length; i++) {
                        AllStaff = response.data[i].Id + "," + AllStaff;
                    }
                    $scope.AllProviders = AllStaff.substring(0, AllStaff.length - 1);
               
                    var apirequest = bookingService.GetBookingsForEmployeesByIdBetweenDates($routeParams.CompanyId, $scope.AllProviders, eDate, eDate);
                apirequest.then(function (response) {
                    if (response.data.length != 0) {
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
                                //id: value.Id + "," + value.Service.Name + "," + value.Service.Cost + "," + value.Employee.FirstName + "," + value.Status + "," + value.Service.DurationInMinutes + "," + value.Service.Id + "," + value.Employee.Id + "," + value.Customers[0].FirstName +","+ value.Customers[0].Id + "," + value.Customers[0].Email + value.Customers[0].TelephoneNo,
                                id: value.Id + "," + value.Service.Name + "," + value.Service.Cost + "," + value.Employee.FirstName + "," + value.Status + "," + value.Service.DurationInMinutes + "," + value.Service.Id + "," + value.Employee.Id,
                                description: value.Id,
                                start: value.Start,
                                resourceId: value.Employee.Id,
                                end: value.End,
                                allDay: value.IsFullDay,
                                color: value.Service.Colour,
                                textColor: "black"
                            });
                        })
                        uiCalendarConfig.calendars['myCalendar'].fullCalendar('removeEventSources');
                        uiCalendarConfig.calendars['myCalendar'].fullCalendar('addEventSource', $scope.events)                        
                    }
                });

            });
            }
            else {
                uiCalendarConfig.calendars['myCalendar'].fullCalendar('removeEventSources');               
                $scope.init();
            }
        }

        //Staff Dropdown Change function//
        $scope.getSelectedStaff = function (Id) {
            debugger;
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            //if ($scope.events.length > 0) {
                uiCalendarConfig.calendars['myCalendar'].fullCalendar('removeEventSources');
            //}
            
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
                        //id: value.Id + "," + value.Service.Name + "," + value.Service.Cost + "," + value.Employee.FirstName + "," + value.Status + "," + value.Service.DurationInMinutes + "," + value.Service.Id + "," + value.Employee.Id + "," + value.Customers[0].FirstName +","+ value.Customers[0].Id + "," + value.Customers[0].Email + value.Customers[0].TelephoneNo,
                        id: value.Id + "," + value.Service.Name + "," + value.Service.Cost + "," + value.Employee.FirstName + "," + value.Status + "," + value.Service.DurationInMinutes + "," + value.Service.Id + "," + value.Employee.Id ,
                        description: value.Id,
                        start: value.Start,
                        resourceId: value.Employee.Id,
                        end: value.End,
                        allDay: value.IsFullDay,
                        color: value.Service.Colour,
                        textColor: "black"
                    });

                    $("#selectedprovider").text(value.Employee.FirstName);
                   // $scope.selectedstaff = value.Employee.FirstName;
                    
                })
                $scope.selectedId = Id;
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
      
        //On click on date on Calendar//
        $scope.CurrentDateClick = function (date, jsEvent, view, resourceObj) {
            debugger;
            var  cdate = $filter('date')(date._d, "EEE, MMM d");
            $("#datepicker").val(cdate);
            $scope.dt = date._d;
            $scope.ShowSubmit = false;
            $scope.ContinueAppointment = true;

            angular.element(document.querySelector("#squarespaceModal")).css("display", "block");
            angular.element(document.querySelector("#squarespaceModal")).css("opacity", 1);
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

            angular.element(document.querySelector("#searchCustomer")).css("display", "none");
            angular.element(document.querySelector("#Calendartab")).removeClass("active");
            angular.element(document.querySelector("#Calendarcustomer")).css("display", "none");
            angular.element(document.querySelector("#calendardetail")).css("display", "block");
            angular.element(document.querySelector("#Appointmenttab")).addClass("active");
            angular.element(document.querySelector("#modalfooter")).css("display", "block");
           
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
     
        //Render the events one by one.
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
               // var html = "<div class='fc-content'><span class='fc-title'>s1</span><span class='fc-title' style='text-align: right;float: right;'>s1</span><div style='margin-top: 20px;'><span>fsdf</span><span>fsdf</span></div></div>";

                element[0].innerHTML = "<div class='fc-content'><span class='fc-title unmaincntent' style='padding-left:5px;font-size: 11px;font-weight: 500;'>" + eventdetail[8] + "</span><span class='fc-title' style='text-align: right;float: right;font-size: 9px;padding: 0px 5px;'>" + status + "</span><div style='margin-top: 20px;'><span style='padding-left:5px;font-size: 11px !important;'>" + eventdetail[1] + "  " + "£" + eventdetail[2] + "</span></div></div>";
            }
        }

        //Update the Status of Event//
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

                            var apirequest = bookingService.GetBookingsForEmployeesByIdBetweenDates($routeParams.CompanyId, $scope.selectedId, firstDay, lastDay);
                            apirequest.then(function (response) {
                                if (response.data.length != 0) {
                                    $scope.events = [];
                                    angular.forEach(response.data, function (value, key) {
                                        $scope.events.push({
                                            title: value.Service.Name,
                                            //id: value.Id + "," + value.Service.Name + "," + value.Service.Cost + "," + value.Employee.FirstName + "," + value.Status + "," + value.Service.DurationInMinutes + "," + value.Service.Id + "," + value.Employee.Id + "," + value.Customers[0].FirstName +","+ value.Customers[0].Id + "," + value.Customers[0].Email + value.Customers[0].TelephoneNo,
                                            id: value.Id + "," + value.Service.Name + "," + value.Service.Cost + "," + value.Employee.FirstName + "," + value.Status + "," + value.Service.DurationInMinutes + "," + value.Service.Id + "," + value.Employee.Id,
                                            description: value.Id,
                                            start: value.Start,
                                            resourceId: value.Employee.Id,
                                            end: value.End,
                                            allDay: value.IsFullDay,
                                            color: value.Service.Colour,
                                            textColor: "black"
                                        });
                                    })
                                }

                                for (var i = 0; i < $scope.events.length; i++) {
                                    if ($scope.events[i].description == $scope.AppointmentBookingId) {
                                        var events = $scope.events[i].id.split(",");
                                        $scope.events[i].id = events[0] + "," + events[1] + "," + events[2] + "," + events[3] + "," + item.Value + "," + events[5] + "," + events[6] + "," + events[7] + "," + events[8] + "," + events[9] + "," + events[10] + events[11]
                                        break;
                                    }
                                }

                                uiCalendarConfig.calendars['myCalendar'].fullCalendar('removeEventSources');
                                uiCalendarConfig.calendars['myCalendar'].fullCalendar('addEventSource', $scope.events);

                            });

                            


                          //  $scope.GetEventDetails($scope.AppointmentBookingId, "Update");

                            //$scope.init();
                            //$scope.eventRender();
                            // $scope.uiConfig.calendar.refetchEvents;
                            // $scope.calendar.Calendar('refetchEvents');
                           
                                // $scope.calendar.fullCalendar('refetchEvents');
                                //uiCalendarConfig.calendars.myCalendar.fullCalendar('changeView', 'agendaWeek');
                                // uiCalendarConfig.calendars.myCalendar.fullCalendar('refetchEvents');

                           
                            //  $scope.calendar.fullCalendar('refetchEvents');
                            // var calendar = angular.element(document.querySelector("calendar")).fullCalendar('refetchEvents');
                        }, 800)
                    }, 1000)
                }
            })
        }

        //Get Details of Appointment//
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

            angular.element(document.querySelector("#UpdateAppointmentPopup")).css("display", "block");
            angular.element(document.querySelector("#UpdateAppointmentPopup")).css("opacity", 1);
        }

        //Update Event on Calendar//
        $scope.UpdateAppointment = function () {
            debugger;
            $scope.events = [];
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

                            var apirequest = bookingService.GetBookingsForEmployeesByIdBetweenDates($routeParams.CompanyId, $scope.selectedprovider, firstDay, lastDay);
                            apirequest.then(function (response) {
                                debugger;
                                //angular.forEach(response.data, function (value, key) {
                                //    for (var i = 0; i < $scope.events.length; i++) {

                                //        if ($scope.events[i].description == value.id) {

                                //            $scope.events[i].title = value.servicename;
                                //            $scope.events[i].id = value.bookingid + "," + value.servicename + "," + value.cost + "," + value.employeename + "," + value.status + "," + value.durationinminutes + "," + value.serviceid + "," + value.employeeid + "," + value.customers[0].firstname + "," + value.customers[0].id + "," + value.customers[0].email + value.customers[0].telephoneno,
                                //            $scope.events[i].description = value.bookingid;
                                //            $scope.events[i].resourceid = value.employeeid;
                                //            $scope.events[i].start = value.starttime;
                                //            $scope.events[i].end = value.endtime;
                                //            //uicalendarconfig.calendars['mycalendar'].fullcalendar('updateevent', $scope.events[i]);
                                //            break;

                                //        }
                                //    }
                                //});
                                angular.forEach(response.data, function (value, key) {
                                    $scope.events.push({
                                        title: value.Service.Name,
                                        id: value.Id + "," + value.Service.Name + "," + value.Service.Cost + "," + value.Employee.FirstName + "," + value.Status + "," + value.Service.DurationInMinutes + "," + value.Service.Id + "," + value.Employee.Id,
                                        description: value.Id,
                                        resourceId: value.Employee.Id,
                                        start: value.Start,
                                        end: value.End,
                                        allDay: value.IsFullDay,
                                        color: value.Service.Colour,
                                        textColor: "black"
                                    });
                                })
                                //})

                                uiCalendarConfig.calendars['myCalendar'].fullCalendar('removeEventSources');
                                uiCalendarConfig.calendars['myCalendar'].fullCalendar('addEventSource', $scope.events);
                              
                                $scope.getSelectedStaff($scope.selectedprovider);
                                $('#providers').val($scope.selectedprovider);

                            })

                            ////var apirequest = bookingService.GetBookingsForEmployeesByIdBetweenDates($routeParams.CompanyId, $scope.Provider[0].Id, firstDay, lastDay);
                            ////apirequest.then(function (response) {
                            ////    debugger;

                            //        for (var i = 0; i < $scope.events.length; i++) {

                            //            if ($scope.events[i].description == $scope.AppointmentBookingId) {

                            //                $scope.events[i].title = value.ServiceName;
                            //                $scope.events[i].id = value.BookingId + "," + value.ServiceName + "," + value.Cost + "," + value.EmployeeName + "," + value.status + "," + value.DurationInMinutes + "," + value.ServiceId + "," + value.EmployeeId + "," + value.Customers[0].FirstName + "," + value.Customers[0].Id + "," + value.Customers[0].Email + value.Customers[0].TelephoneNo,
                            //                $scope.events[i].description = value.BookingId;
                            //                $scope.events[i].resourceId = value.EmployeeId;
                            //                $scope.events[i].start = value.StartTime;
                            //                $scope.events[i].end = value.EndTime;
                            //                //uiCalendarConfig.calendars['myCalendar'].fullCalendar('updateEvent', $scope.events[i]);
                            //                break;

                            //            }
                            //        }

                            ////})


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
                                            $scope.ShowSubmit = false;
                                            angular.element(document.querySelector("#squarespaceModal")).css("display", "none");
                                            angular.element(document.querySelector("#squarespaceModal")).css("opacity", 0);
                                            $scope.IsVisible = false;
                                            //})
                                            
                                            //Clear the values//
                                            $scope.timeslotsloading = false;
                                            $scope.selectedservice = null;
                                            $scope.price = null;

                                           
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

                                    // Clear the values//
                                     $scope.timeslotsloading = false;
            $scope.selectedservice = null;
            $scope.price = null;

           
                                })
                            }, 1000);
                        }, 500)
                    }
                });
            }
        }

        //Delete Event on Calendar//
        $scope.DeleteAppointment = function (Id) {
            debugger
            $scope.events = [];
            var checkdelete = false;
            var apirequest = bookingService.GetBookingsForEmployeesByIdBetweenDates($routeParams.CompanyId, $scope.selectedId, firstDay, lastDay);
            apirequest.then(function (response) {
                debugger;
                angular.forEach(response.data, function (value, key) {
                    //for (var i = 0; i < $scope.events.length; i++) {
                    //if ($scope.events[i].description.includes(value.Id) && checkdelete == false) {
                    //    checkdelete = true;
                    //    var index = $scope.events[i].description.indexOf(value.BookingId);;
                    //    $scope.events.splice(index, 1);
                    //    //var event = $scope.events[i];
                    //    //uiCalendarConfig.calendars['myCalendar'].fullCalendar('removeEvents', event);
                    //    break;
                    //}
                    if (value.Id != Id) {
                        $scope.events.push({
                            title: value.Service.Name,
                            id: value.Id + "," + value.Service.Name + "," + value.Service.Cost + "," + value.Employee.FirstName + "," + value.Status + "," + value.Service.DurationInMinutes + "," + value.Service.Id + "," + value.Employee.Id,
                            description: value.Id,
                            resourceId: value.Employee.Id,
                            start: value.Start,
                            end: value.End,
                            allDay: value.IsFullDay,
                            color: value.Service.Colour,
                            textColor: "black"
                        });

                        //var index = $scope.events[i].description.indexOf(value.BookingId);
                        //var index = response.data.indexOf(Id);
                        //response.data.splice(index, 1);
                        //var event = $scope.events[i];
                        //uiCalendarConfig.calendars['myCalendar'].fullCalendar('removeEvents', event);
                        // break;
                    }
                    //}
                })

                //for (var i = 0; i < $scope.events.length; i++) {
                //    if ($scope.events[i].description == Id) {
                //        $scope.events.splice(i, 1);
                //        break;
                //    }
                //}
                uiCalendarConfig.calendars['myCalendar'].fullCalendar('removeEventSources');
                uiCalendarConfig.calendars['myCalendar'].fullCalendar('addEventSource', $scope.events);


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

                //})
            })
        }

        $scope.GetEventDetails = function (AppointmentId, Operation) {
            debugger;
            var apirequest = bookingService.GetBookingsForEmployeesByIdBetweenDates($routeParams.CompanyId, $scope.selectedprovider, firstDay, lastDay);
            apirequest.then(function (response) {
                //$scope.events = [];                                  
                angular.forEach(response.data, function (value, key) {
                    if (AppointmentId == value.Id) {
                        $scope.events.push({
                            title: value.Service.Name,
                            id: value.Id + "," + value.Service.Name + "," + value.Service.Cost + "," + value.Employee.FirstName + "," + value.Status + "," + value.Service.DurationInMinutes + "," + value.Service.Id + "," + value.Employee.Id + "," + value.Customers[0].FirstName + value.Customers[0].Id +"," + value.Customers[0].Email +","+ value.Customers[0].TelephoneNo,
                            description: value.Id,
                            start: value.Start,
                            resourceId: value.Employee.Id,
                            end: value.End,
                            allDay: value.IsFullDay,
                            color: value.Service.Colour,
                            textColor: "black"
                        });
                       
                        // $('#providers').val(value.Employee.FirstName);
                        $scope.selectedstaff = value.Employee.FirstName;
                    }
                })
               
                
                if ($scope.events.length > 0) {
                    uiCalendarConfig.calendars['myCalendar'].fullCalendar('removeEventSource', $scope.events);
                }
                uiCalendarConfig.calendars['myCalendar'].fullCalendar('addEventSource', $scope.events);
                $scope.getSelectedStaff($scope.selectedprovider);
                //$('#providers').val($scope.selectedprovider);

                //Empty the values//
                $scope.time = "";
                $scope.timeoption = "";
                $scope.timeInfoFrom = [];
                $scope.Status = "1";
                $scope.selectedprovider = "-- Select a Provider --";
                $scope.notes = "";
               // $scope.eventSources[0] = $scope.events;
            })
            
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
        };

        $scope.Closebtn = function () {
            angular.element(document.querySelector("#detailPopup")).css("display", "None");
        }
        $scope.CloseAppointmentModal = function () {
            // $scope.today();
            $scope.ShowSubmit = false;
            $scope.ContinueAppointment = true;
            $scope.DisabledAddCustomerTab = true;

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



        //----------------Date Picker Events---------------------//

        $scope.today = function () {
            debugger;
            $scope.dt = new Date();
        };

        //$scope.SetDatePicker = function () {
        //    debugger;
        //    $scope.today();
          
        //}

        $scope.EditDatePicker = function () {
            //if ($scope.editcount == 0) {
            //    $scope.editcount = $scope.editcount + 1;
            $scope.today();
            //}              
        };

        //$scope.disabled = function (date, mode) {
        //    return (mode == 'day' && (date.getDay() == $scope.AppointmentSchedule[0] || date.getDay() == $scope.AppointmentSchedule[1] || date.getDay() == $scope.AppointmentSchedule[2] || date.getDay() == $scope.AppointmentSchedule[3] || date.getDay() == $scope.AppointmentSchedule[4] || date.getDay() == $scope.AppointmentSchedule[5] || date.getDay() == $scope.AppointmentSchedule[6]));
        //};

      
        $scope.$watch("cdate", function (newValue, oldValue) {
            debugger;
            //$scope.timeInfoFrom = [];
            if (newValue != null && oldValue != null && newValue != oldValue) {

                uiCalendarConfig.calendars['myCalendar'].fullCalendar('gotoDate', newValue)
            //    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            //    RequestValues = {
            //        CompanyId: $routeParams.CompanyId,
            //        ServiceId: $scope.ServiceId,
            //        EmployeeId: $scope.EmployeeId,
            //        DateofBooking: $filter('date')(newValue, "dd-MM-yyyy"),
            //        Day: days[newValue.getDay()],
            //    }
            //    $scope.timeslotsloading = true;
            //    var result = bookingService.GetFreeBookingSlotsForEmployee(RequestValues);
            //    result.then(function (response) {
            //        if (newValue != oldValue) {
            //            if (response.data.Value != null) {
            //                for (var i = 0; i < response.data.Value.length; i++) {
            //                    if (i == 0) {
            //                        var startdate = response.data.Value[i].Start.split(":");
            //                        var startdatetime = new Date(1970, 0, 1, startdate[0], startdate[1], startdate[2]);
            //                        var starttime = $filter('date')(startdatetime, 'h:mm a');
            //                        $scope.timeInfoFrom.push(starttime);
            //                        var enddate = response.data.Value[i].End.split(":");
            //                        var enddatetime = new Date(1970, 0, 1, enddate[0], enddate[1], enddate[2]);
            //                        var endtime = $filter('date')(enddatetime, 'h:mm a');
            //                        $scope.timeInfoFrom.push(endtime);
            //                    }
            //                    else {
            //                        var date = response.data.Value[i].End.split(":");
            //                        var datetime = new Date(1970, 0, 1, date[0], date[1], date[2]);
            //                        var time = $filter('date')(datetime, 'h:mm a');
            //                        $scope.timeInfoFrom.push(time);
            //                    }
            //                }
            //            }
            //            $scope.timeoption = $scope.timeInfoFrom[0];
            //            $scope.timeslotsloading = false;
            //        }
                //    });
             //   alert("hello");
            }

            
        });
      
        $scope.open = function () {
            $timeout(function () {
                $scope.opened = true;
            });
        };

        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        };

      

        //---------------Update Event on Calendar--------------------//

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

        //------------Add event on Calendar-----------------//

        $scope.EditCustomer = function (item) {
            debugger;
            $scope.SearchCustomer = "";
            $scope.ShowSubmit = true;
            $scope.CustomerId = item.Id
            $scope.CustomerEmail = item.Email;
            $scope.customerPassword = item.Password;
            $scope.CustomerName = item.FirstName;
           // $scope.CustomerPreMobileNo = item.TelephoneNo;
            $scope.CustomerMobileNo = item.TelephoneNo;
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
            $scope.CustomerMobileNo = "";
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
            debugger;
            if ($scope.DisabledAddCustomerTab == false) {
                //$scope.FilterCustomerList = [];
                //$scope.SearchCustomer = "";
                //angular.element(document.querySelector("#searchCustomer")).css("display", "block");
                angular.element(document.querySelector("#Appointmenttab")).removeClass("active");
                angular.element(document.querySelector("#Calendarcustomer")).css("display", "block");
                angular.element(document.querySelector("#Calendartab")).addClass("active");
                angular.element(document.querySelector("#calendardetail")).css("display", "none");
                angular.element(document.querySelector("#modalfooter")).css("display", "block");
            }
        }

        $scope.Logout = function () {
            $rootScope.IsLoggedInUser = false;
            var apirequest = bookingService.SignOut();
            sessionStorage.removeItem('userInfo-token');
            $location.path("/signin");
        }

        //Buisness Working Hours Section in Calendar

        $scope.switchOnOff = function (item) {
            debugger;
            angular.forEach($scope.businessHourInfo, function (value, key) {
                //debugger; if (item.day != "Sunday" && item.day != "Saturday") {
                {
                    if (item.day == value.day) {
                        if (item['available'] == true) {
                            value.available = false;

                            var buisnesshour = {
                                Id: "",
                                CompanyId: $routeParams.CompanyId,
                                Start: item.timeFrom,
                                End: item.timeTo,
                                NameOfDay: item.day,
                                IsOffAllDay: true,
                                //CreationDate: "2017-06-05T05:20:32.2919738+00:00",
                                CreationDate: new Date(),
                            }                         
                        }
                        else {
                            value.available = true;

                            var buisnesshour = {
                                Id: "",
                                CompanyId: $routeParams.CompanyId,
                                Start: item.timeFrom,
                                End: item.timeTo,
                                NameOfDay: item.day,
                                IsOffAllDay: false,
                                //CreationDate: "2017-06-05T05:20:32.2919738+00:00",
                                CreationDate: new Date(),
                            }
                        }
                    }

                    

                }
                var apirequest = bookingService.SetCompanyWorkingHours(buisnesshour);
                apirequest.then(function (response) {
                    if (response.data.Success == true) {
                        $scope.MessageText = "Saving buisness Hours";
                        $scope.IsVisible = true;
                        $timeout(function () {
                            $scope.MessageText = "Buisness Hours Saved"
                            $timeout(function () {
                                $scope.IsVisible = false;
                            }, 1000)
                        }, 800)
                    }
                })
            });
        }

        $scope.SetWorkingHours = function (timedata) {
            debugger;
            var buisnesshour = {
                Id: "",
                CompanyId: $routeParams.CompanyId,
                Start: timedata.timeFrom,
                End: timedata.timeTo,
                NameOfDay: timedata.day,
                IsOffAllDay: timedata.available == true ? false : true,
                //CreationDate: "2017-06-05T05:20:32.2919738+00:00",
                CreationDate: new Date(),
            }

            var apirequest = bookingService.SetCompanyWorkingHours(buisnesshour);
            apirequest.then(function (response) {
                if (response.data.Success == true) {
                    $scope.MessageText = "Saving buisness Hours";
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "Buisness Hours Saved"
                        $timeout(function () {
                            $scope.IsVisible = false;
                        },1000)
                    },800)
                }
            })
        }



    }]);