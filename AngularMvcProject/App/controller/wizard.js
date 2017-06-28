
app.controller('bookingController', ['$scope', '$routeParams', '$rootScope', '$http', '$timeout', '$location', 'bookingService', function ($scope, $routeParams, $rootScope, $http, $timeout, $location, bookingService) {

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

    var firstregistration = false;
   
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
       
        $scope.IsVisible = false;
        var count = $scope.serviceInfo.length;
        for (var i = 0; i < count; i++) {
            $scope.showStaffBinded[i] = true;
        }
        angular.forEach($scope.staffInfo, function (value, key) {
            value.confirmed = false;
        });
        $scope.allstaffchecked = false;
        
    };

    //Redirection to dashboard on next btn of step-4
    $scope.redirecttodashboard= function ()
    {      
        $location.path("/dashboard/" + $scope.companyId);
    }
   
    //Submit buisness information of step-1//
    $scope.submitInfo = function (form) {
        //To check whether from is valid or not  and highlight the resp element by set its touched event.
        if (form.$invalid == true) {
            if (form.buisnessName.$invalid == true) {
                form.buisnessName.$setTouched();
                form.buisnessName.$touched = true;
            }
            if (form.Industry.$invalid == true) {
                form.Industry.$setTouched();
                form.Industry.$touched = true;
            }
            if (form.buisnessPhone.$invalid = true) {
                form.buisnessPhone.$setTouched();
                form.buisnessPhone.$touched = true;
            }
            return false;
        }

        //Check whether we are going from step-1 to step-2 in wizard firts time it register the buisness information and on other redirection from step-2 to step-1 viceversa it do nothing(just redirection).
        if (firstregistration != true) {
            debugger;
            var businessInfo = {
                Url: "api/companyregistration/CreateAccount",
                RequestData: {                  
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
                    $rootScope.GlobalCompanyId = msg.data.ReturnObject.CompanyId;
                 
                    $scope.msg = "Post Data Submitted Successfully!"
                    //on successful register buisness info i set firstregistration true
                    firstregistration = true;
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
        else {
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
        }
    };

    //Step-2(Buisness Hours)

    $scope.timeInfoFrom = ["08:00 am", "09:00 am", "10:00 am", "11:00 am", "12:00 pm", "13:00 pm", "14:00 pm", "15:00 pm", "16:00 pm", "17:00 pm", "18:00 pm", "19:00 pm", "20:00 pm"];
    $scope.timeInfoTo = ["08:00 am", "09:00 am", "10:00 am", "11:00 am", "12:00 pm", "13:00 pm", "14:00 pm", "15:00 pm", "16:00 pm", "17:00 pm", "18:00 pm", "19:00 pm", "20:00 pm"];
    //$scope.timeInfoFrom = ["08:00 am", "09:00 am", "10:00 am", "11:00 am", "12:00 pm", "01:00 pm", "02:00 pm", "03:00 pm", "04:00 pm", "05:00 pm", "06:00 pm", "07:00 pm", "08:00 pm"];
    //$scope.timeInfoTo = ["05:00 pm", "06:00 pm", "07:00 pm", "08:00 pm", "09:00 pm", "10:00 pm", "11:00 pm", "12:00 pm", "01:00 am", "02:00 am", "03:00 am", "04:00 am", "05:00 am"]
    $scope.businessHourInfo = [{ 'day': 'Monday', 'timeFrom': "08:00 am", 'timeTo': "17:00 pm", 'available': true },
    { 'day': 'Tuesday', 'timeFrom': "08:00 am", 'timeTo': "17:00 pm", 'available': true },
    { 'day': 'Wednesday', 'timeFrom': "08:00 am", 'timeTo': "17:00 pm", 'available': true },
    { 'day': 'Thursday', 'timeFrom': "08:00 am", 'timeTo': "17:00 pm", 'available': true },
    { 'day': 'Friday', 'timeFrom': "08:00 am", 'timeTo': "17:00 pm", 'available': true },
    { 'day': 'Saturday', 'timeFrom': "08:00 am", 'timeTo': "17:00 pm", 'available': false },
    { 'day': 'Sunday', 'timeFrom': "08:00 am", 'timeTo': "17:00 pm", 'available': false }, ]

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
                singleDay = {

                    Id: $scope.selectedIndustry,
                    CompanyId: $scope.companyId,
                    Start: fromtime[0] + ":00:00.1234567",
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

    //Step-3 Add Staff

    //On click of next btn in set wizard steps active and mark it. 
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
    ///////////////Set wizard steps///////////


    $scope.showDropDown = function () {
        debugger;
        $scope.init();
        $scope.showStaff = !($scope.showStaff);
        event.stopPropagation();
    }


    //Window click to close the hide dropdown on click on document (Specially for step-4 Add Services)
    window.onclick = function ($event) {      
        if (angular.element(event.target.parentElement.parentElement)[0].classList.value != 'dropdown-menu') {

            if ($scope.showStaff == false) {
                debugger;
                $scope.showStaff = !($scope.showStaff);
                $scope.$apply();
            }
            var count = $scope.serviceInfo.length;
            for (var i = 0; i < count; i++) {
                $scope.showStaffBinded[i] = false;
                if ($scope.showStaffBinded[i] == false) {
                    debugger;
                    $scope.showStaffBinded[i] = !($scope.showStaffBinded[i]);
                    $scope.$apply();
                }
            }
        }       
    };

    //This is to hide the previous dropdown on click of other dropdown (data shown in services on top of add service)
    $scope.showDropDownBinded = function (index) {
        debugger;
        var count = $scope.serviceInfo.length;
        for (var i = 0; i < count; i++) {
            if (i != index) {
                $scope.showStaffBinded[i] = true;
            }
            else {
                $scope.showStaffBinded[i] = !$scope.showStaffBinded[i];
                $scope.showStaff = true;
            }
        }
    }
    //Initialize the Variables
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

    //Add staff in step-3
    $scope.addStaffItem = function (form) {

        if (form.$invalid == true)
        {
            if(form.staffName.$invalid==true)
            {
                form.staffName.$setTouched();
                form.staffName.$touched = true;
            }
            if (form.staffEmail.$invalid == true)
            {
                form.staffEmail.$setTouched();
                form.staffEmail.$touched = true;
            }
            return false;
        }
        
        var StaffInformation = {
            Url: "api/companyregistration/AddStaff",
            ReqStaffData: {
                Id: $scope.selectedIndustry,
                CompanyId: $scope.companyId,
                UserName: $scope.staffName,
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
                    var staffnametouched = angular.element(document.querySelector('#exampleInputName2'));
                    staffnametouched.removeClass('ng-touched');
                    var staffemailtouched = angular.element(document.querySelector('#exampleInputEmail2'));
                    staffemailtouched.removeClass('ng-touched');
                });

                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.MessageText = "Data saved."; $timeout(function () {
                        $scope.IsVisible = false;
                       
                    }, 1000)
                   
                }, 500);
            }
        }, function () {
            alert('Error in updating record');
        });      
    };

    //Edit Staff and update the staff on blur function. 
    $scope.EditStaff = function (EditStaff) {
        debugger;
        var EditStaffInformation = {
            Url: "api/staff/Update",
            ReqStaffData: {
                Id: EditStaff.Id,
                CompanyId: EditStaff.CompanyId,
                UserName: EditStaff.staffName,
                Password: "sample string 4",
                FirstName: EditStaff.staffName,
                LastName: "sample string 5",
                Address: "sample string 6",
                Email: EditStaff.staffEmail,
                TelephoneNo: "sample string 7",
                CreationDate: "2017-05-31T06:08:49.5008702+00:00",
            }
        };


        var geteditstaffdata = bookingService.EditStaffInformation(EditStaffInformation);


        geteditstaffdata.then(function (msg) {
            debugger;
            if (msg.data.Success == true) {
                $scope.MessageText = "Updating Staff..."
                $scope.msg = "Update Data Successfully!";

                var CompanyId = $scope.companyId;
                var getEmployeesData = bookingService.GetStaffData(CompanyId);


                getEmployeesData.then(function (response) {
                    debugger;
                    $scope.staffInfo = [];
                    for (var i = 0; i < response.data.length; i++) {
                        $scope.staffInfo.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'UserName': response.data[i].UserName, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email });
                    }
                  
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "Staff Saved!"; $timeout(function () {
                            $scope.IsVisible = false;
                        }, 1000)                      
                    }, 500);
                });               
            }
        }, function () {
            alert('Error in updating record');
        });
 }

    $scope.HasPassport = false;

    //this function run on click of all staff checked in below dropdown of step-4(on adding staff).
    $scope.toggleAllSelection = function staffChange(e) {
        debugger;
        if ($scope.allstaffchecked == true) {
            angular.forEach($scope.staffInfo, function (value, key) {
                value.confirmed = true;
            });
        }
        else {
            angular.forEach($scope.staffInfo, function (value, key) {
                value.confirmed = false;
            });
        }
    };

    //this function run when on select staff.If every staff is selected then we set allstaff checked true.(below dropdown in step-4)
    $scope.toggleSelection = function staffchecked() {
        debugger;
        for (var i = 0; i < $scope.staffInfo.length; i++) {
            if ($scope.staffInfo[i].confirmed == false || !$scope.staffInfo[i].hasOwnProperty("confirmed") || $scope.staffInfo[i].confirmed=="undefined") {
                $scope.allstaffchecked = false;

                break;
            }
            else {
                $scope.allstaffchecked = true;
            }
        }
    };

    //this function runs on select of allstaff to be true then it will checked each individual staff(above dropdown in step-4)
    $scope.togglealldataSelection = function (item) {
        debugger;
        if (item.AllStaffChecked == true) {
            for (var i = 0; i < item.staff.length; i++) {
                item.staff[i].confirmed = true;
            }
        }
        else {
            for (var i = 0; i < item.staff.length; i++) {
                item.staff[i].confirmed = false;
            }
        }
    };

    //Update the staff assigned to service.
    $scope.Updateallstaff=function(item)
    {
        //Check whether atleast on staff selected it it is not then it will show message and data wil not updated(Step-4 above dropdown)
        if (item.AllStaffChecked == false) {
            var count = item.staff.length;
            for (var i = 0; i < count; i++) {
                if (item.staff[i].confirmed == true) {
                    $scope.allconfirmed = true;
                    break;
                }
                else {
                    $scope.allconfirmed = false;
                }
            }
            if ($scope.allconfirmed == false) {
                $scope.MessageText = "At least one staff assigned"
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.IsVisible = false;
                }, 1000);

                var getServices = bookingService.getServicesData($scope.companyId);
                getServices.then(function (response) {
                    debugger;
                    $scope.serviceInfo = [];
                    for (var i = 0; i < response.data.length; i++) {
                        $scope.serviceInfo.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'serviceName': response.data[i].Name, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email, 'DurationInMinutes': response.data[i].DurationInMinutes, 'DurationInHours': response.data[i].DurationInHours, 'Currency': response.data[i].Currency, 'price': response.data[i].Cost, 'CreationDate': response.data[i].CreationDate, 'AllStaffChecked': response.data[i].AllAssignStaffChecked, 'staffCheckedCount': response.data[i].staffCheckedCount, 'staff': response.data[i].staff });
                    }
                });

                return false;
            }
        }

        //update the staff to service(Step-4 above dropdown)
        var dateTimeVal = new Date();
        angular.forEach(item.staff, function (value, key) {
                       
                    var assignData = {
                        Url: "api/companyregistration/AssignServiceToStaff",
                        RequestAssignService: {
                            Id: 1,
                            CompanyId: $scope.companyId,
                            EmployeeId: value.Id,
                            ServiceId: item.Id,
                            CreationDate: dateTimeVal
                        }
                    }
                    var assignStaff = bookingService.assignStaffToService(assignData);

                    assignStaff.then(function (response) {
                        $scope.MessageText = "Updating Service"
                        $scope.msg = "Updated Data  Successfully!";



                        var getServices = bookingService.getServicesData($scope.companyId);
                        getServices.then(function (response) {
                            debugger;
                            $scope.serviceInfo = [];
                            for (var i = 0; i < response.data.length; i++) {
                                $scope.serviceInfo.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'serviceName': response.data[i].Name, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email, 'DurationInMinutes': response.data[i].DurationInMinutes, 'DurationInHours': response.data[i].DurationInHours, 'Currency': response.data[i].Currency, 'price': response.data[i].Cost, 'CreationDate': response.data[i].CreationDate, 'AllStaffChecked': response.data[i].AllAssignStaffChecked, 'staffCheckedCount': response.data[i].staffCheckedCount, 'staff': response.data[i].staff });
                            }
                            $scope.init();
                            $scope.IsVisible = true;
                            $timeout(function () { $scope.MessageText = "service saved!"; $timeout(function () { $scope.IsVisible = false; }, 1000) }, 500);
                        });
                    });
          
        });
    }


    $scope.allstaffselection = function (item) {
        debugger;
        for (var i = 0; i < item.staff.length; i++) {
            if (item.staff[i].confirmed == false) {
                item.AllStaffChecked = false;
                break;
            }
            else {
                item.AllStaffChecked = true;
            }
        }
    };





    //Update service and assign staff to service(Step-4)
    $scope.toggledataSelection = function (item, selectedItemId,checkedstatus) {
        debugger;
       
        //Validation to one staff must be assigned to service.
        if (item.AllStaffChecked == false)
        {
            var count=item.staff.length;
            for(var i=0;i<count;i++) {
                if(item.staff[i].confirmed== true)
                {
                    $scope.allconfirmed=true;
                    break;
                }
                else
                {
                    $scope.allconfirmed=false;                  
                }
            }
            if ($scope.allconfirmed == false) {
                $scope.MessageText = "At least one staff assigned"
                $scope.IsVisible = true;
                $timeout(function () {               
                    $scope.IsVisible = false;
                }, 1000);

                var getServices = bookingService.getServicesData($scope.companyId);
                getServices.then(function (response) {
                    debugger;
                    $scope.serviceInfo = [];
                    for (var i = 0; i < response.data.length; i++) {
                        $scope.serviceInfo.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'serviceName': response.data[i].Name, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email, 'DurationInMinutes': response.data[i].DurationInMinutes, 'DurationInHours': response.data[i].DurationInHours, 'Currency': response.data[i].Currency, 'price': response.data[i].Cost, 'CreationDate': response.data[i].CreationDate, 'AllStaffChecked': response.data[i].AllAssignStaffChecked, 'staffCheckedCount': response.data[i].staffCheckedCount, 'staff': response.data[i].staff });
                    }
                });

                return false;
            }
        }


        var updateddate = new Date();
        var assignData = {
            Url: "api/companyregistration/AssignServiceToStaff",
            RequestAssignService: {
                Id: 1,
                CompanyId: item.CompanyId,
                EmployeeId: selectedItemId,
                ServiceId: item.Id,
                CreationDate: updateddate
            }
        }
        if (checkedstatus == true) {
            var assignStaff = bookingService.assignStaffToService(assignData);

            assignStaff.then(function (response) {
                $scope.MessageText = "Updating Service"
                $scope.msg = "Update Data Successfully!";

                var getServices = bookingService.getServicesData($scope.companyId);
                getServices.then(function (response) {
                    debugger;
                    $scope.serviceInfo = [];
                    for (var i = 0; i < response.data.length; i++) {
                        $scope.serviceInfo.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'serviceName': response.data[i].Name, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email, 'DurationInMinutes': response.data[i].DurationInMinutes, 'DurationInHours': response.data[i].DurationInHours, 'Currency': response.data[i].Currency, 'price': response.data[i].Cost, 'CreationDate': response.data[i].CreationDate, 'AllStaffChecked': response.data[i].AllAssignStaffChecked, 'staffCheckedCount': response.data[i].staffCheckedCount, 'staff': response.data[i].staff });
                    }

                    $scope.init();

                    $scope.IsVisible = true;

                    $timeout(function () {
                        $scope.MessageText = "service saved"; $timeout(function () {
                            $scope.IsVisible = false;
                        }, 1000)
                    }, 500);
                });
               
            });
        }
        else {
            var unassignstaffdata = {
                CompanyId: item.CompanyId,
                EmployeeId: selectedItemId,
                ServiceId: item.Id,
            }
            var deallocateemployee = bookingService.DeAllocateServiceForEmployee(unassignstaffdata);

            deallocateemployee.then(function (response) {
                $scope.messagetext = "Updating Service.."
                $scope.msg = " update data successfully!";      

                var getServices = bookingService.getServicesData($scope.companyId);
                getServices.then(function (response) {
                    debugger;
                    $scope.serviceInfo = [];
                    for (var i = 0; i < response.data.length; i++) {
                        $scope.serviceInfo.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'serviceName': response.data[i].Name, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email, 'DurationInMinutes': response.data[i].DurationInMinutes, 'DurationInHours': response.data[i].DurationInHours, 'Currency': response.data[i].Currency, 'price': response.data[i].Cost, 'CreationDate': response.data[i].CreationDate, 'AllStaffChecked': response.data[i].AllAssignStaffChecked, 'staffCheckedCount': response.data[i].staffCheckedCount, 'staff': response.data[i].staff });
                    }

                    $scope.init();
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "service saved"; $timeout(function () {
                            $scope.IsVisible = false;
                        }, 1000)
                    }, 500);
                });               
            });
        }
    };

    // $scope.EmployeeId = item.Id;       
    $scope.getSelected = function (item) {
        debugger;
    }

    //Delete the staff(in Step-3)
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
            });
            $scope.IsVisible = true;
            $timeout(function () { $scope.MessageText = "Data deleted."; $timeout(function () { $scope.IsVisible = false; }, 1000) }, 500);
        }), function () {
            alert('Error in updating record');
        }

    };

    //Add service and assign staff
    $scope.addServiceItem = function (form) {
        debugger;       
        if (form.$invalid == true)
        {
            if(form.sampleService.$invalid==true)
            {
                form.sampleService.$setTouched();
                form.sampleService.$touched = true;
            }
              if (form.serviceTime.$invalid == true) {
                form.serviceTime.$setTouched();
                form.serviceTime.$touched = true;
            }
             if (form.servicePrice.$invalid == true) {
                form.servicePrice.$setTouched();
                form.servicePrice.$touched = true;
            }
            return false;
        }

        var count = $("input[type='checkbox'].staffcheckbox").length;
        for (var i = 0; i < count ; i++) {
            if ($("input[type=checkbox].staffcheckbox")[i].checked == true) {
                $scope.allchecked = true;
                break;
            }
            else {
                $scope.allchecked = false;
            }
        }
        if ($scope.allchecked == false) {
            $scope.MessageText = "At least one staff assigned"
            $scope.IsVisible = true;
            $timeout(function () {               
                $scope.IsVisible = false;
            }, 1000);

            return false;
        }


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
                DurationInMinutes: time,
                DurationInHours: "hour",
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
                          
                            var getServices = bookingService.getServicesData($scope.companyId);
                            getServices.then(function (response) {
                                debugger;
                                $scope.serviceInfo = [];
                                for (var i = 0; i < response.data.length; i++) {
                                    $scope.serviceInfo.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'serviceName': response.data[i].Name, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email, 'DurationInMinutes': response.data[i].DurationInMinutes, 'DurationInHours': response.data[i].DurationInHours, 'Currency': response.data[i].Currency, 'price': response.data[i].Cost, 'CreationDate': response.data[i].CreationDate, 'AllStaffChecked': response.data[i].AllAssignStaffChecked, 'staffCheckedCount': response.data[i].staffCheckedCount, 'staff': response.data[i].staff });
                                   
                                }
                               
                                $scope.init();
                            });
                        });
                    }
                });
              
                $scope.sampleService = "";
                $scope.serviceTime = "";
                $scope.servicePrice = "";
                var sampleServicetouched = angular.element(document.querySelector('#sampleService'));
                sampleServicetouched.removeClass('ng-touched');
                var serviceTimetouched = angular.element(document.querySelector('#serviceTime'));
                serviceTimetouched.removeClass('ng-touched');
                var servicePricetouched = angular.element(document.querySelector('#servicePrice'));
                servicePricetouched.removeClass('ng-touched');
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.MessageText = "Data saved.";
                  
                    $timeout(function () { $scope.IsVisible = false; }, 1000)
                }, 500);
            }
            else {
                $scope.IsVisible = true;
                $timeout(function () { $scope.MessageText = "Service Already Exists"; $timeout(function () { $scope.IsVisible = false; }, 1000) }, 500);
            }
        }, function () {
            alert('Error in updating record');
        });

        //$scope.staffName = '';
        //$scope.staffEmail = '';
        $scope.showStaff = true;
    };
  
    //Updating Service
    $scope.EditService = function (EditService) {
        debugger;
        var Id = $scope.FirstName;
        var ServiceData = {
            Url: "api/services/UpdateService",
            RequestAddService: {
                Id: EditService.Id,
                CompanyId: EditService.CompanyId,
                Name: EditService.serviceName,
                CategoryName: " ",
                CategoryId: 0,
                DurationInMinutes: EditService.DurationInMinutes,
                DurationInHours: "sample string 5",
                Cost: EditService.price,
                Currency: "sample string 7",
                CreationDate: EditService.CreationDate,
            }
        };
        var editserviceResponse = bookingService.EditService(ServiceData);
        editserviceResponse.then(function (response) {
            $scope.MessageText = "Updating Service"
            $scope.msg = "Updated Data  Successfully!";

            var getServices = bookingService.getServicesData($scope.companyId);
            getServices.then(function (response) {
                debugger;
                $scope.serviceInfo = [];
                for (var i = 0; i < response.data.length; i++) {
                    $scope.serviceInfo.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'serviceName': response.data[i].Name, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email, 'DurationInMinutes': response.data[i].DurationInMinutes, 'DurationInHours': response.data[i].DurationInHours, 'Currency': response.data[i].Currency, 'price': response.data[i].Cost, 'CreationDate': response.data[i].CreationDate, 'AllStaffChecked': response.data[i].AllAssignStaffChecked, 'staffCheckedCount': response.data[i].staffCheckedCount, 'staff': response.data[i].staff });
                }
                $scope.init();
                $scope.IsVisible = true;
                $timeout(function () { $scope.MessageText = "service saved!"; $timeout(function () { $scope.IsVisible = false; }, 1000) }, 500);
            });         
        }, function () {
            alert("error in updating record");
        });
    };


    //Deleting Service.
    $scope.removeServiceRow = function (id) {
        debugger;
        var removeservicemember = bookingService.DeleteService(id);
        removeservicemember.then(function (response) {
            $scope.MessageText = "Deleting Service"
            $scope.msg = "Data Deleted Successfully!";

            var CompanyId = $scope.companyId;
            var getServiceData = bookingService.getServicesData(CompanyId);

            getServiceData.then(function (response) {
                debugger;
                $scope.serviceInfo = [];
                for (var i = 0; i < response.data.length; i++) {
                    $scope.serviceInfo.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'serviceName': response.data[i].Name, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email, 'DurationInMinutes': response.data[i].DurationInMinutes, 'DurationInHours': response.data[i].DurationInHours, 'Currency': response.data[i].Currency, 'price': response.data[i].Cost, 'CreationDate': response.data[i].CreationDate, 'AllStaffChecked': response.data[i].AllAssignStaffChecked, 'staffCheckedCount': response.data[i].staffCheckedCount, 'staff': response.data[i].staff });
                }
                $scope.init();             
            });
            $scope.IsVisible = true;
            $timeout(function () { $scope.MessageText = "Service deleted."; $timeout(function () { $scope.IsVisible = false; }, 1000) }, 500);
        }), function () {
            alert('Error in updating record');
        }

    };

    //Enable and disable set hours days and date in step-2
    $scope.switchOnOff = function (item) {
        debugger;
        angular.forEach($scope.businessHourInfo, function (value, key) {
            //debugger; if (item.day != "Sunday" && item.day != "Saturday") {
            {
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
