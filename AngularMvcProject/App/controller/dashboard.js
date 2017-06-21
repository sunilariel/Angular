/// <reference path="dashboard.js" />
//var app = angular.module('MyApp', [])
app.controller('dashboardController', ['$scope', '$timeout','$routeParams', '$location', 'bookingService', function ($scope, $timeout,$routeParams,$location, bookingService) {
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

    $scope.redirecttoCustomer=function()
    {
        debugger;
        $location.path("/customer/" + $routeParams.CompanyId);
    }

    $scope.showCustomerpopup = function () {
        debugger;
        $scope.showcustomer != $scope.showcustomer;
    };


    //Create new Customer//

    $scope.CreateCustomer=function()
    {
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
    }

}]);
