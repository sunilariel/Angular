app.controller('customerController', ['$scope', '$location', '$filter', '$window', '$routeParams', '$q', '$http', '$timeout', 'bookingService', function ($scope, $location, $filter, $window, $routeParams, $q, $http, $timeout, bookingService) {
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
        
        $location.path("/dashboard/" + $routeParams.CompanyId);

    }
    $scope.RedirecttoStaff = function () {
        $location.path("/Setting/" + $routeParams.CompanyId);
    }
    $scope.Logout = function () {
        
        var apirequest = bookingService.SignOut();
        sessionStorage.removeItem('userInfo-token');
        $location.path("/signin");
    }
    //This function will run first on page load.
    $scope.init = function () {        
        var count = 0;
       // $scope.LineChartDataSource();
      //  $scope.PieChartDataSource();
       
        $scope.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        //$scope.AllAppointmentYears = [];
        //$scope.AllAppointmentMonths = [];
      //  $scope.SelectedYear = (new Date().getFullYear()).toString();
        $scope.CompanyId = $routeParams.CompanyId;
        $scope.showcustomer = false;
        $scope.appointmentDetailisVisible = false;
        $scope.selecteddate = $filter('date')(new Date(), "EEE, MMM d");
        $scope.ServicePriceTimeDetailIsVisible = false;

        var CompanyDetails = bookingService.GetCompanyDetails($scope.CompanyId);
        CompanyDetails.then(function (response) {            
            $scope.companyEmail = response.data.Email;
        });

        //Status List//
        $scope.StatusList = [{ Status: "No Label", "Value": 1 },
            { Status: "Pending", "Value": 2 },
            { Status: "Confirmed", "Value": 3 },
            { Status: "Done", "Value": 4 },
            { Status: "Paid", "Value": 6 },
            { Status: "NoShow ", "Value": 5 },
            { Status: "RunningLate", "Value": 7 }
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
                $scope.SelectedCustomerId = response.data[0].Id;
            }

            $scope.customerArr = response.data;
        });

        //Getting all employees(provider) for appointment dropdown(Add Appointment)
        var GetStaffProvider = bookingService.GetStaffData($scope.CompanyId);
        GetStaffProvider.then(function (response) {            
            $scope.Provider = [];
            for (var i = 0; i < response.data.length; i++) {
                $scope.Provider.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'UserName': response.data[i].UserName, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email });
            }
        });
        $scope.timeInfoFrom = [];      
    }
 
    $scope.CreateCustomer = function (form) {        
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
                "Password": $scope.customerPassword,
                "FirstName": $scope.customerName,
                "LastName": "",
                "Address": "",
                "PostCode": "",
                "Email": $scope.customerEmail,
                "TelephoneNo": $scope.MobileNo,
                "CreationDate": "2017-06-06T08:23:47.5497158+00:00"
            }
        }
        var createcustomer = bookingService.CreateCustomer(obj);
        createcustomer.then(function (response) {            
            if (response.data.Success == true) {
                $scope.CustomerId = response.data.ReturnObject.CustomerId;
                $scope.MessageText = "Saving Data";
                $scope.msg = "Create Customer Successfully";

                var GetCustomer = bookingService.GetAllCustomer($scope.CompanyId);
                GetCustomer.then(function (response) {
                    
                    $scope.customerArr = [];
                    $scope.customerArr = response.data;
                    $scope.showcustomer = false;
                    $scope.CustomerCount = response.data.length;
                    if ($scope.CustomerCount != 0) {
                        $scope.EditCustomer(response.data[0]);
                    }
                    //Empty the Customer Fields in Popup
                    $scope.customerName = null;
                    $scope.customerEmail = null;
                    $scope.customerExt = null;
                    $scope.customerPassword = null;
                    $scope.customerMobile = null;
                    form.customerName.$setUntouched();
                    form.customerName.$untouched = true;
                    form.customerEmail.$setUntouched();
                    form.customerEmail.$untouched = true;

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

    //On Cancel btn click hide the popup and clear the form elements values//
    $scope.CustomerCancel = function (form) {
        
        $scope.showcustomer = false;
        $scope.customerName = null;
        $scope.customerEmail = null;
        $scope.customerPassword = null;
        $scope.customerExt = null;
        $scope.customerMobile = null;
        form.customerName.$setUntouched();
        form.customerName.$untouched = true;
        form.customerEmail.$setUntouched();
        form.customerEmail.$untouched = true;
    }

    //Edit Customer getting details  
    $scope.EditCustomer = function (item) {        
        $scope.CustomerId = item.Id;
        $scope.SelectedCustomerId = item.Id;
        $scope.updatedCustomerName = item.FirstName;
        $scope.updatedCustomerEmail = item.Email;
        $scope.updatedPreCustomerMobileNo = item.TelephoneNo.substring(0, 2);
        $scope.updatedMobileNo = item.TelephoneNo.substring(2, item.length);
        $scope.customerAddress = item.Address;
        $scope.Zip = item.PostCode;       
        $scope.GetAppointmentDetails($scope.CustomerId);      
        var count = 0;
        //Get Customer Notes Details of Customer//
        var apigetrequest = bookingService.GetCustomerNotes($routeParams.CompanyId, $scope.CustomerId);
        apigetrequest.then(function (response) {
            $scope.CustomerNotesDetail = [];
            $scope.CustomerNotesDetail = response.data;
        })
        angular.element(document.querySelector("#staff_details")).addClass("active");
        angular.element(document.querySelector("#notes_details")).removeClass("active");
        angular.element(document.querySelector("#appointment_details")).removeClass("active");
        angular.element(document.querySelector("#staff-services")).removeClass("active");
        angular.element(document.querySelector("#staff-hours")).removeClass("active");
        angular.element(document.querySelector("#staff-details")).addClass("active");
    }


    //Updating Customer on blur event of element
    $scope.updateCustomer = function () {        
        var MobileNumber = $scope.updatedPreCustomerMobileNo + $scope.updatedMobileNo;
        var updateddate = new Date();
        var UpdateCustomer = {
            Url: "/api/customer/Update",
            ReqStaffData: {
                "Id": $scope.CustomerId,
                "CompanyId": $scope.CompanyId,
                "UserName": "",
                "Password": "",
                "FirstName": $scope.updatedCustomerName,
                "LastName": "",
                "Address": $scope.customerAddress,
                "PostCode": $scope.Zip,
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
        
        procedure.show = false;
    };
    $scope.removeChoice = function (procedure) {
        
        $scope.IsVisible = true;
        var lastItem = procedure.choice.length - 1;
        procedure.choice.splice(lastItem);
        $scope.MessageText = "Saving Staff breaks..";
        $timeout(function () { $scope.MessageText = "Staff breaks saved."; $timeout(function () { $scope.IsVisible = false; }, 1000) }, 500);
    };

    ////////////////////Add Appointment Module ///////////////////////
    $scope.AddAppointmentPopup = function () {
        $scope.today();
        $scope.timeslotsloading = false;
        var result = bookingService.GetAppointmentDetails($scope.CustomerId);
        // $scope.selectedprovider = "-- Select a Provider --";
        $scope.selectedservice = " ";
        $scope.price = "";
        $scope.time = "";
        $scope.timeoption = "";
        $scope.timeInfoFrom = [];
        $scope.Status = "1";
        $scope.selectedprovider = "-- Select a Provider --";
        $scope.timeoption = "8:00 AM";
        $scope.notes = "";
        $scope.ServicePriceTimeDetailIsVisible = false;
        $scope.count = 0;     
        $scope.ShowAddAppointmentPopup != $scope.ShowAddAppointmentPopup;
    };

    $scope.showModal = false;
    $scope.open = function () {
        
        $scope.showModal = !$scope.showModal;
    };

    //Close Appointment Modal//
    $scope.CloseAppointmentModal = function () {
        $scope.today();
    }

    //Get Service allocated to employee
    $scope.GetAllocateServiceToEmployee = function (EmployeeId) {
        
        $scope.EmployeeId = EmployeeId;
        $scope.EmployeeServices = [];
        var EmployeeServices = bookingService.GetAllocatedServicetoEmployee($scope.CompanyId, EmployeeId);
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
                if (response.data.Value != null)
                {
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
            });

        });
    }

    $scope.SaveAppointment = function (form) {
        
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
            "Message": $scope.notes,
            "CustomerIds": [$scope.CustomerId],
            "Start": $scope.dt,
            "End": $scope.dt,
        }

        var addappointment = bookingService.AddAppointment(appointment);


        addappointment.then(function (response) {
            if (response.data.Success == false)
            {
                if(response.data.Message=="Booking Cannot Be Added , Not Free Slot Available.")
                {
                    $scope.MessageText = "Not Free Slot Available";
                    $scope.IsVisible = true;
                    $timeout(function () {
                        
                        $scope.IsVisible = false;
                    },1000)
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
                            $scope.GetAppointmentDetails($scope.CustomerId);                                                      
                        })
                    }, 1000);
                }, 500)
            }
        });
    }

    $scope.ShowAppointmentDetail = function (item) {
        
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
        else if (item.status == 3) {
            $scope.UpdatedStatus = "Confirmed";
        }
        else if (item.status == 5) {
            $scope.UpdatedStatus = "No-Show";
        }
        else if (item.status == 4) {
            $scope.UpdatedStatus = "Done";
        }
        else if (item.status == 7) {
            $scope.UpdatedStatus = "RunningLate";
        }
        else if (item.status == 6) {
            $scope.UpdatedStatus = "Paid";
        }
        $scope.AppointmentBookingId = item.BookingId;
        $scope.appointmentDetailisVisible = !$scope.appointmentDetailisVisible;
    }

    $scope.UpdateStatus = function (item) {
        
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
        $scope.ServiceId = $scope.AppointmentServiceId;
        //$scope.EmployeeId = $scope.AppointmentEmployeeId;
        $scope.editcount = 0;
    }

    $scope.UpdateAppointment = function () {
        
        var appointment=
             {
                 "Id": $scope.AppointmentBookingId,
                 "CompanyId": $routeParams.CompanyId,
                 "ServiceId": $scope.selectedservice,
                 "EmployeeId": $scope.selectedprovider,
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

        var apirequest=bookingService.UpdateAppointment(appointment);
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
                        $scope.GetAppointmentDetails($scope.CustomerId);
                        angular.element(document.querySelector("#UpdateAppointmentPopup")).css("display", "none");
                    }, 1000);
                }, 500)
            }
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

    $scope.trixBlur = function (e, editor)
    {
        if ($scope.trix != undefined && $scope.trix!="") {
        var CustomerNoteDetail = {
            "CustomerId": $scope.CustomerId,
            "CompanyId": $scope.CompanyId,
            "Description": $scope.trix,
            "WhoAddedThis": $scope.updatedCustomerName,
            "CreationDate":new Date(),
        }
        var apirequest = bookingService.AddCustomerNote(CustomerNoteDetail);
        apirequest.then(function (response) {
            
            if (response.data.Success == true) {               
                $scope.MessageText = "Add Customer Notes";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.MessageText = "Customer Notes Added";
                    $timeout(function () {
                        $scope.IsVisible = false;
                        var apigetrequest = bookingService.GetCustomerNotes($routeParams.CompanyId, $scope.CustomerId);
                        apigetrequest.then(function (response) {
                            $scope.CustomerNotesDetail = [];
                            $scope.CustomerNotesDetail = response.data;
                        })
                    }, 1000)
                }, 800)
            }
        })
    }
    }

    $scope.DeleteCustomerNote = function (Id) {
        var apideleterequest = bookingService.DeleteCustomerNote($routeParams.CompanyId, Id);
        apideleterequest.then(function (response) {
            if(response.data.Success==true)
            {
                $scope.MessageText = "Delete Customer Notes";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.MessageText = "Customer Notes Deleted";
                    $timeout(function () {
                        $scope.IsVisible = false;
                        var apigetrequest = bookingService.GetCustomerNotes($routeParams.CompanyId, $scope.CustomerId);
                        apigetrequest.then(function (response) {
                            $scope.CustomerNotesDetail = [];
                            $scope.CustomerNotesDetail = response.data;
                        })
                    },1000)
                    },800)
               
            }
        })
    }

    $scope.GetAppointmentDetails = function (Id) {
        debugger;
         $scope.SelectedMonth = "All";
        var result = bookingService.GetAppointmentDetails(Id);
        result.then(function (response) {
            $scope.ListofAppointments = [];
            $scope.ListofAppointments = response.data;
           // $scope.AllAppointmentYears = [];
            // $scope.AllAppointmentMonths = [];
            $scope.TotalCost = 0;
            angular.forEach($scope.ListofAppointments, function (value, key) {
                $scope.TotalCost = $scope.TotalCost + value.Cost;
                })
           
            $scope.NumberofAppointmnets = response.data.length;
            if (response.data.length == 0) {
                $scope.NoRecords = false;
               
            }
            else {
                var date = new Date($scope.ListofAppointments[0].StartTime);
                $scope.Year = date.getFullYear().toString();
                $scope.SelectedYear = $scope.Year;
                $scope.NoRecords = true;
            }
            var TotalCost = 0;
           
                     
            $scope.LineChartDataSource();           
            $scope.SelectBoxYearDataSource.load();
            $scope.SelectBoxMonthDataSource.load();

            $timeout(function () {
                
                $("#selectyearbox").dxSelectBox({
                    width: 120,
                    value: $scope.Year,
                });
            }, 1000);
           
          
            //$("#selectbox").dxSelectBox({
            //    width: 120,
            //    value: "All",               
            //});
            chartDataSource.load();
            $scope.PieChartDataSource();
            PieChartSource.load();
            $scope.TotalCostofServices = TotalCost;
            $scope.IsVisible = false;
            angular.element(document.querySelector("#squarespaceModal")).css("display", "none");
            //$scope.today();
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
        $scope.timeInfoFrom = [];
        if (newValue != null && oldValue != null)
        {
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            RequestValues = {
                CompanyId: $routeParams.CompanyId,
                ServiceId: $scope.ServiceId,
                EmployeeId: $scope.EmployeeId,
                DateofBooking: $filter('date')(newValue,"dd-MM-yyyy"),
                Day: days[newValue.getDay()],
            }
            $scope.timeslotsloading = true;
            var result = bookingService.GetFreeBookingSlotsForEmployee(RequestValues);
            result.then(function (response) {
                if (newValue != oldValue) {
                    if (response.data.Value != null)
                    {
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

            var chartDataSource = new DevExpress.data.DataSource({
                load: function () {
                    
                    var df = $.Deferred();
                    $scope.AllAppointments = [];
                    var JanuaryApp = 0;
                    var FebuaryApp = 0;
                    var MarchApp = 0;
                    var AprilApp = 0;
                    var MayApp = 0;
                    var JuneApp = 0;
                    var JulyApp = 0;
                    var AugustApp = 0;
                    var SeptemberApp = 0;
                    var OctoberApp = 0;
                    var NovemberApp = 0;
                    var DecemberApp = 0;


                    if ($scope.SelectedMonth == "All") {
                        $scope.DateIn = "Month";
                        $scope.Month = "";
                      //  $scope.Year = $scope.SelectedYear;
                        var apirequest = bookingService.GetCustomerStats($routeParams.CompanyId, $scope.CustomerId, $scope.SelectedYear, $scope.SelectedMonth);                      

                        $scope.CombineResult = $q.all([
                            apirequest                         
                        ]).then(function (resp) {
                            
                            angular.forEach(resp[0].data.Bookings,function(value,key)
                            {
                                var date=new Date(value.Start);
                                var month=$scope.months[date.getMonth()];
                                if(month=="January")
                                {                                    
                                    JanuaryApp=JanuaryApp+1;                               
                                }
                                else if(month=="February")
                                {                               
                                    FebuaryApp=FebuaryApp+1;                                 
                                }
                                else if(month=="March")
                                {                                  
                                    MarchApp=MarchApp+1;                                  
                                }else if(month=="April")
                                {                                   
                                    AprilApp=AprilApp+1;                                  
                                }
                                else if(month=="May")
                                {                                   
                                     MayApp=MayApp+1;                                  
                                }else if(month=="June")
                                {                                   
                                     JuneApp=JuneApp+1;                                
                                }else if(month=="July")
                                {                                   
                                     JulyApp=JulyApp+1;                               
                                }else if(month=="August")
                                {                                   
                                     AugustApp=AugustApp+1;                               
                                }else if(month=="September")
                                {                                  
                                    SeptemberApp = SeptemberApp + 1;                               
                                }else if(month=="October")
                                {                                   
                                    OctoberApp=OctoberApp+1;                                 
                                }else if(month=="November")
                                {                                   
                                     NovemberApp=NovemberApp+1;                                
                                }
                                else if(month=="December")
                                {                                    
                                     DecemberApp=DecemberApp+1;                                
                                }
                            })

                            if (JanuaryApp != 0) {
                                $scope.AllAppointments.push({ "arg": (("JanuaryApp").substring(0, 3)).toUpperCase(), "val": JanuaryApp });
                            }
                            if (FebuaryApp != 0)
                            {
                                $scope.AllAppointments.push({ "arg": (("FebuaryApp").substring(0, 3)).toUpperCase(), "val": FebuaryApp });
                            }
                            if (MarchApp != 0) {
                                $scope.AllAppointments.push({ "arg": (("MarchApp").substring(0, 3)).toUpperCase(), "val": MarchApp });
                            }
                            if (AprilApp != 0) {
                                $scope.AllAppointments.push({ "arg": (("AprilApp").substring(0, 3)).toUpperCase(), "val": AprilApp });
                            }
                            if (MayApp != 0) {
                                $scope.AllAppointments.push({ "arg": (("MayApp").substring(0, 3)).toUpperCase(), "val": MayApp });
                            }
                            if (JuneApp != 0) {
                                $scope.AllAppointments.push({ "arg": (("JuneApp").substring(0, 3)).toUpperCase(), "val": JuneApp });
                            }
                            if (JulyApp != 0) {
                                $scope.AllAppointments.push({ "arg": (("JulyApp").substring(0, 3)).toUpperCase(), "val": JulyApp });
                            }
                            if (AugustApp != 0) {
                                $scope.AllAppointments.push({ "arg": (("AugustApp").substring(0, 3)).toUpperCase(), "val": AugustApp });
                            }
                            if (SeptemberApp != 0) {
                                $scope.AllAppointments.push({ "arg": (("SeptemberApp").substring(0, 3)).toUpperCase(), "val": SeptemberApp });
                            }
                            if (OctoberApp != 0) {
                                $scope.AllAppointments.push({ "arg": (("OctoberApp").substring(0, 3)).toUpperCase(), "val": OctoberApp });
                            }
                            if (NovemberApp != 0) {
                                $scope.AllAppointments.push({ "arg": (("NovemberApp").substring(0, 3)).toUpperCase(), "val": NovemberApp });
                            }
                            if (DecemberApp != 0) {
                                $scope.AllAppointments.push({ "arg": (("DecemberApp").substring(0, 3)).toUpperCase(), "val": DecemberApp });
                            }
                           
                            df.resolve($scope.AllAppointments);
                        })
                        return df.promise();

                    }
                    else {
                        $scope.DateIn = "Day(s)";
                        $scope.Month = (($scope.SelectedMonth).substring(0, 3)).toUpperCase();
                      //  $scope.Year = $scope.SelectedYear;
                        var apirequest = bookingService.GetCustomerStats($routeParams.CompanyId, $scope.CustomerId, $scope.SelectedYear, $scope.SelectedMonth);
                        $scope.AppointmentsDetail = [];
                        var count0 = 0;
                        var count1 = 0;
                        var count2 = 0;
                        var count3 = 0;
                        var count4 = 0;
                        var count5 = 0;
                        apirequest.then(function (response) {
                            angular.forEach(response.data.Bookings, function (value, key) {
                                if (response.data.Bookings.length > 0) {
                                    var AppointmentDate = new Date(value.Start).getDate();
                                    if (AppointmentDate >= 1 && AppointmentDate <= 5) {
                                        count0 = count0 + 1;
                                    }
                                    else if (AppointmentDate >= 6 && AppointmentDate <= 10) {
                                        count1 = count1 + 1;
                                    }
                                    else if (AppointmentDate >= 11 && AppointmentDate <= 15) {
                                        count2 = count2 + 1;
                                    }
                                    else if (AppointmentDate >= 16 && AppointmentDate <= 20) {
                                        count3 = count3 + 1;
                                    }
                                    else if (AppointmentDate >= 21 && AppointmentDate <= 25) {
                                        count4 = count4 + 1;
                                    }
                                    else if (AppointmentDate >= 26 && AppointmentDate <= 31) {
                                        count5 = count5 + 1;
                                    }
                                }
                            });
                            $scope.AppointmentsDetail.push({ "arg": "1-5", "val": count0 });
                            $scope.AppointmentsDetail.push({ "arg": "6-10", "val": count1 });
                            $scope.AppointmentsDetail.push({ "arg": "11-15", "val": count2 });
                            $scope.AppointmentsDetail.push({ "arg": "16-20", "val": count3 });
                            $scope.AppointmentsDetail.push({ "arg": "21-25", "val": count4 });
                            $scope.AppointmentsDetail.push({ "arg": "26-31", "val": count5 });
                            df.resolve($scope.AppointmentsDetail);
                        })
                        return df.promise();
                    }
                }
            });
         
            $scope.selectYearBoxOptions = new DevExpress.data.CustomStore({
                loadMode: "raw",
                cacheRawData: false,
                load: function () {                    
                    
                    var df = $.Deferred();                    
                     $scope.AllAppointmentYears = [];
                    // $scope.AllAppointmentMonths = [];
                    // var TotalCost = 0;           
                       // $scope.AllAppointmentMonths.push("All");
                        angular.forEach($scope.ListofAppointments, function (value, key) {
                         //   TotalCost = TotalCost + value.Cost;
                            var date = new Date(value.StartTime);
                            if($scope.AllAppointmentYears.includes((date.getFullYear()).toString())==false)
                            {                                
                                $scope.AllAppointmentYears.push((date.getFullYear()).toString());
                            }                                       
                        });                   
                        df.resolve($scope.AllAppointmentYears);
                        return df.promise();
                },                            
            })

            $scope.SelectBoxYearDataSource = new DevExpress.data.DataSource({
                store: $scope.selectYearBoxOptions,
            })
               
            $scope.SelectMonthBoxOptions = new DevExpress.data.CustomStore({
                loadMode: "raw",
                cacheRawData: false,               
                load: function () {
                    
                    var df = $.Deferred();                   
                    $scope.AllAppointmentMonths = [];
                   // var TotalCost = 0;
                    $scope.AllAppointmentMonths.push("All");
                    angular.forEach($scope.ListofAppointments, function (value, key) {
                       // TotalCost = TotalCost + value.Cost;
                        var date = new Date(value.StartTime);
                        if ((date.getFullYear()).toString() == $scope.SelectedYear) {
                            // $scope.AllAppointmentYears.push({ "Id": (date.getFullYear()).toString(), "Year": (date.getFullYear()).toString() });
                            if ($scope.AllAppointmentMonths.includes(($scope.months[date.getMonth()]).toString()) == false) {
                                $scope.AllAppointmentMonths.push(($scope.months[date.getMonth()]).toString());
                            }
                        }
                    });
                    df.resolve($scope.AllAppointmentMonths);
                    return df.promise();
                },                
            })

            $scope.SelectBoxMonthDataSource = new DevExpress.data.DataSource({
                store: $scope.SelectMonthBoxOptions,
            })

          $scope.filterMonthsbyYears=function(e)
          {
              
              $scope.SelectedYear = e.value;
              $("#selectbox").dxSelectBox({
                  width: 120,
                  value: "All",                 
              });             
              $scope.SelectBoxMonthDataSource.load();
              chartDataSource.load();
              PieChartSource.load();
          }

          $scope.ReloadChart = function (e) {
              
              $scope.SelectedMonth = e.value;
              chartDataSource.load();
              PieChartSource.load();
          }


            $scope.LineChartDataSource = function () {               
                $scope.chartOptions = {
                    dataSource: chartDataSource,
                    legend: {
                        visible: false
                    },
                    size: {
                        width: 300,
                        height: 180
                    },
                    series: {
                        type: "line",
                        color: "#27c3bb"
                    },
                    valueField: 'val',                   
                    valueAxis: {
                        label: {
                            visible: false
                        },
                        grid: {
                            visible: false
                        }
                    },
                    tooltip: {
                        enabled: true,
                        customizeTooltip: function (arg) {

                            return {
                                html: "<h6>" + arg.argument + "</h6>" + "<div>" + "Appointment(s):" + "<b>" + arg.value + "</b></div>",                                                              
                            };
                        }
                    },
                    //title: {
                    //    text: "Appointments 2017",
                    //    horizontalAlignment: "left",
                    //    font: {
                    //        color: "#232323",
                    //        size: 18,
                    //        weight: 500,
                    //        family:"'Segoe UI Light', 'Helvetica Neue Light', 'Segoe UI', 'Helvetica Neue', 'Trebuchet MS', Verdana"
                    //    }
                    //}
                };                                                         
            }
            var PieChartSource = new DevExpress.data.DataSource({
                load: function () { 
                    
                    $scope.PieChartData = [];
                    $scope.TotalCostofServices = 0;
                    var TotalAppointment = 0;
                    var def = $.Deferred();
                    $http({
                        method: 'POST',
                        data: { CompanyId: $routeParams.CompanyId, CustomerId: $scope.CustomerId, Year: $scope.SelectedYear, Month: $scope.SelectedMonth },
                        url: "/Customer/GetCustomerStats",
                        headers: GetHeader()
                    }).success(function (data) {
                        angular.forEach(data.ServiceStats, function (value, key) {
                            $scope.PieChartData.push({ "arg": value.Service.Name, "val": value.NumberOfAppointment });
                            
                            $scope.TotalCostofServices = $scope.TotalCostofServices + (value.NumberOfAppointment) * value.Service.Cost;
                            TotalAppointment = TotalAppointment + value.NumberOfAppointment;
                           
                        })
                        $scope.AvgCostofService = $scope.TotalCostofServices / TotalAppointment;
                        def.resolve($scope.PieChartData);
                    })
                    return def.promise();
                }

            });

    //Pie Chart//
    var GetHeader = function () {
        var headers = {
            'Content-Type': 'application/json',
            'Token': $window.sessionStorage.getItem('userInfo-token')
        };
        return headers;
    }

    $scope.PieChartDataSource = function () {
        $scope.piechartOptions = {
            size: {
                width: 180,
                height: 180
            },
            palette: "bright",
            dataSource: PieChartSource,
            legend: {
                visible: true,

            },
            tooltip: {
                enabled: true,

                customizeTooltip: function (arg) {
                    return {                       
                        html: "<div>" + arg.argument + "</div>" + "<div>" + "<b>" + arg.valueText + " (" + arg.percentText +") " + "</b></div>",
                    };
                }
            },
            series: [
                {
                    argumentField: "arg",
                    valueField: "val",
                    label: {
                        visible: true,
                        font: {
                            size: 11,

                        },
                        backgroundColor: 'transparent',                      
                        position: "inside",
                        customizeText: function (arg) {                            
                            return arg.percentText;
                        }
                    }
                    
                }],
        };

    }
}]);




