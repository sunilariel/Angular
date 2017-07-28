
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
            data: { dataobj: dataobject}
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

    this.DeleteCustomer = function (companyId,customerId) {
        debugger;
        var response = $http({
            method: "post",
            url: "/Customer/DeleteCustomer",
            data: { CompanyId: companyId,CustomerId:customerId }
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


    //Get Working Time Slots for Employee//
    this.GetFreeBookingSlotsForEmployee = function (dataobject) {
        var response = $http({
            method: "POST",
            url: "/Customer/GetFreeBookingSlotsForEmployee",
            data:{dataObj:dataobject}
        })
        return response;
    }

    this.GetAppointmentDetails=function(customerId){
        var response=$http({
            method:"POST",
            url: "/Customer/GetAppointmentDetails",
            data:{CustomerId:customerId}
        })
        return response;
    }

    ///Add Service and Category Section in MileStone_3

    this.AddCategory = function (dataobject) {
        var response = $http({
            method: "POST",
            url: "/Services/AddCategory",
            data:{category:dataobject}
        })
        return response;
    }
    
    this.GetCategories=function(dataobject)
    {
        var response = $http({
            method: "POST",
            url: "/Services/GetCategories",
            data:{Id:dataobject}
        })
        return response;
    }

    this.AddServices=function(dataobject)
    {
        var response = $http({
            method: "POST",
            url: "/Services/AddServices",
            data:{service:dataobject}
        })
        return response;
    }

    this.UpdateService=function(dataobject)
    {
        var response = $http({
            method: "POST",
            url: "/Services/UpdateService",
            data:{service:dataobject}
        })
        return response;
    }

    this.AssignCategorytoService=function(companyId,serviceId,categoryId)
    {
        var response = $http({
            method: "POST",
            url: "/Services/AssignCategorytoService",
            data: { CompanyId:companyId,SeviceId: serviceId, CategoryId: categoryId }
        })
        return response;
    }

    this.DeAllocateCategoryFromService=function(companyId,serviceId,categoryId)
    {
        var response = $http({
            method: "POST",
            url: "/Services/DeAllocateCategoryFromService",
            data: { CompanyId: companyId, SeviceId: serviceId, CategoryId: categoryId }
        })
        return response;

    }

    this.GetCategoriesAssignedToService=function(companyId,serviceId)
    {
        var response = $http({
            method: "POST",
            url: "/Services/GetCategoriesAssignedToService",
            data:{CompanyId:companyId,ServiceId:serviceId}
        })
        return response;
    }

    this.GetAllService=function(companyId)
    {
        var response = $http({
            method: "POST",
            url: "/Services/GetAllServices",
            data: { CompanyId: companyId }
        })
       return response;
    }

    this.GetAppointmentWorkingHours=function(Id)
    {
        var response = $http({
            method: "POST",
            url: "/Customer/GetAppointmentWorkinghours",
            data: { EmployeeId: Id }
        })
        return response;
    }

    this.GetAllServiceForCategory=function(categoryId,companyId)
    {
        var response = $http({
            method: "POST",
            url: "/Services/GetAllServiceForCategory",
            data: { CategoryId: categoryId, CompanyId: companyId }
        })
        return response;
    }

    this.GetAllStaff=function(Id)
    {
        var response = $http({
            method: "POST",
            url: "/Services/GetAllStaff",
            data:{CompanyId:Id}
        })
        return response;
    }

    this.AssignStafftoService=function(dataobject)
    {
        var response = $http({
            method: "POST",
            url: "/Services/AssignStaffToService",
            data: { AssignStaff: dataobject }
        })
        return response;
    }

    this.DeAssignedStaffToService=function(companyId,employeeId,serviceId)
    {
        var response = $http({
            method: "POST",
            url: "/Services/DeAssignedStaffToService",
            data: { CompanyId: companyId, EmployeeId: employeeId, ServiceId: serviceId }
        })
        return response;
    }

    this.UpdateCategory=function(dataobject)
    {
        var response = $http({
            method: "POST",
            url: "/Services/UpdateCategory",
            data:{Category:dataobject}
        })

        return response;
    }

    this.DeleteCategory=function(Id)
    {
        var response = $http({
            method: "POST",
            url: "/Services/DeleteCategory",
            data:{CompanyId:Id}
        })
        return response;
    }
  

    this.GetEmployeeAssignedtoService=function(Id)
    {
        debugger;
        var response = $http({
            method: "POST",
            url: "/Services/GetEmployeeAssignedtoService",
            data: { ServiceId: Id }
        })
        return response;
    }

    this.DeleteService=function(Id)
    {
        var response = $http({
            method: "POST",
            url: "/Services/DeleteService",
            data: { ServiceId: Id }
        })
        return response;
    }

    //MileStone_4 Add Staff Section//

    this.AddStaff = function (dataobject) {
        var response = $http({
            method: "POST",
            url: "/Staff/AddStaff",
            data: { dataObj: dataobject }
        })
        return response;
    }

    this.UpdateStaff=function(dataobject)
    {
        var response = $http({
            method: "POST",
            url: "/Staff/UpdateStaff",
            data:{dataobj:dataobject}
        })
        return response;
    }

    this.AssignedServicetoStaff=function(dataobject)
    {
        var response = $http({
            method: "POST",
            url: "/Staff/AllocateServicetoEmployee",
            data:{dataObj:dataobject }
        })
        return response;
    }
    this.UnAssignServicetoStaff=function(companyId,employeeId,serviceId)
    {
        var response = $http({
            method: "POST",
            url: "/Staff/DeAllocateServicetoEmployee",
            data:{CompanyId:companyId,EmployeeId:employeeId,ServiceId:serviceId}
        })
        return response;
    }

    this.GetAllServiceStatus=function(companyId,employeeId)
    {
        var response = $http({
            method: "POST",
            url: "/Staff/GetAllServiceStatus",
            data:{companyId:companyId,EmployeeId:employeeId}
        })
        return response;
    }

    //Set Employee Working Hours//
    this.SetEmployeeWorkingHours=function(dataobject)
    {
        var response = $http({
            method: "POST",
            url: "/Staff/SetEmployeeWorkingHours",
            data:{dataObj:dataobject}
        })
        return response;
    }

    //Get Working Hours of Employee

    this.GetWorkingHoursofEmployee=function(employeeId)
    {
        var response = $http({
            method: "POST",
            url: "/Staff/GetWorkingHoursofEmployee",
            data: { EmployeeId: employeeId }
        })
        return response;
    }

    //Set timeOff//

    this.AddtimeOff=function(dataobject)
    {
        var response = $http({
            method: "POST",
            url: "/Staff/SetTimeOff",
            data:{dataobj:dataobject}
        })
        return response;
    }
    this.UpdateTimeOff=function(dataobject)
    {
        var response = $http({
            method: "POST",
            url: "/Staff/UpdateTimeOff",
            data:{dataobj:dataobject}
        })
        return response;
    }
    //Get TimeOff//

    this.GetTimeOffDetail=function(Id)
    {
        var response = $http({
            method: "POST",
            url: "/Staff/GetTimeOffDetail",
            data: { EmployeeId: Id }
        })
        return response;
    }

    this.DeleteTimeOff=function(Id)
    {
        var response = $http({          
            method:"POST",
            url: "/Staff/DeleteTimeOffofEmployee",
            data:{TimeOffId:Id}           
        })
        return response;
    }
    this.SetStatusofAppointment = function (Status, bookingId)
    {
        var response = $http({
            method: "POST",
            url: "/Customer/SetStatusOfAppointment",
            data: { status: Status, BookingId: bookingId }
        })
       return  response;
    }

    this.AddEmployeeBreakTime=function(dataobj)
    {
        var response = $http({
            method: "POST",
            url: "/Staff/SetEmployeeBreakTime",
            data:{dataObj:dataobj}
        })
        return response;
    }
    this.GetBreakTimeHoursofEmployee=function(employeeId)
    {
        var response = $http({
            method: "POST",
            url: "/Staff/GetBreakTimeHoursofEmployee",
            data: { EmployeeId: employeeId }
        })
        return response;
    }

    this.DeleteBreak=function(Id)
    {
        var response = $http({
            method: "POST",
            url: "/Staff/DeleteBreakTimeOfEmployee",
            data:{BreakId:Id}
        })
        return response;
    }

    this.UpdateBreakTime=function(dataobj,status)
    {
        var response = $http({
            method: "POST",
            url: "/Staff/UpdateBreakTimeofEmployee",
            data:{dataObj:dataobj,Status:status}
        })
        return response;
    }
})



