
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
})



