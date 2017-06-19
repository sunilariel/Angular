app.controller('customerController', ['$scope', '$http', '$timeout', 'bookingService', function ($scope, $http, $timeout, bookingService) {
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




    //   $scope.init = function () {
    //       debugger;

    //       $scope.ListofCustomer = [{
    //           "Id": 1,
    //           "CompanyId": 2,
    //           "UserName": "sample string 3",
    //           "Password": "sample string 4",
    //           "FirstName": "David",
    //           "LastName": "sample string 6",
    //           "Address": "sample string 7",
    //           "PostCode": "sample string 8",
    //           "Email": "sample string 9",
    //           "TelephoneNo": "sample string 10",
    //           "CreationDate": "2017-06-08T04:41:21.9263797+00:00"
    //       },
    //     {
    //         "Id": 1,
    //         "CompanyId": 2,
    //         "UserName": "sample string 3",
    //         "Password": "sample string 4",
    //         "FirstName": "John",
    //         "LastName": "sample string 6",
    //         "Address": "sample string 7",
    //         "PostCode": "sample string 8",
    //         "Email": "sample string 9",
    //         "TelephoneNo": "sample string 10",
    //         "CreationDate": "2017-06-08T04:41:21.9263797+00:00"
    //     },
    //{
    //    "Id": 1,
    //    "CompanyId": 2,
    //    "UserName": "sample string 3",
    //    "Password": "sample string 4",
    //    "FirstName": "Tom",
    //    "LastName": "sample string 6",
    //    "Address": "sample string 7",
    //    "PostCode": "sample string 8",
    //    "Email": "sample string 9",
    //    "TelephoneNo": "sample string 10",
    //    "CreationDate": "2017-06-08T04:41:21.9263797+00:00"
    //}

    //       ];
    //       var data = $scope.ListofCustomer;
    //   };


    showcustomer = false;
    $scope.showCustomerpopup = function () {
        debugger;
        $scope.showcustomer != $scope.showcustomer;
    };


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
        var obj = {
            Url: 'api/customer/Create',
            ReqStaffData: {
                "Id": 1,
                "CompanyId": 410,
                "UserName": $scope.Customername,
                "Password": "*******",
                "FirstName": "$scope.Customername",
                "LastName": "sample string 6",
                "Address": "sample string 7",
                "PostCode": "sample string 8",
                "Email": $scope.Customeremail,
                "TelephoneNo": $scope.customerno,
                "CreationDate": "2017-06-06T08:23:47.5497158+00:00"
            }
        }
        var createcustomer = bookingService.CreateCustomer(obj);

        createcustomer.then(function (response) {
            debugger;
            if (response.data.Success == true) {
                alert("successfully Save data")
                $scope.MessageText = "Saving Data";
                $scope.msg = "Create Customer Successfully";

                var GetCustomer = bookingService.GetAllCustomer(410);
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
                });

                $timeout(function () {
                    $scope.MessageText = "Data Saved"; $timeout(function () {
                        $scope.IsVisible = false;
                    },
                         1000)
                }, 500);
            }

        }, function () {
            alert('Error in updating record');
        });
    };

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

    //////////////////////////////for Add Appointment module
    $scope.AddAppointmentPopup = function () {
        debugger;
        $scope.ShowAddAppointmentPopup != $scope.ShowAddAppointmentPopup;
    };

    $scope.showModal = false;
    $scope.open = function () {
        debugger;
        $scope.showModal = !$scope.showModal;
    };

    $scope.AddAppointment = [];

    $scope.GetAllAddAppointment = function () {
        debugger;
        var getAddAppointmentdata = bookingService.GetAddAppointmentData();

        getAddAppointmentdata.then(function (result) {
            debugger;
            $scope.AddAppointment = result.data;


        }, function () {
            alert('Error in getting post records');
        });
    }

}]);
