app.service("SignUpService", function ($http) {
    // Add Employee
    this.register = function (dataobject) {
        debugger;
        var response = $http({
            method: "post",
            url: "http://romzbookingmanager.azurewebsites.net/api/companyregistration/CreateAccount",
            data: JSON.stringify(dataobject),
            dataType: "json"
        });
        return response;
    }
})