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
        $scope.selecteddate = $filter('date')(new Date(),"EEE, MMM d");
        $scope.ServicePriceTimeDetailIsVisible = false;

        //Status List//
        $scope.StatusList = [{ Status: "No Label", "Value": 1 },
            { Status: "Pending", "Value": 2 },
            { Status: "Confirmed", "Value": 4 },
            { Status: "Done", "Value": 128 },
            { Status: "Paid", "Value": 512 },
            {Status:"NoShow ","Value": 256 },
            { Status: "RunningLate", "Value": 1024 }
        ]

        $scope.AppointmentSchedule = [];

        $scope.customerArr = [];
        //On init Getting List of Customers.
        var GetCustomer = bookingService.GetAllCustomer($scope.CompanyId);
        GetCustomer.then(function (response) {
             $scope.CustomerCount = response.data.length;
             if ($scope.CustomerCount == 0)
            {
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
                    if($scope.CustomerCount!=0)
                    {
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
        $scope.EmployeeId=EmployeeId;
        var EmployeeServices = bookingService.GetAllocatedServicetoEmployee($scope.CompanyId, EmployeeId);

        EmployeeServices.then(function (result) {
            debugger;
            $scope.EmployeeServices = [];
            $scope.EmployeeServices = result.data;


            //Get Staff Appointment working hours ///
            $scope.AppointmentSchedule = [];
            var resultAppontmentWorkingHours = bookingService.GetAppointmentWorkingHours(EmployeeId);
            resultAppontmentWorkingHours.then(function (response) {
                                                     
                    angular.forEach(response.data,function(value,key){
                        if(value.IsOffAllDay==true){
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
        $scope.ServiceId=SelectedServiceId;
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


        var data = $scope.item.Status;
      
        if (data == "No Label")
         {
            $scope.Status = 1;
         }
        else if (data == "Pending")
         {
            $scope.Status = 2;
         }
        else if (data == "Confirmed")
         {
            $scope.Status = 4;
        }
        else if(data=="No-Show")
        {
            $scope.Status = 256;
        }
        else if (data == "Done")
         {
            $scope.Status = 128;
         }
        else if (data == "RunningLate")
         {
            $scope.Status = 1024;
        }
        else if (data == "Paid")
        {
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
            "StartHour": starttime[0],
            "StartMinute": starttime[1],
            "EndHour": 0,
            "EndMinute": $scope.time,
            "IsAdded": true,
            "Message": "sample string 11",
            "CustomerIds": [$scope.CustomerId],
            "Start": new Date(),
            "End": "2017-06-27T11:45:54.4481356+00:00"
        }

        var addappointment = bookingService.AddAppointment(appointment);


        addappointment.then(function (response) {
            if (response.data.Success == true) {
                $scope.MessageText = "Creating Appointment";
                $scope.AppointmentId = response.data.ReturnObject;
                $timeout(function () {
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "Created Appointment";
                        $scope.IsVisible = false;
                        //var result = bookingService.GetAppointmentDetails($scope.CustomerId);
                        var SetStatus = bookingService.SetStatusofAppointment($scope.Status, $scope.AppointmentId);
                    }, 500);
                }, 1000)
            }

        });
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
        debugger;
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

    $scope.ChangeDate = function ()
    {
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
            DateofBooking: $filter('date')(newValue,"MM-dd-yyyy"),
            Day:days[newValue.getDay()],
        }
        var result = bookingService.GetFreeBookingSlotsForEmployee(RequestValues);
        result.then(function (response) {
            if (newValue != oldValue) {
                for (var i = 0; i < response.data.Value.length; i++) {
                    if (i == 0) {
                        var date = response.data.Value[i].Start.split(":");
                        var datetime = new Date(1970, 0, 1, date[0], date[1], date[2]);
                        var time = $filter('date')(datetime, 'h:mm a');
                        $scope.timeInfoFrom.push(time);
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




