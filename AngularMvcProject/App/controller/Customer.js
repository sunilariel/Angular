app.controller('customerController', ['$scope', '$location', '$filter', '$routeParams', '$http', '$timeout', 'bookingService', function ($scope, $location, $filter, $routeParams, $http, $timeout, bookingService) {
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

    //Redirection on a tag click by using route param passing parameter
    $scope.redirecttoCustomer = function () {
        $location.path("/customer/" + $routeParams.CompanyId);
    }

    $scope.redirecttodashboard = function () {
        debugger;
        $location.path("/dashboard/" + $routeParams.CompanyId);

    }
    $scope.RedirecttoStaff = function () {
        $location.path("/Setting/" + $routeParams.CompanyId);
    }

    //This function will run first on page load.
    $scope.init = function () {

        debugger;
        $scope.CompanyId = $routeParams.CompanyId;
        $scope.showcustomer = false;
        $scope.appointmentDetailisVisible = false;
        $scope.selecteddate = $filter('date')(new Date(), "EEE, MMM d");
        $scope.ServicePriceTimeDetailIsVisible = false;

        //Status List//
        $scope.StatusList = [{ Status: "No Label", "Value": 1 },
            { Status: "Pending", "Value": 2 },
            { Status: "Confirmed", "Value": 4 },
            { Status: "Done", "Value": 128 },
            { Status: "Paid", "Value": 512 },
            { Status: "NoShow ", "Value": 256 },
            { Status: "RunningLate", "Value": 1024 }
        ]

        $scope.AppointmentSchedule = [];

        $scope.customerArr = [];
        //On init Getting List of Customers.
        var GetCustomer = bookingService.GetAllCustomer($scope.CompanyId);
        GetCustomer.then(function (response) {
            $scope.CustomerCount = response.data.length;
            if ($scope.CustomerCount == 0) {
                $scope.showcustomer = true;
                $scope.setstaffdetails = true;
            }
            else {
                $scope.EditCustomer(response.data[0]);
            }

            $scope.customerArr = response.data;
        });

        //Getting all employees(provider) for appointment dropdown(Add Appointment)
        var GetStaffProvider = bookingService.GetStaffData($scope.CompanyId);
        GetStaffProvider.then(function (response) {
            debugger;
            $scope.Provider = [];
            for (var i = 0; i < response.data.length; i++) {
                $scope.Provider.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'UserName': response.data[i].UserName, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email });
            }
        });
        $scope.timeInfoFrom = [];
    }

    //$scope.disabled = function (calendarDate, mode) {
    //    return mode === 'day' && (calendarDate.getDay() === 0 || calendarDate.getDay() === 6);
    //};


    $scope.CreateCustomer = function (form) {
        debugger;

        if (form.$invalid == true) {
            if (form.customerName.$invalid == true) {
                form.customerName.$setTouched();
                form.customerName.$touched = true;
                return false;
            }

        }
        if (form.$invalid == true) {
            if (form.customerEmail.$invalid == true) {
                form.customerEmail.$setTouched();
                form.customerEmail.$touched = true;
                return false;
            }

        }

        $scope.MobileNo = $scope.customerExt + $scope.customerMobile;
        var obj = {
            Url: '/api/customer/Create',
            ReqStaffData: {
                "Id": 1,
                "CompanyId": $scope.CompanyId,
                "UserName": $scope.customerEmail,
                "Password": "*******",
                "FirstName": $scope.customerName,
                "LastName": "sample string 6",
                "Address": "sample string 7",
                "PostCode": "sample string 8",
                "Email": $scope.customerEmail,
                "TelephoneNo": $scope.MobileNo,
                "CreationDate": "2017-06-06T08:23:47.5497158+00:00"
            }
        }
        var createcustomer = bookingService.CreateCustomer(obj);

        createcustomer.then(function (response) {
            debugger;
            if (response.data.Success == true) {
                $scope.CustomerId = response.data.ReturnObject.CustomerId;
                $scope.MessageText = "Saving Data";
                $scope.msg = "Create Customer Successfully";

                var GetCustomer = bookingService.GetAllCustomer($scope.CompanyId);
                GetCustomer.then(function (response) {
                    debugger;
                    $scope.customerArr = [];
                    $scope.customerArr = response.data;
                    $scope.showcustomer = false;
                    $scope.CustomerCount = response.data.length;
                    if ($scope.CustomerCount != 0) {
                        $scope.EditCustomer(response.data[0]);
                    }
                    //$scope.showcustomer = false;
                });

                $timeout(function () {
                    $scope.MessageText = "Data Saved"; $timeout(function () {
                        $scope.IsVisible = false;
                    },
                         1000)
                }, 500);
            }

        }, function () {
            $scope.showcustomer = false;
            alert('Error in updating record');
        });
    };

    //Edit Customer getting details

    $scope.EditCustomer = function (item) {
        debugger;
        $scope.CustomerId = item.Id;
        $scope.updatedCustomerName = item.FirstName;
        $scope.updatedCustomerEmail = item.Email;
        $scope.updatedPreCustomerMobileNo = item.TelephoneNo.substring(0, 2);
        $scope.updatedMobileNo = item.TelephoneNo.substring(2, item.length);

        //Getting Appointment deail of Customer//
        //var result = bookingService.GetAppointmentDetails($scope.CustomerId);
        //result.then(function (response) {
        //    $scope.ListofAppointments = [];
        //    $scope.ListofAppointments = response.data;
        //    $scope.NumberofAppointmnets = response.data.length;
        //    var TotalCost = 0;
        //    angular.forEach(response.data, function (value, key) {
        //        TotalCost = TotalCost + value.Cost;
        //    });
        //    $scope.TotalCostofServices = TotalCost;
        //})
        $scope.GetAppointmentDetails($scope.CustomerId);
    }


    //Updating Customer on blur event of element
    $scope.updateCustomer = function () {
        debugger;
        var MobileNumber = $scope.updatedPreCustomerMobileNo + $scope.updatedMobileNo;
        var updateddate = new Date();
        var UpdateCustomer = {
            Url: "/api/customer/Update",
            ReqStaffData: {
                "Id": $scope.CustomerId,
                "CompanyId": $scope.CompanyId,
                "UserName": "sample string 3",
                "Password": "sample string 4",
                "FirstName": $scope.updatedCustomerName,
                "LastName": "sample string 6",
                "Address": "sample string 7",
                "PostCode": "sample string 8",
                "Email": $scope.updatedCustomerEmail,
                "TelephoneNo": MobileNumber,
                "CreationDate": updateddate
            }
        }

        var updatedCustomerData = bookingService.UpdateCustomer(UpdateCustomer);
        updatedCustomerData.then(function (response) {
            if (response.data.Success == true) {
                $scope.MessageText = "Updating Customer details";
                var GetCustomer = bookingService.GetAllCustomer($scope.CompanyId);
                GetCustomer.then(function (response) {
                    $scope.customerArr = [];
                    $scope.customerArr = response.data;
                })
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.MessageText = "Customer details updated";
                    $timeout(function () {
                        $scope.IsVisible = false;
                    }, 1000)
                }, 500)

            }
        }, function () {
            alert("Error in updating record");
        });
    }

    //Delete Customer//
    $scope.DeleteCustomerData = function (CustomerId) {
        debugger;
        var deletecustomer = bookingService.DeleteCustomer($scope.CompanyId, CustomerId);
        deletecustomer.then(function (response) {
            $scope.MessageText = "Deleting Data"
            $scope.IsVisible = true;

            $scope.updatedCustomerName = "";
            $scope.updatedCustomerEmail = "";
            $scope.updatedPreCustomerMobileNo = "";
            $scope.updatedMobileNo = "";

            var GetCustomer = bookingService.GetAllCustomer($scope.CompanyId);
            GetCustomer.then(function (response) {
                debugger;
                $scope.customerArr = [];
                $scope.customerArr = response.data;
                $scope.CustomerCount = response.data.length
            });
            $timeout(function () { $scope.MessageText = "Data deleted."; $timeout(function () { $scope.IsVisible = false; }, 1000) }, 500);

        }), function () {
            alert('Error in updating record');
        }

    };

    $scope.MessageText = "";
    $scope.IsVisible = false;
    $scope.choices = [];
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

    ////////////////////Add Appointment Module ///////////////////////
    $scope.AddAppointmentPopup = function () {
        debugger;
        var result = bookingService.GetAppointmentDetails($scope.CustomerId);
        // $scope.selectedprovider = "-- Select a Provider --";
        $scope.selectedservice = " ";
        $scope.price = "";
        $scope.time = "";
        $scope.timeoption = "";
        $scope.timeInfoFrom = [];
        $scope.Status = "No Label";

        $scope.ServicePriceTimeDetailIsVisible = false;
        $scope.ShowAddAppointmentPopup != $scope.ShowAddAppointmentPopup;
    };

    $scope.showModal = false;
    $scope.open = function () {
        debugger;
        $scope.showModal = !$scope.showModal;
    };


    //Get Service allocated to employee
    $scope.GetAllocateServiceToEmployee = function (EmployeeId) {
        debugger;
       
        $scope.EmployeeId = EmployeeId;
        $scope.EmployeeServices = [];
        var EmployeeServices = bookingService.GetAllocatedServicetoEmployee($scope.CompanyId, EmployeeId);

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
            $scope.today();
        });
    }

    $scope.SaveAppointment = function (form) {
        debugger;


        var data = $scope.Status;

        if (data == "No Label") {
            $scope.Status = 1;
        }
        else if (data == "Pending") {
            $scope.Status = 2;
        }
        else if (data == "Confirmed") {
            $scope.Status = 4;
        }
        else if (data == "No-Show") {
            $scope.Status = 256;
        }
        else if (data == "Done") {
            $scope.Status = 128;
        }
        else if (data == "RunningLate") {
            $scope.Status = 1024;
        }
        else if (data == "Paid") {
            $scope.Status = 512;
        }
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
            "CustomerIdsCommaSeperated": $scope.CustomerId,
            "StartHour": $scope.timeoption,
            "StartMinute": "",
            "EndHour": 0,
            "EndMinute": $scope.time,
            "IsAdded": true,
            "Message": "sample string 11",
            "CustomerIds": [$scope.CustomerId],
            "Start": $scope.dt,
            "End": $scope.dt,
        }

        var addappointment = bookingService.AddAppointment(appointment);


        addappointment.then(function (response) {
            if (response.data.Success == true) {
                $scope.MessageText = "Creating Appointment";
                $scope.IsVisible = true;
                $scope.AppointmentId = response.data.ReturnObject;
                $timeout(function () {
                    $scope.MessageText = "Created Appointment";
                    $timeout(function () {


                        var SetStatus = bookingService.SetStatusofAppointment($scope.Status, $scope.AppointmentId);

                        SetStatus.then(function (response) {

                            $scope.GetAppointmentDetails($scope.CustomerId);

                           
                        })
                    }, 1000);
                }, 500)
            }

        });
    }


    $scope.ShowAppointmentDetail = function (item) {
        debugger;
        $scope.AppointmentStartDate = item.StartTime;
        $scope.AppointmentEndDate = item.EndTime;
        $scope.AppointmentProvider = item.EmployeeName;
        $scope.AppointmentService = item.ServiceName;
        $scope.AppointmentServiceCost = item.Cost;
        $scope.AppointmentEmployeeId = item.EmployeeId;
        $scope.AppointmentServiceId = item.ServiceId;
        $scope.ServiceTime = item.DurationInMinutes;
        if (item.status == 1) {
            $scope.UpdatedStatus = "No Label";
        }
        else if (item.status == 2) {
            $scope.UpdatedStatus = "Pending";
        }
        else if (item.status == 4) {
            $scope.UpdatedStatus = "Confirmed";
        }
        else if (item.status == 256) {
            $scope.UpdatedStatus = "No-Show";
        }
        else if (item.status == 128) {
            $scope.UpdatedStatus = "Done";
        }
        else if (item.status == 1024) {
            $scope.UpdatedStatus = "RunningLate";
        }
        else if (item.status == 512) {
            $scope.UpdatedStatus = "Paid";
        }
        $scope.AppointmentBookingId = item.BookingId;
        $scope.appointmentDetailisVisible = !$scope.appointmentDetailisVisible;
    }

    $scope.UpdateStatus = function (item) {
        debugger;
        var status = $scope.StatusValue;
        $scope.UpdatedStatus = item.Status;
        var SetStatus = bookingService.SetStatusofAppointment(item.Status, $scope.AppointmentBookingId);
        SetStatus.then(function (response) {
            if(response.data.Success==true)
            {
              
                $scope.MessageText = "Updating Appointment Label";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.MessageText = "Appointment Label Saved";
                    $timeout(function () {
                        $scope.IsVisible = false;
                        $scope.GetAppointmentDetails($scope.CustomerId);
                    },800)
                },1000)
            }
        })
       
        
    }




    $scope.EditAppointment = function () {
        debugger;
        $scope.appointmentDetailisVisible = false;
        $scope.Status = $scope.UpdatedStatus;
        $scope.selectedprovider = $scope.AppointmentEmployeeId;
        $scope.selectedservice = $scope.AppointmentServiceId;
        $scope.price = $scope.AppointmentServiceCost;
        $scope.time = $scope.ServiceTime;
        var date = $scope.AppointmentStartDate.split("T");
        var appointmentdate = new Date(date[0]);
        var time = date[1].split(":");
        var appointmenttime = new Date(1997, 4, 5, time[0], time[1], time[2]);
        $scope.timeoption = $filter('date')(appointmenttime, 'h:mm a');
        $scope.dt = appointmentdate;
       // $scope.ServiceDetail($scope.AppointmentServiceId);
        $scope.GetAllocateServiceToEmployee($scope.AppointmentEmployeeId);
       
        //$scope.ServiceId = $scope.AppointmentServiceId;
        //$scope.EmployeeId = $scope.AppointmentEmployeeId;
        }

    $scope.UpdateAppointment = function () {
        debugger;
   var appointment=
        {
            "Id": $scope.AppointmentBookingId,
            "CompanyId": $routeParams.CompanyId,
            "ServiceId": $scope.selectedprovider,
            "EmployeeId": $scope.selectedservice,
            "CustomerIdsCommaSeperated": $scope.CustomerId,
            "StartHour": $scope.timeoption,
            "StartMinute": "",
            "EndHour": 0,
            "EndMinute": $scope.time,
            "IsAdded": true,
            "Message": "sample string 11",
            "CustomerIds": [$scope.CustomerId],
            "Start": $scope.dt,
            "End": $scope.dt,
        }

   var apirequest=bookingService.UpdateAppointment(appointment);
   apirequest.then(function (response) {

   })

    }


  

    $scope.DeleteAppointment = function () {
        var apirequest = bookingService.DeleteAppointment($scope.AppointmentBookingId);
        apirequest.then(function (response) {
            if(response.data.Success==true)
            {
                
                    $scope.MessageText = "Deleting Appointment";
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "Appointment Deleted";
                        $timeout(function () {
                            $scope.GetAppointmentDetails($scope.CustomerId);
                            $scope.appointmentDetailisVisible = false;
                            $scope.IsVisible = false;

                        }, 800)
                    }, 1000)
               
               
            }
        })
    }

    $scope.GetAppointmentDetails = function (Id) {
        debugger;
        var result = bookingService.GetAppointmentDetails(Id);
        result.then(function (response) {
            $scope.ListofAppointments = [];
            $scope.ListofAppointments = response.data;
            $scope.NumberofAppointmnets = response.data.length;
            var TotalCost = 0;
            angular.forEach(response.data, function (value, key) {
                TotalCost = TotalCost + value.Cost;
            });
            $scope.TotalCostofServices = TotalCost;
            $scope.IsVisible = false;
            angular.element(document.querySelector("#squarespaceModal")).css("display", "none");
        })
    }



    //DateTime Picker
    $scope.today = function () {
        $scope.dt = new Date();

    };
    $scope.today();

    $scope.showWeeks = true;
    $scope.toggleWeeks = function () {
        $scope.showWeeks = !$scope.showWeeks;
    };

    //Disable weekend selection
    $scope.disabled = function (date, mode) {

        //return (mode == 'day' && (date.getDay() == 0 || date.getDay() == 5));
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

    $scope.ChangeDate = function () {
        debugger;
        var day = $scope.dt;
    }


    $scope.$watch("dt", function (newValue, oldValue) {
        debugger;
        $scope.timeInfoFrom = [];

        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        RequestValues = {
            CompanyId: $routeParams.CompanyId,
            ServiceId: $scope.ServiceId,
            EmployeeId: $scope.EmployeeId,
            DateofBooking: $filter('date')(newValue, "MM-dd-yyyy"),
            Day: days[newValue.getDay()],
        }
        var result = bookingService.GetFreeBookingSlotsForEmployee(RequestValues);
        result.then(function (response) {
            if (newValue != oldValue) {
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
        });
    });

}]);




