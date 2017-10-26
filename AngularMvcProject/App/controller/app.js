var app = angular.module('bookingApp', ['ngRoute', 'ui.bootstrap', 'dx', 'angularTrix', 'ngSanitize','ngCsv', 'ui.calendar','720kb.tooltips']);
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
    .when("/Calendar/:CompanyId", {
        templateUrl: "App/View/Calendar/Calendar.html",
        controller: "calendarController"
    })
    .when("/signin", {
        templateUrl: "App/View/SignUp/SignIn.html",
        controller: "SignIn"
    })
    .when("/BuisnessReports/:CompanyId", {
        templateUrl: "App/View/Reports/BuisnessReports.html",
        controller: "BuisnessReportsController"
    })
    .when("/ResourceReports/:CompanyId", {
        templateUrl: "App/View/Reports/ResourceReports.html",
        controller:"ResourceReportsController"
    })
    .when("/ServiceReports/:CompanyId", {
        templateUrl: "App/View/Reports/ServiceReports.html",
        controller: "ServiceReportsController"
    })
    .when("/CustomerReports/:CompanyId", {
        templateUrl: "App/View/Reports/CustomerReports.html",
        controller: "CustomerReportsController"
    })
})
//.run(function ($rootScope, $location) {
//    // register listener to watch route changes
//    $rootScope.$on("$routeChangeStart", function (event, next, current) {
//        if ($rootScope.IsLoggedInUser == null || $rootScope.IsLoggedInUser == false) {
//            // no logged user, we should be going to #login
//            if (next.templateUrl == "App/View/SignUp/SignUp.html" || next.templateUrl == "App/View/SignUp/SignIn.html") {
//                // already going to #login, no redirect needed
//            } else {
//                // not going to #login, we should redirect now
//                $location.path("/");
//            }
//        }
//    });
//})
;