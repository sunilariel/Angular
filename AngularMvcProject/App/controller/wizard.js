var app = angular.module('bookingApp', [])
app.controller('bookingController', ['$scope', '$http', '$timeout', 'bookingService', function ($scope, $http, $timeout, bookingService) {

    $scope.businessName = "";
    $scope.businessIndustry = [{ name: 'Hair Salon/Barbershop', id: 1 }, { name: 'Nail Salon', id: 2 }, { name: 'Computers/Technology/IT', id: 3 }, { name: 'Spa/Massage/Waxing', id: 4 }];
    $scope.businessPhone = "";
    $scope.selectedIndustry = "";//$scope.businessIndustry[0].name;
    $scope.firstStep = false;
    $scope.secondStep = true;
    $scope.thirdStep = true;
    $scope.fourthStep = true;
    $scope.showStaff = true;
    $scope.selectFrom = [];
    $scope.selectTo = [];
    $scope.IsVisible = false;
   

    var checki1active = angular.element(document.querySelector('#i1'));
    var checki2active = angular.element(document.querySelector('#i2'));
    var checki3active = angular.element(document.querySelector('#i3'));
    var checki4active = angular.element(document.querySelector('#i4'));
    checki1active.css("display", "none");
    checki2active.css("display", "none");
    checki3active.css("display", "none");
    checki4active.css("display", "none");


    $scope.showStaffBinded = [];
    $scope.init = function () {
        debugger;
        var count = $scope.serviceInfo.length;
        for (var i = 0; i < count; i++) {
            $scope.showStaffBinded[i] = true;
        }
      
    };
   
   
    $scope.submitInfo = function () {
        debugger;
        
        
        var businessInfo = {
            Url: "api/companyregistration/CreateAccount",
            RequestData: {
                Id: $scope.selectedIndustry,
                Name: $scope.businessName,
                Address: "sample string 3",
                Email: "sample string 4",
                Telephone: $scope.businessPhone,
                PostCode: "sample string 6",
                Website: "sample string 7",
                County: "sample string 8",
                Town: "sample string 9",
                Description: "sample string 10",
                Password: "sample string 11",
                CreationDate: "2017-05-24T07:20:31.1744476+00:00"
            }
        };


        var getData = bookingService.register(businessInfo);
        debugger;
        getData.then(function (msg) {
            debugger;
            if (msg.data.Success == true) {
                $scope.MessageText = "Saving Data"
                $scope.companyId = msg.data.ReturnObject.CompanyId;
                $scope.msg = "Post Data Submitted Successfully!";
                                             
                $scope.staffName = '';
                $scope.staffEmail = '';
                $scope.divAccount = false;
                $scope.IsVisible = true;

                $timeout(function () {
                    $scope.MessageText = "Data saved."; $timeout(function () {
                        $scope.IsVisible = false;

                        var activediv = angular.element(document.querySelector('#divstep2'));
                        activediv.addClass('before_div');
                        activediv.addClass('active_div');

                        var activetab = angular.element(document.querySelector('#step2'));
                        activetab.addClass('btn-primary');

                        var span1 = angular.element(document.querySelector('#span1'));
                        span1.css("display", "none");
                        checki1active.css("display", "");

                        $scope.secondStep = false;
                        $scope.firstStep = true;
                        $scope.thirdStep = true;
                        $scope.fourthStep = true;
                    }, 1000)
                }, 500);
                
            }
        }, function () {
            alert('Error in updating record');
        });

       
    }
    $scope.timeInfoFrom = ["08:00 am", "09:00 am", "10:00 am", "11:00 am", "12:00 pm", "13:00 pm", "14:00 pm", "15:00 pm", "16:00 pm", "17:00 pm", "18:00 pm", "19:00 pm", "20:00 pm"];
    $scope.timeInfoTo = ["08:00 am", "09:00 am", "10:00 am", "11:00 am", "12:00 pm", "13:00 pm", "14:00 pm", "15:00 pm", "16:00 pm", "17:00 pm", "18:00 pm", "19:00 pm", "20:00 pm"];
    $scope.businessHourInfo = [{ 'day': 'Monday', 'timeFrom': "", 'timeTo': "", 'available': true },
    { 'day': 'Tuesday', 'timeFrom': "", 'timeTo': "", 'available': false },
    { 'day': 'Wednesday', 'timeFrom': "", 'timeTo': "", 'available': false },
    { 'day': 'Thursday', 'timeFrom': "", 'timeTo': "", 'available': false },
    { 'day': 'Friday', 'timeFrom': "", 'timeTo': "", 'available': false },
    { 'day': 'Saturday', 'timeFrom': "", 'timeTo': "", 'available': false },
    { 'day': 'Sunday', 'timeFrom': "", 'timeTo': "", 'available': false }, ]
    $scope.setUpBusiness = function () {
        debugger;
        var selectedVal = $scope.businessHourInfo.timeFrom;
        var IsAllOff = true;
        var StartTime = "";
        var EndTime = "";
        var DayName = "";
        var dateTimeVal = "";
        var daysArr = [];
        var singleDay = {};      
        angular.forEach($scope.businessHourInfo, function (value, key) {

            if (value.available == true) {
                var fromtime = value.timeFrom.split(":");
                var totime = value.timeTo.split(":");
                singleDay={
                   
                    Id: $scope.selectedIndustry,
                    CompanyId: $scope.companyId,
                    Start: fromtime[0]+":00:00.1234567",
                    End: totime[0] + ":00:00.1234567",                  
                    NameOfDay: value.day,
                    IsOffAllDay: true,
                    //CreationDate: "2017-06-05T05:20:32.2919738+00:00",
                    CreationDate: new Date(),
                }
                daysArr.push(singleDay);
            }      
        });

        var businessInfo = {
            Url: "api/companyregistration/SetWorkingHoursForWeek",         
             ReqWorkingHours: daysArr
           
        };

        var getDataHour = bookingService.WorkingHours(businessInfo);
              
        getDataHour.then(function (msg) {
            debugger;
            if (msg.data.Success == true) {
                $scope.MessageText = "Saving Data"
                $scope.msg = "Post Data Submitted Successfully!";
                
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.MessageText = "Data saved."; $timeout(function () {
                        $scope.IsVisible = false;

                        var activediv = angular.element(document.querySelector('#divstep3'));
                        activediv.addClass('before_div');
                        activediv.addClass('active_div');
                        var activetab = angular.element(document.querySelector('#step3'));
                        activetab.addClass('btn-primary');


                        var span = angular.element(document.querySelector('#span2'));
                        span.css("display", "none");
                        checki2active.css("display", "");

                        $scope.firstStep = true;
                        $scope.secondStep = true;
                        $scope.thirdStep = false;
                        $scope.fourthStep = true;
                    }, 1000)
                }, 500);
            }
        }, function () {
            alert('Error in updating record');
        });

    }

    $scope.addStaff = function () {
        debugger;
        var activediv = angular.element(document.querySelector('#divstep4'));
        activediv.addClass('before_div');
        activediv.addClass('active_div');
        var activetab = angular.element(document.querySelector('#step4'));
        activetab.addClass('btn-primary');

        var span = angular.element(document.querySelector('#span3'));
        span.css("display", "none");
        checki3active.css("display", "");

        $scope.firstStep = true;
        $scope.secondStep = true;
        $scope.thirdStep = true;
        $scope.fourthStep = false;
    }
    $scope.addServices = function () {

        $scope.firstStep = true;
        $scope.secondStep = true;
        $scope.thirdStep = true;
        $scope.fourthStep = false;       
    }
    $scope.backSecondStep = function () {

        var activediv = angular.element(document.querySelector('#divstep2'));
        activediv.removeClass('before_div');
        activediv.removeClass('active_div');
        var activetab = angular.element(document.querySelector('#step2'));
        activetab.removeClass('btn-primary');

        checki1active.css("display", "none");
        var span = angular.element(document.querySelector('#span1'));
        span.css("display", "");

        $scope.firstStep = false;
        $scope.secondStep = true;
        $scope.thirdStep = true;
        $scope.fourthStep = true;
    }
    $scope.backThirdStep = function () {
        var activediv = angular.element(document.querySelector('#divstep3'));
        activediv.removeClass('before_div');
        activediv.removeClass('active_div');

        var activetab = angular.element(document.querySelector('#step3'));
        activetab.removeClass('btn-primary');

        checki2active.css("display", "none");
        var span = angular.element(document.querySelector('#span2'));
        span.css("display", "");

        $scope.firstStep = true;
        $scope.secondStep = false;
        $scope.thirdStep = true;
        $scope.fourthStep = true;
    }
    $scope.backFourthStep = function () {

        var activediv = angular.element(document.querySelector('#divstep4'));
        activediv.removeClass('before_div');
        activediv.removeClass('active_div');
        var activetab = angular.element(document.querySelector('#step4'));
        activetab.removeClass('btn-primary');
       
        checki3active.css("display", "none");
        var span = angular.element(document.querySelector('#span3'));
        span.css("display", "");


        $scope.firstStep = true;
        $scope.secondStep = true;
        $scope.thirdStep = false;
        $scope.fourthStep = true;
    }
    $scope.showDropDown = function () {
        debugger;
        $scope.init();
        $scope.showStaff = !$scope.showStaff;
    }
    $scope.showDropDownBinded = function (index) {    
        $scope.showStaffBinded[index] = !$scope.showStaffBinded[index];
    }
    $scope.staffInfo = [];
    $scope.sampleService = "";
    $scope.serviceTime = "";
    $scope.servicePrice = "";

    $scope.service = [];

    $scope.serviceInfo = [
            {              
            //    'serviceName': 'Web Design',
            //    'time': '60 min',
            //    'price': '£20',
            //    'staff': $scope.staffInfoCopy,
            },

    ];

    $scope.addStaffItem = function () {        
        var StaffInformation = {
            Url: "api/companyregistration/AddStaff",
            ReqStaffData: {
                Id: $scope.selectedIndustry,
                CompanyId: $scope.companyId,
                UserName: $scope.staffEmail,
                Password: "sample string 4",
                FirstName: $scope.staffName,
                LastName: "sample string 5",
                Address: "sample string 6",
                Email: $scope.staffEmail,
                TelephoneNo: "sample string 7",
                CreationDate: "2017-05-31T06:08:49.5008702+00:00",
            }
        };
        var getstaffdata = bookingService.staffInformation(StaffInformation);

        getstaffdata.then(function (msg) {
            debugger;
            if (msg.data.Success == true) {
                $scope.MessageText = "Saving Data"
                $scope.msg = "Post Data Submitted Successfully!";

                var CompanyId = $scope.companyId;
                var getEmployeesData = bookingService.GetStaffData(CompanyId);

               
                getEmployeesData.then(function (response) {
                    debugger;
                    $scope.staffInfo = [];
                    for (var i = 0; i < response.data.length; i++) {
                        $scope.staffInfo.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'UserName': response.data[i].UserName, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email });
                    }
                    $scope.staffName = '';
                    $scope.staffEmail = '';
                });
              
                $scope.IsVisible = true;
                $timeout(function () { $scope.MessageText = "Data saved."; $timeout(function () { $scope.IsVisible = false; }, 1000) }, 500);
            }
        }, function () {
            alert('Error in updating record');
        });        
    };

    $scope.HasPassport = false;
    $scope.toggleAllSelection = function staffChange() {
        debugger;
        if ($scope.allstaffchecked == true) {
            angular.forEach($scope.staffInfo, function (value, key) {               
                value.confirmed = true;
            });
        }
        else {
            angular.forEach($scope.staffInfo, function (value,key) {
                value.confirmed = false;
            });
        }

       
        $scope.toggleSelection=function staffchecked()
        {
           
            for (var i = 0; i < $scope.staffInfo.length; i++) {
                if($scope.staffInfo[i].confirmed==false)
                {
                    $scope.allstaffchecked = false;
                    break;
                }
                else {
                    $scope.allstaffchecked = true;
                }
            }
        }
       // $scope.EmployeeId = item.Id;
      
    }
    $scope.getSelected = function (item) {
        debugger;
      
    }
    $scope.removeRow = function (Id) {
        debugger;
        var removestaffmember = bookingService.DeleteStaff(Id);
        removestaffmember.then(function (response) {
            $scope.MessageText = "Deleting Data"
            $scope.msg = "Data Deleted Successfully!";

            var CompanyId = $scope.companyId;
            var getEmployeesData = bookingService.GetStaffData(CompanyId);

            getEmployeesData.then(function (response) {
                debugger;
                $scope.staffInfo = [];
                for (var i = 0; i < response.data.length; i++) {
                    $scope.staffInfo.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'UserName': response.data[i].UserName, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email });
                }
                $scope.staffName = '';
                $scope.staffEmail = '';
            });

            $timeout(function () { $scope.MessageText = "Data deleted."; $timeout(function () { $scope.IsVisible = false; }, 1000) }, 500);

        }),function()
        {
            alert('Error in updating record');
        }
    
    };


    $scope.addServiceItem = function () {
        debugger;
        $scope.staffInfoCopy = angular.copy($scope.staffInfo);
        // $scope.serviceInfo.push({ 'serviceName': $scope.sampleService, 'time': $scope.serviceTime, 'price': $scope.servicePrice, 'staff': $scope.staffInfoCopy, });
        var cost = $scope.servicePrice;
        //if (cost != "") {
        //    cost = cost.split(".");
        //}
        var time = $scope.serviceTime;
        //if (time != "") {
        //    time = time.split(" ");
        //}
        var dateTimeVal = new Date();
        var ServiceData = {
            Url: "api/companyregistration/AddService",
            RequestAddService: {
                Id: $scope.selectedIndustry,
                CompanyId: $scope.companyId,
                Name: $scope.sampleService,
                CategoryName: " ",
                CategoryId: 0,
                DurationInMinutes: "sample string 5",
                DurationInHours: time,
                Cost: cost,
                Currency: "sample string 7",
                CreationDate: dateTimeVal,
            }
        };
        var serviceResponse = bookingService.AddService(ServiceData);
        serviceResponse.then(function (msg) {
            debugger;
            if (msg.data.Success == true) {
                $scope.MessageText = "Saving Data"
                $scope.msg = "Post Data Submitted Successfully!";


                $scope.IsVisible = true;
                angular.forEach($scope.staffInfo, function (value, key) {
                    debugger;
                    if (value.confirmed == true) {
                        var assignData = {
                            Url: "api/companyregistration/AssignServiceToStaff",
                            RequestAssignService: {
                                Id: 1,
                                CompanyId: $scope.companyId,
                                EmployeeId: value.Id,
                                ServiceId: msg.data.ReturnObject.ServiceId,
                                CreationDate: dateTimeVal
                            }
                        }
                        var assignStaff = bookingService.assignStaffToService(assignData);

                        assignStaff.then(function (response) {
                            //$scope.MessageText = "Saving Data"
                            //$scope.msg = "Post Data Submitted Successfully!";                          
                        });
                       
                    }
                });

                var getServices = bookingService.getServicesData($scope.companyId);
                getServices.then(function (response) {
                    debugger;
                    $scope.serviceInfo = [];
                    for (var i = 0; i < response.data.length; i++) {
                        $scope.serviceInfo.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'serviceName': response.data[i].Name, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email, 'DurationInMinutes': response.data[i].DurationInMinutes, 'time': response.data[i].DurationInHours, 'Currency': response.data[i].Currency, 'price': response.data[i].Cost, 'CreationDate': response.data[i].CreationDate, 'staff': response.data[i].staff });
                    }
                    $scope.init();
                });

        $timeout(function () { $scope.MessageText = "Data saved."; $timeout(function () { $scope.IsVisible = false; }, 1000) }, 500);
            }
        }, function () {
            alert('Error in updating record');
        });

        $scope.staffName = '';
        $scope.staffEmail = '';
        $scope.showStaff = true;
        

    };
    $scope.removeServiceRow = function (id) {
        debugger;      
        var removeservicemember = bookingService.DeleteService(id);
        removeservicemember.then(function (response) {
            $scope.MessageText = "Deleting Data"
            $scope.msg = "Data Deleted Successfully!";

            var CompanyId = $scope.companyId;
            var getServiceData = bookingService.getServicesData(CompanyId);

            getServiceData.then(function (response) {
                debugger;
                $scope.serviceInfo = [];
                for (var i = 0; i < response.data.length; i++) {
                    $scope.serviceInfo.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'serviceName': response.data[i].Name, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email, 'DurationInMinutes': response.data[i].DurationInMinutes, 'time': response.data[i].DurationInHours, 'Currency': response.data[i].Currency, 'price': response.data[i].Cost, 'CreationDate': response.data[i].CreationDate, });
                }
                $scope.init();
                $scope.staffName = '';
                $scope.staffEmail = '';
            });

            $timeout(function () { $scope.MessageText = "Data deleted."; $timeout(function () { $scope.IsVisible = false; }, 1000) }, 500);

        }), function () {
            alert('Error in updating record');
        }

    };
    $scope.switchOnOff = function (item) {
        debugger;
        angular.forEach($scope.businessHourInfo, function (value, key) {
            debugger; if (item.day != "Sunday" && item.day != "Saturday") {
                if (item.day == value.day) {
                    if (item['available'] == true) {
                        value.available = false;
                    }
                    else {
                        value.available = true;
                    }
                }
               
            }
        });

    }
}]);
