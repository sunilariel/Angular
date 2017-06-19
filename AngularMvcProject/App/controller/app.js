var app = angular.module('bookingApp', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
    .when("/",{
        templateUrl: "App/View/SignUp/SignUp.html",
        controller:"SignUp"
    })
    .when("/wizard", {
        templateUrl: "App/View/wizard/wizard.html",
        controller: "bookingController"
    })
    .when("/dashboard", {
        templateUrl: "App/View/dashboard/dashboard.html",
        controller: "dashboardController"
    })
    .when("/customer", {
        templateUrl: "App/View/Customer/customer.html",
        controller: "customerController"
    })
});