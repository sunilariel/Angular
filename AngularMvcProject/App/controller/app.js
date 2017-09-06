var app = angular.module('bookingApp', ['ngRoute', 'ui.bootstrap','dx','angularTrix','ngSanitize']);
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
})
.run(function ($rootScope, $location) {
    // register listener to watch route changes
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if ($rootScope.IsLoggedInUser == null) {
            // no logged user, we should be going to #login
            if (next.templateUrl == "/SignUp") {
                // already going to #login, no redirect needed
            } else {
                // not going to #login, we should redirect now
                $location.path("/");
            }
        }
    });
});