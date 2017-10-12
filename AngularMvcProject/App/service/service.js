
app.service("bookingService", function ($http, $window) {

    var GetHeader = function () {
        var headers = {
            'Content-Type': 'application/json',
            'Token': $window.sessionStorage.getItem('userInfo-token')
        };

        return headers;
    }

    this.GetHeader = function () {
        var headers = {
            'Content-Type': 'application/json',
            'Token': $window.sessionStorage.getItem('userInfo-token')
        };

        return headers;
    }

    this.SignUp = function (dataobject) {
        var response = $http({
            method: "POST",
            url: "/SignUp/CreateAccount",
            data: { dataObj: dataobject },
            headers: GetHeader()
        });
        return response;
    }


    this.CheckUserExist = function (email) {
        var response = $http({
            method: "POST",
            url: "/SignUp/UserExist",
            data: { Email: email }
        });
        return response;
    }
    // Add Employee
    this.register = function (dataobject) {

        var response = $http({
            method: "post",
            url: "/wizard/postdata",
            data: { dataObj: dataobject },
            headers: GetHeader()
        });
        return response;

    }
    this.staffInformation = function (dataobject) {

        var response = $http({
            method: "post",
            url: "/wizard/poststaffdata",
            data: { dataObj: dataobject },
            headers: GetHeader()
        });
        return response;
    }

    this.EditStaffInformation = function (dataobject) {

        var response = $http({
            method: "post",
            url: "/wizard/EditStaffData",
            data: { dataObj: dataobject },
            headers: GetHeader()
        });
        return response;
    }

    this.DeAllocateServiceForEmployee = function (dataobject) {

        var response = $http({
            method: "post",
            url: "/wizard/DeAllocateServiceForEmployee",
            data: { dataObj: dataobject },
            headers: GetHeader()
        });
        return response;
    }


    this.WorkingHours = function (dataobject) {
        var response = $http({
            method: "post",
            url: "/wizard/PostWorkingHours",
            data: { dataobj: dataobject },
            headers: GetHeader()
        })
        return response;
    }

    this.AddService = function (dataobject) {

        var response = $http({
            method: "post",
            url: "/wizard/AddService",
            data: { dataobj: dataobject },
            headers: GetHeader()
        })
        return response;
    }

    this.EditService = function (dataobject) {

        var response = $http({
            method: "post",
            url: "/wizard/EditService",
            data: { dataobj: dataobject },
            headers: GetHeader()
        })
        return response;
    }

    this.GetStaffData = function (dataobject) {


        var response = $http({
            method: "post",
            url: "/wizard/GetStaffData",
            data: { CompanyId: dataobject },
            headers: GetHeader()
        })
        return response;
    }

    this.DeleteStaff = function (id) {

        var response = $http({
            method: "post",
            url: "/wizard/DeleteStaff",
            data: { Id: id },
            headers: GetHeader()
        })
        return response;
    }
    this.getServicesData = function (id) {

        var response = $http({
            method: "post",
            url: "/wizard/GetServiceData",
            data: { Id: id },
            headers: GetHeader()
        })
        return response;
    }
    this.DeleteService = function (id) {

        var response = $http({
            method: "post",
            url: "/wizard/DeleteService",
            data: { Id: id },
            headers: GetHeader()
        })
        return response;
    }
    this.assignStaffToService = function (dataobject) {

        var response = $http({
            method: "post",
            url: "/wizard/AssignStaff",
            data: { dataobj: dataobject },
            headers: GetHeader()
        })
        return response;
    }


    ///////////Customer Section in MileStone_2///////////////

    this.CreateCustomer = function (dataobject) {

        var response = $http({
            method: 'post',
            url: "/Customer/CreateCustomer",
            data: { dataobj: dataobject },
            headers: GetHeader()
        })
        return response;
    }

    this.UpdateCustomer = function (dataobject) {

        var response = $http({
            method: "POST",
            url: "/Customer/UpdateCustomer",
            data: { customer: dataobject },
            headers: GetHeader()

        })
        return response;
    }


    this.GetAllCustomer = function (dataobject) {

        var response = $http({
            method: 'post',
            url: '/Customer/GetAllCustomer',
            data: { Id: dataobject },
            headers: GetHeader()
        })
        return response;
    }

    this.DeleteCustomer = function (companyId, customerId) {

        var response = $http({
            method: "post",
            url: "/Customer/DeleteCustomer",
            data: { CompanyId: companyId, CustomerId: customerId },
            headers: GetHeader()
        })
        return response;
    }

    this.GetCustomerStats = function (companyId, customerId, year, month) {
        var response = $http({
            method: "post",
            url: "/Customer/GetCustomerStats",
            data: { CompanyId: companyId, CustomerId: customerId, Year: year, Month: month },
            headers: GetHeader()
        })
        return response;
    }

    this.AddCustomerNote = function (dataobj) {
        var response = $http({
            url: "/Customer/AddCustomerNote",
            method: "POST",
            data: { notesdetail: dataobj },
            headers: GetHeader()
        })
        return response;
    }

    this.GetCustomerNotes = function (companyId, customerId) {
        var response = $http({
            url: "/Customer/GetCustomerNotes",
            data: { CompanyId: companyId, CustomerId: customerId },
            method: "POST",
            headers: GetHeader()
        })
        return response;
    }

    this.DeleteCustomerNote = function (companyId, customerNoteId) {
        var response = $http({
            url: "/Customer/DeleteCustomerNote",
            data: { CompanyId: companyId, CustomerNoteId: customerNoteId },
            method: "POST",
            headers: GetHeader()
        })
        return response;
    }

    ////////////for customer module Add appointment

    this.GetAllocatedServicetoEmployee = function (companyId, employeeId) {

        var response = $http({
            method: 'post',
            url: '/Customer/GetAllocatedServicetoEmployee',
            data: { CompanyId: companyId, EmployeeId: employeeId },
            headers: GetHeader()
        })
        return response;
    }

    this.AddAppointment = function (dataobject) {
        var response = $http({
            method: 'POST',
            url: '/Customer/AddAppointment',
            data: { appointment: dataobject },
            headers: GetHeader()
        })
        return response;
    }

    this.UpdateAppointment = function (dataobject) {
        var response = $http({
            method: 'POST',
            url: '/Customer/UpdateAppointment',
            data: { appointment: dataobject },
            headers: GetHeader()
        })
        return response;
    }

    this.GetSelectedService = function (dataobject) {
        var response = $http({
            method: "POST",
            url: "/Customer/GetSelectedService",
            data: { ServiceId: dataobject },
            headers: GetHeader()
        })
        return response;
    }

    this.GetCompanyDetails = function (dataobject) {
        var response = $http({
            method: "POST",
            url: "/Customer/GetCompanyDetails",
            data: { companyId: dataobject },
            headers: GetHeader()
        })
        return response;
    }


    //Get Working Time Slots for Employee//
    this.GetFreeBookingSlotsForEmployee = function (dataobject) {
        var response = $http({
            method: "POST",
            url: "/Customer/GetFreeBookingSlotsForEmployee",
            data: { dataObj: dataobject },
            headers: GetHeader()
        })

        return response;
    }

    this.GetAppointmentDetails = function (customerId) {
        var response = $http({
            method: "POST",
            url: "/Customer/GetAppointmentDetails",
            data: { CustomerId: customerId },
            headers: GetHeader()
        })
        return response;
    }

    this.DeleteAppointment = function (Id) {
        var response = $http({
            method: "POST",
            url: "/Customer/DeleteAppointment",
            data: { BookingId: Id },
            headers: GetHeader()
        })
        return response;
    }

    ///Add Service and Category Section in MileStone_3

    this.AddCategory = function (dataobject) {
        var response = $http({
            method: "POST",
            url: "/Services/AddCategory",
            data: { category: dataobject },
            headers: GetHeader()
        })
        return response;
    }

    this.GetCategories = function (dataobject) {
        var response = $http({
            method: "POST",
            url: "/Services/GetCategories",
            data: { Id: dataobject },
            headers: GetHeader()
        })
        return response;
    }

    this.AddServices = function (dataobject) {
        var response = $http({
            method: "POST",
            url: "/Services/AddServices",
            data: { service: dataobject },
            headers: GetHeader()
        })
        return response;
    }

    this.UpdateService = function (dataobject) {
        var response = $http({
            method: "POST",
            url: "/Services/UpdateService",
            data: { service: dataobject },
            headers: GetHeader()
        })
        return response;
    }

    this.AssignCategorytoService = function (companyId, serviceId, categoryId) {
        var response = $http({
            method: "POST",
            url: "/Services/AssignCategorytoService",
            data: { CompanyId: companyId, SeviceId: serviceId, CategoryId: categoryId },
            headers: GetHeader()
        })
        return response;
    }

    this.DeAllocateCategoryFromService = function (companyId, serviceId, categoryId) {
        var response = $http({
            method: "POST",
            url: "/Services/DeAllocateCategoryFromService",
            data: { CompanyId: companyId, SeviceId: serviceId, CategoryId: categoryId },
            headers: GetHeader()
        })
        return response;

    }

    this.GetCategoriesAssignedToService = function (companyId, serviceId) {
        var response = $http({
            method: "POST",
            url: "/Services/GetCategoriesAssignedToService",
            data: { CompanyId: companyId, ServiceId: serviceId },
            headers: GetHeader()
        })
        return response;
    }

    this.GetAllService = function (companyId) {
        var response = $http({
            method: "POST",
            url: "/Services/GetAllServices",
            data: { CompanyId: companyId },
            headers: GetHeader()
        })
        return response;
    }

    this.GetAppointmentWorkingHours = function (Id) {
        var response = $http({
            method: "POST",
            url: "/Customer/GetAppointmentWorkinghours",
            data: { EmployeeId: Id },
            headers: GetHeader()
        })
        return response;
    }

    this.GetAllServiceForCategory = function (categoryId, companyId) {
        var response = $http({
            method: "POST",
            url: "/Services/GetAllServiceForCategory",
            data: { CategoryId: categoryId, CompanyId: companyId },
            headers: GetHeader()
        })
        return response;
    }

    this.GetAllStaff = function (Id) {
        var response = $http({
            method: "POST",
            url: "/Services/GetAllStaff",
            data: { CompanyId: Id },
            headers: GetHeader(),
        })

        return response;
    }

    this.AssignStafftoService = function (dataobject) {
        var response = $http({
            method: "POST",
            url: "/Services/AssignStaffToService",
            data: { AssignStaff: dataobject },
            headers: GetHeader()
        })
        return response;
    }

    this.DeAssignedStaffToService = function (companyId, employeeId, serviceId) {
        var response = $http({
            method: "POST",
            url: "/Services/DeAssignedStaffToService",
            data: { CompanyId: companyId, EmployeeId: employeeId, ServiceId: serviceId },
            headers: GetHeader()
        })
        return response;
    }

    this.UpdateCategory = function (dataobject) {
        var response = $http({
            method: "POST",
            url: "/Services/UpdateCategory",
            data: { Category: dataobject },
            headers: GetHeader()
        })

        return response;
    }

    this.DeleteCategory = function (companyId, categoryId) {
        var response = $http({
            method: "POST",
            url: "/Services/DeleteCategory",
            data: { CompanyId: companyId, CategoryId: categoryId },
            headers: GetHeader()
        })
        return response;
    }


    this.GetEmployeeAssignedtoService = function (Id) {

        var response = $http({
            method: "POST",
            url: "/Services/GetEmployeeAssignedtoService",
            data: { ServiceId: Id },
            headers: GetHeader()
        })
        return response;
    }

    this.DeleteService = function (Id) {
        var response = $http({
            method: "POST",
            url: "/Services/DeleteService",
            data: { ServiceId: Id },
            headers: GetHeader()
        })
        return response;
    }

    //MileStone_4 Add Staff Section//

    this.AddStaff = function (dataobject) {
        var response = $http({
            method: "POST",
            url: "/Staff/AddStaff",
            data: { dataObj: dataobject },
            headers: GetHeader()
        })
        return response;
    }

    this.UpdateStaff = function (dataobject) {
        var response = $http({
            method: "POST",
            url: "/Staff/UpdateStaff",
            data: { dataobj: dataobject },
            headers: GetHeader()
        })
        return response;
    }

    this.AssignedServicetoStaff = function (dataobject) {
        var response = $http({
            method: "POST",
            url: "/Staff/AllocateServicetoEmployee",
            data: { dataObj: dataobject },
            headers: GetHeader()
        })
        return response;
    }
    this.UnAssignServicetoStaff = function (companyId, employeeId, serviceId) {
        var response = $http({
            method: "POST",
            url: "/Staff/DeAllocateServicetoEmployee",
            data: { CompanyId: companyId, EmployeeId: employeeId, ServiceId: serviceId },
            headers: GetHeader()
        })
        return response;
    }

    this.GetAllServiceStatus = function (companyId, employeeId) {
        var response = $http({
            method: "POST",
            url: "/Staff/GetAllServiceStatus",
            data: { companyId: companyId, EmployeeId: employeeId },
            headers: GetHeader()
        })
        return response;
    }

    //Set Employee Working Hours//
    this.SetEmployeeWorkingHours = function (dataobject) {
        var response = $http({
            method: "POST",
            url: "/Staff/SetEmployeeWorkingHours",
            data: { dataObj: dataobject },
            headers: GetHeader()
        })
        return response;
    }

    //Get Working Hours of Employee

    this.GetWorkingHoursofEmployee = function (employeeId) {
        var response = $http({
            method: "POST",
            url: "/Staff/GetWorkingHoursofEmployee",
            data: { EmployeeId: employeeId },
            headers: GetHeader()
        })
        return response;
    }

    //Set timeOff//

    this.AddtimeOff = function (dataobject) {
        var response = $http({
            method: "POST",
            url: "/Staff/SetTimeOff",
            data: { dataobj: dataobject },
            headers: GetHeader()
        })
        return response;
    }
    this.UpdateTimeOff = function (dataobject) {
        var response = $http({
            method: "POST",
            url: "/Staff/UpdateTimeOff",
            data: { dataobj: dataobject },
            headers: GetHeader()
        })
        return response;
    }
    //Get TimeOff//

    this.GetTimeOffDetail = function (Id) {
        var response = $http({
            method: "POST",
            url: "/Staff/GetTimeOffDetail",
            data: { EmployeeId: Id },
            headers: GetHeader()
        })
        return response;
    }

    this.DeleteTimeOff = function (Id) {
        var response = $http({
            method: "POST",
            url: "/Staff/DeleteTimeOffofEmployee",
            data: { TimeOffId: Id },
            headers: GetHeader()
        })
        return response;
    }
    this.SetStatusofAppointment = function (Status, bookingId) {
        var response = $http({
            method: "POST",
            url: "/Customer/SetStatusOfAppointment",
            data: { status: Status, BookingId: bookingId },
            headers: GetHeader()
        })
        return response;
    }

    this.AddEmployeeBreakTime = function (dataobj) {
        var response = $http({
            method: "POST",
            url: "/Staff/SetEmployeeBreakTime",
            data: { dataObj: dataobj },
            headers: GetHeader()
        })
        return response;
    }
    this.GetBreakTimeHoursofEmployee = function (employeeId) {
        var response = $http({
            method: "POST",
            url: "/Staff/GetBreakTimeHoursofEmployee",
            data: { EmployeeId: employeeId },
            headers: GetHeader()
        })
        return response;
    }

    this.DeleteBreak = function (Id) {
        var response = $http({
            method: "POST",
            url: "/Staff/DeleteBreakTimeOfEmployee",
            data: { BreakId: Id },
            headers: GetHeader()
        })
        return response;
    }

    this.UpdateBreakTime = function (dataobj, status) {
        var response = $http({
            method: "POST",
            url: "/Staff/UpdateBreakTimeofEmployee",
            data: { dataObj: dataobj, Status: status },
            headers: GetHeader()
        })
        return response;
    }

    //Dashboard Section//
    this.GetWeeksSchedule = function (companyId) {
        var response = $http({
            method: "POST",
            url: "/Dashboard/GetWeeksSchedule",
            data: { CompanyId: companyId },
            headers: GetHeader()
        })
        return response;
    }
    this.GetWeeksActivitySummary = function (companyId) {
        var response = $http({
            method: "POST",
            url: "/Dashboard/GetWeeksActivitySummary",
            data: { CompanyId: companyId },
            headers: GetHeader()
        })
        return response;
    }
    this.GetCurrentWeeksRevenueSummary = function (companyId) {
        var response = $http({
            method: "POST",
            url: "/Dashboard/GetCurrentWeeksRevenueSummary",
            data: { CompanyId: companyId },
            headers: GetHeader()
        })
        return response;
    }

    this.SignOut = function () {
        var response = $http({
            method: "POST",
            url: "/Dashboard/SignOut",
            headers: GetHeader()
        })
        return response;
    }

    this.GetCustomerById = function (customerId) {
        var response = $http({
            method: "POST",
            url: "/Dashboard/GetCustomerById",
            headers: GetHeader(),
            data: { CustomerId: customerId }
        })
        return response;
    }

    //Report Section//

    this.GetBusinessReport = function (companyId, startDate, endDate) {
        debugger;
        var response = $http({
            method: "POST",
            url: "/Report/GetBusinessReport",
            headers: GetHeader(),
            data: { CompanyId: companyId, StartDate: startDate, EndDate: endDate }
        })
        return response;
    }

    this.GetResourceReportsBetweenDates = function (companyId, employeeIdArray, startDate, endDate) {
        debugger;
        var response = $http({
            method: "POST",
            url: "/Report/GetResourceReportsBetweenDates",
            headers: GetHeader(),
            data: { CompanyId: companyId, EmployeeIdArray: employeeIdArray, StartDate: startDate, EndDate: endDate },
        })
        return response;
    }

    this.GetResourceReportsBetweenDatesinSortedOrder = function (companyId, employeeIdArray, startDate, endDate, Order, Field) {
        debugger;
        var response = $http({
            method: "POST",
            url: "/Report/GetResourceReportsBetweenDatesinSortedOrder",
            headers: GetHeader(),
            data: { CompanyId: companyId, EmployeeIdArray: employeeIdArray, StartDate: startDate, EndDate: endDate, sortingOrder: Order, field: Field },
        })
        return response;
    }

    this.GetServiceReportsBetweenDates = function (companyId, employeeIdsString, startDate, endDate) {
        debugger;
        var response = $http({
            method: "POST",
            url: "/Report/GetServiceReportsBetweenDates",
            headers: GetHeader(),
            data: { CompanyId: companyId, commaSeperatedServiceIds: employeeIdsString, StartDate: startDate, EndDate: endDate },
        })
        return response;
    }

    this.GetServiceReportsBetweenDatesByOrder = function (companyId, employeeIdsString, startDate, endDate, Order, field) {
        debugger;
        var response = $http({
            method: "POST",
            url: "/Report/GetServiceReportsBetweenDatesByOrder",
            headers: GetHeader(),
            data: { CompanyId: companyId, commaSeperatedServiceIds: employeeIdsString, StartDate: startDate, EndDate: endDate, sortingOrder: Order, Field: field },
        })
        return response;
    }

    this.GetCustomerReportsBetweenDates = function (companyId, customerIdsString, startDate, endDate) {
        var response = $http({
            method: "POST",
            url: "/Report/GetCustomerReportsBetweenDates",
            headers: GetHeader(),
            data: { CompanyId: companyId, commaSeperatedCustomerIds: customerIdsString, StartDate: startDate, EndDate: endDate },
        })
        return response;
    }

    this.GetBookingsForEmployeesByIdBetweenDates = function (companyId, EmployeeIds, startDate, endDate) {
        var response = $http({
            method: "POST",
            url: "/Calendar/GetBookingsForEmployeesByIdBetweenDates",
            headers: GetHeader(),
            data: { CompanyId: companyId, commaSeperatedEmployeeIds: EmployeeIds, StartDate: startDate, EndDate: endDate },
        })
        return response;
    }

    this.GetCustomerReportsBetweenDatesByOrder = function (companyId, customerIdsString, startDate, endDate, Order, field) {
        debugger;
        var response = $http({
            method: "POST",
            url: "/Report/GetCustomerReportsBetweenDatesByOrder",
            headers: GetHeader(),
            data: { CompanyId: companyId, commaSeperatedCustomerIds: customerIdsString, StartDate: startDate, EndDate: endDate, sortingOrder: Order, Field: field },
        })
        return response;
    }

    this.GetSearchCustomer = function (companyId, searchterm) {
        var response = $http({
            method: "POST",
            url: "/Calendar/SearchCustomersByTerm",
            headers: GetHeader(),
            data:{CompanyId:companyId,searchTerm:searchterm}
        })
        return response;
    }

    this.SetCompanyWorkingHours=function(dataobject)
    {
        var response = $http({
            method: "POST",
            url: "/Calendar/SetCompanyWorkingHours",
            headers: GetHeader(),
            data: { dataobj: dataobject }
        })
        return response;
    }

})



