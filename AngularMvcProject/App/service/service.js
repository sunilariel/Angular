
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

    this.UpdateCustomer=function(dataobject)
    {
        debugger;
        var response = $http({
            method: "POST",
            url: "/Customer/UpdateCustomer",
            data:{customer:dataobject}
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

    this.GetAllocatedServicetoEmployee = function (companyId,employeeId) {
        debugger;
        var response = $http({
            method: 'post',
            url: '/Customer/GetAllocatedServicetoEmployee',
            data: { CompanyId: companyId,EmployeeId:employeeId }
        })
        return response;
    }

    this.AddAppointment=function(dataobject)
    {
       var response= $http({
            method: 'POST',
            url: '/Customer/AddAppointment',
            data: { appointment: dataobject }
       })
       return response;
    }


    this.GetSelectedService=function(dataobject)
    {
        var response = $http({
            method: "POST",
            url: "/Customer/GetSelectedService",
            data:{ServiceId:dataobject}
        })
        return response;
    }
    
  
})



