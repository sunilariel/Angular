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


    //Redirection
    $scope.redirecttoCustomer = function () {
        $location.path("/customer/" + $routeParams.CompanyId);
    }

    $scope.RedirecttoStaff = function ()
    {
        $location.path("/Setting/" + $routeParams.CompanyId);
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


 
}]);
