var app = angular.module('bookingApp', ['ngRoute', 'ui.bootstrap','dx']);
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
    .when("/dashboard/:CompanyId", {
        templateUrl: "App/View/dashboard/dashboard.html",
        controller: "dashboardController"
    })
    .when("/customer/:CompanyId", {
        templateUrl: "App/View/Customer/customer.html",
        controller: "customerController"
    })
    .when("/Setting/:CompanyId", {
        templateUrl: "App/View/Setting/Staff.html",
        controller:"staffController"
    })
    .when("/Services/:CompanyId", {
        templateUrl: "App/View/Setting/Services.html",
        controller: "servicesController"
    })
    .when("/signin", {
        templateUrl: "App/View/SignUp/SignIn.html",
        controller: "SignIn"
    })
});