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
                $scope.secondStep = false;
                $scope.firstStep = true;
                $scope.thirdStep = true;
                $scope.fourthStep = true;
                $scope.staffName = '';
                $scope.staffEmail = '';
                $scope.divAccount = false;
                $scope.IsVisible = true;
                $timeout(function () { $scope.MessageText = "Data saved."; $timeout(function () { $scope.IsVisible = false; }, 1000) }, 500);
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
        angular.forEach($scope.businessHourInfo, function (value, key) {

            if (value.available == true) {
                IsAllOff = false;
                DayName = value.day;
                StartTime = value.timeFrom;
                EndTime = value.timeTo;
                dateTimeVal = new Date();

            }

        });
        StartTime = StartTime.split(":");
        EndTime = EndTime.split(":");
        var businessInfo = {
            Url: "api/companyregistration/SetWorkingHours",
            ReqWorkingHours: {
                Id: $scope.selectedIndustry,
                CompanyId: $scope.companyId,
                Start: StartTime[0] + ":00:00.1234567",
                End: EndTime[0] + ":00:00.1234567",
                NameOfDay: DayName,
                IsOffAllDay: IsAllOff,
                CreationDate: dateTimeVal,
            }
        };

        var getDataHour = bookingService.WorkingHours(businessInfo);
        debugger;
        getDataHour.then(function (msg) {
            debugger;
            if (msg.data.Success == true) {
                $scope.MessageText = "Saving Data"
                $scope.msg = "Post Data Submitted Successfully!";
                $scope.firstStep = true;
                $scope.secondStep = true;
                $scope.thirdStep = false;
                $scope.fourthStep = true;
                $scope.IsVisible = true;
                $timeout(function () { $scope.MessageText = "Data saved."; $timeout(function () { $scope.IsVisible = false; }, 1000) }, 500);
            }
        }, function () {
            alert('Error in updating record');
        });

    }

    $scope.addStaff = function () {
        debugger;
        var StaffInformation = {
            Url: "api/companyregistration/AddStaff",
            ReqStaffData: {
                Id: $scope.selectedIndustry,
                CompanyId: $scope.companyId,
                UserName: "sample string 3",
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

                $scope.firstStep = true;
                $scope.secondStep = true;
                $scope.thirdStep = true;
                $scope.fourthStep = false;
                $scope.IsVisible = true;
                $timeout(function () { $scope.MessageText = "Data saved."; $timeout(function () { $scope.IsVisible = false; }, 1000) }, 500);
            }
        }, function () {
            alert('Error in updating record');
        });
    }
    $scope.addServices = function () {
        $scope.firstStep = true;
        $scope.secondStep = true;
        $scope.thirdStep = true;
        $scope.fourthStep = false;
    }
    $scope.backSecondStep = function () {
        $scope.firstStep = false;
        $scope.secondStep = true;
        $scope.thirdStep = true;
        $scope.fourthStep = true;
    }
    $scope.backThirdStep = function () {
        $scope.firstStep = true;
        $scope.secondStep = false;
        $scope.thirdStep = true;
        $scope.fourthStep = true;
    }
    $scope.backFourthStep = function () {
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
        debugger;
        // $scope.init();
        $scope.showStaffBinded[index] = !$scope.showStaffBinded[index];
    }
    $scope.staffInfo = [
             {
                 'staffName': 'David',
                 'staffEmail': 'bookingmanager18@gmail.com',

             },
             {
                 'staffName': 'John',
                 'staffEmail': 'bookingmanager18@gmail.com',

             },

    ];
    $scope.sampleService = "";
    $scope.serviceTime = "";
    $scope.servicePrice = "";

    $scope.serviceInfo = [
            {
                'serviceName': 'Web Design',
                'time': '60 min',
                'price': '£20',
                'staff': $scope.staffInfoCopy,
            },

    ];

    $scope.addStaffItem = function () {
        debugger;

        $scope.staffInfo.push({ 'staffName': $scope.staffName, 'staffEmail': $scope.staffEmail });
        $scope.staffName = '';
        $scope.staffEmail = '';
    };
    $scope.HasPassport = false;
    $scope.toggleSelection = function staffChange(item) {
        debugger;
    }
    $scope.getSelected = function (item) {
        debugger;

    }
    $scope.removeRow = function (name) {
        debugger;
        var index = -1;
        var comArr = eval($scope.staffInfo);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].staffName === name) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            alert("Something gone wrong");
        }
        $scope.staffInfo.splice(index, 1);
    };

    $scope.addServiceItem = function () {
        debugger;
        $scope.staffInfoCopy = angular.copy($scope.staffInfo);
        $scope.serviceInfo.push({ 'serviceName': $scope.sampleService, 'time': $scope.serviceTime, 'price': $scope.servicePrice, 'staff': $scope.staffInfoCopy, });
        $scope.staffName = '';
        $scope.staffEmail = '';
        $scope.showStaff = true;
        $scope.init();
    };
    $scope.removeServiceRow = function (name) {
        debugger;
        var index = -1;
        var comArr = eval($scope.serviceInfo);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].serviceName === name) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            alert("Something gone wrong");
        }
        $scope.serviceInfo.splice(index, 1);
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
                else {
                    value.available = false;
                }
            }
        });

    }
}]);
