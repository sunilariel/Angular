
//var app = angular.module('bookingApp', ['ngRoute']);
//app.config(function ($routeProvider, $locationProvider) {
//    debugger;
//    $routeProvider
//    .when("/dashboard", {
//        templateUrl: "/Views/dashboard/dashboard.cshtml",
//        controller: "dashboardController"
//    })
//    .when("/wizard", {
//        templateUrl: "/Views/wizard/wizard.cshtml",
//        controller: "bookingController"
//    })

//    //$locationProvider.html5Mode(false).hashPrefix('!');
//});
app.service("bookingService", function ($http) {
    // Add Employee
    this.register = function (dataobject) {
        debugger;
        var response = $http({
            method: "post",
            url: "/wizard/postdata",
            data: { dataObj: dataobject },
        });
        return response;

    }
    this.staffInformation = function (dataobject) {
        debugger;
        var response = $http({
            method: "post",
            url: "/wizard/poststaffdata",
            data: { dataObj: dataobject },
        });
        return response;
    }

    this.EditStaffInformation = function (dataobject) {
        debugger;
        var response = $http({
            method: "post",
            url: "/wizard/EditStaffData",
            data: { dataObj: dataobject },
        });
        return response;
    }

    this.DeAllocateServiceForEmployee = function (dataobject) {
        debugger;
        var response = $http({
            method: "post",
            url: "/wizard/DeAllocateServiceForEmployee",
            data: { dataObj: dataobject },
        });
        return response;
    }
   

    this.WorkingHours = function (dataobject) {
        var response = $http({
            method: "post",
            url: "/wizard/PostWorkingHours",
            data: { dataobj: dataobject },
        })
        return response;
    }

    this.AddService = function (dataobject) {
        debugger;
        var response = $http({
            method: "post",
            url: "/wizard/AddService",
            data: { dataobj: dataobject },
        })
        return response;
    }

    this.EditService = function (dataobject) {
        debugger;
        var response = $http({
            method: "post",
            url: "/wizard/EditService",
            data: { dataobj: dataobject },
        })
        return response;
    }





    this.GetStaffData = function (dataobject) {
        debugger;

        var response = $http({
            method: "post",
            url: "/wizard/GetStaffData",
            data: { CompanyId: dataobject },
        })
        return response;
    }

    this.DeleteStaff = function (id) {
        debugger;
        var response = $http({
            method: "post",
            url: "/wizard/DeleteStaff",
            data: { Id: id }
        })
        return response;
    }
    this.getServicesData = function (id) {
        debugger;
        var response = $http({
            method: "post",
            url: "/wizard/GetServiceData",
            data: { Id: id }
        })
        return response;
    }
    this.DeleteService = function (id) {
        debugger;
        var response = $http({
            method: "post",
            url: "/wizard/DeleteService",
            data: { Id: id }
        })
        return response;
    }
    this.assignStaffToService = function (dataobject) {
        debugger;
        var response = $http({
            method: "post",
            url: "/wizard/AssignStaff",
            data: { dataobj: dataobject }
        })
        return response;
    }
    
  
    ///////////Customer Section in MileStone_2///////////////

    this.CreateCustomer = function (dataobject) {
        debugger;
        var response = $http({
            method: 'post',
            url: "/Customer/CreateCustomer",
            data: { dataobj: dataobject }
        })
        return response;
    }

    this.GetAllCustomer = function (dataobject) {
        debugger;
        var response = $http({
            method: 'post',
            url: '/Customer/GetAllCustomer',
            data: { Id: dataobject }
        })
        return response;
    }

    this.DeleteCustomer = function (id) {
        debugger;
        var response = $http({
            method: "post",
            url: "/Customer/DeleteCustomer",
            data: { Id: id }
        })
        return response;
    }
    ////////////for customer module Add appointment

    this.GetAddAppointmentData = function (dataobject) {
        debugger;
        var response = $http({
            method: 'post',
            url: '/Customer/GetAddAppointmentData',
            data: { Id: dataobject }
        })
    }

    /////////////////

   
   
})



