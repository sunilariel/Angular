app.controller('customerController', ['$scope','$rootScope','$routeParams', '$http', '$timeout', 'bookingService', function ($scope,$rootScope,$routeParams, $http, $timeout, bookingService) {
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


    $scope.init=function()
    {
        debugger;

      
        $scope.CompanyId = $routeParams.CompanyId;;
        $scope.showcustomer = false;
        $scope.customerArr = [];
        var GetCustomer = bookingService.GetAllCustomer($scope.CompanyId);
        GetCustomer.then(function (response) {           
          $scope.customerArr = response.data;
        });

        //Getting all employees for appointment dropdown

        var GetStaffProvider = bookingService.GetStaffData($scope.CompanyId);
        GetStaffProvider.then(function (response) {
            debugger;
            $scope.Provider = [];
            for (var i = 0; i < response.data.length; i++) {
                $scope.Provider.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'UserName': response.data[i].UserName, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email });
            }
        });

    }


    //$scope.GetCustomer = function () {
    //    debugger;
    //    var getCustomerdata = bookingService.GetCustomerdata();

    //    getCustomerdata.then(function (result) {
    //        debugger;
    //        $scope.Customerdata = result.data;


    //    }, function () {
    //        alert('Error in getting post records');
    //    });
    //}

    $scope.CreateCustomer = function () {
        debugger;
        $scope.MobileNo = $scope.customerExt + $scope.customerMobile;      
        var obj = {
            Url: 'api/customer/Create',
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
                $scope.CustomerId=response.data.ReturnObject.CustomerId;
                $scope.MessageText = "Saving Data";
                $scope.msg = "Create Customer Successfully";

                var GetCustomer = bookingService.GetAllCustomer($scope.CompanyId);
                GetCustomer.then(function (response) {
                    debugger;
                    $scope.customerArr = [];
                    //for (var i = 0; i < response.data.length; i++) {
                    //    $scope.customerArr.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'UserName': response.data[i].UserName, 'Password': response.data[i].Password, 'FirstName': response.data[i].FirstName, 'LastName': response.data[i].LastName, 'Address': response.data[i].Address, 'PostCode': response.data[i].PostCode, 'Email': response.data[i].Email, 'TelephoneNo': response.TelephoneNo[i].Email, 'CreationDate': response.data[i].CreationDate, });
                    //}
                    //angular.forEach($scope.customerArr, function (value, key) {
                    //    data = { 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'UserName': response.data[i].UserName, 'Password': response.data[i].Password, 'FirstName': response.data[i].FirstName, 'LastName': response.data[i].LastName, 'Address': response.data[i].Address, 'PostCode': response.data[i].PostCode, 'Email': response.data[i].Email, 'TelephoneNo': response.TelephoneNo[i].Email, 'CreationDate': response.data[i].CreationDate, }
                    //    customerArr.push(data);
                    //});
                    //$scope.init();
                    //$scope.username = '';  
                    $scope.customerArr = response.data;
                    $scope.showcustomer = false;
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

    //for Edit Customer

    $scope.EditCustomer = function (item)
    {
        debugger;
        $scope.CustomerId = item.Id;
        $scope.updatedCustomerName = item.FirstName;
        $scope.updatedCustomerEmail = item.Email;
        $scope.updatedPreCustomerMobileNo = item.TelephoneNo.substring(0, 2);
        $scope.updatedMobileNo = item.TelephoneNo.substring(2,12);
    }

    $scope.updateCustomer=function()
    {
        debugger;
        var MobileNumber = $scope.updatedPreCustomerMobileNo + $scope.updatedMobileNo;
        var updateddate = new Date();
        var UpdateCustomer = {
            Url:"api/customer/Update",
            ReqStaffData: {
                "Id":$scope.CustomerId,
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
            if (response.data.Success == "true") {
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






    //// for delete customer 

    $scope.DeleteCustomerData = function (id) {
        debugger;
        var deletecustomer = bookingService.DeleteCustomer(id);
        deletecustomer.then(function (response) {
            $scope.MessageText = "Deleting Data"
            $scope.msg = "Data Deleted Successfully!";
            //var CompanyId = $scope.companyId;
            //var getServiceData = bookingService.getServicesData(CompanyId);

            //getServiceData.then(function (response) {
            //    debugger;
            //    $scope.serviceInfo = [];
            //    for (var i = 0; i < response.data.length; i++) {
            //        $scope.serviceInfo.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'serviceName': response.data[i].Name, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email, 'DurationInMinutes': response.data[i].DurationInMinutes, 'time': response.data[i].DurationInHours, 'Currency': response.data[i].Currency, 'price': response.data[i].Cost, 'CreationDate': response.data[i].CreationDate, });
            //    }
            //    $scope.init();
            //    $scope.staffName = '';
            //    $scope.staffEmail = '';
            //});
            var GetCustomer = bookingService.GetAllCustomer($scope.CompanyId);
            GetCustomer.then(function (response) {
                debugger;
                $scope.customerArr = [];

                $scope.customerArr = response.data;
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
        $scope.ShowAddAppointmentPopup != $scope.ShowAddAppointmentPopup;
    };

    $scope.showModal = false;
    $scope.open = function () {
        debugger;
        $scope.showModal = !$scope.showModal;
    };

    $scope.GetAllocateServiceToEmployee = function (EmployeeId) {
        debugger;

        var EmployeeServices = bookingService.GetAllocatedServicetoEmployee($scope.CompanyId, EmployeeId);

        EmployeeServices.then(function (result) {
            debugger;
            $scope.EmployeeServices = [];
            $scope.EmployeeServices = result.data;

        }), function () {
            alert('Error in getting post records');
        };
    }

    $scope.ServiceDetail=function(service)
    {

    }

   

}]);
