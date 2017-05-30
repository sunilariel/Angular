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
})

