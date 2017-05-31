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
    this.staffInformation = function(dataobject)
    {
        debugger;
        var response = $http({
            method: "post",
            url: "/wizard/poststaffdata",
            data:{dataObj: dataobject},
        });
        return response;
    }
    this.WorkingHours=function(dataobject)
    {
        var response = $http({
            method: "post",
            url: "/wizard/PostWorkingHours",
            data:{dataobj:dataobject},
        })
        return response;
    }

    //this.AddService=function(dataobject)
    //{
    //    var response = $http({
    //        method: "post",
    //        url: "/wizard/AddService",
    //        data:{dataobj:dataobject},
    //    })
    //    return response;
    //}
  
   
})

