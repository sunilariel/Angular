var app = angular.module('bookingApp', [])
app.controller('bookingController', function ($scope, bookingService) {

    $scope.businessName = "";
    $scope.businessIndustry = [{ name: 'Hair Salon/Barbershop', id: 1 }, { name: 'Nail Salon', id: 2 }, { name: 'Computers/Technology/IT', id: 3 }, { name: 'Spa/Massage/Waxing', id: 4 }];
    $scope.businessPhone = "";
    $scope.selectedIndustry = "";//$scope.businessIndustry[0].name;
    $scope.firstStep = false;
    $scope.secondStep = true;
    $scope.thirdStep = true;
    $scope.fourthStep = true;
    $scope.showStaff = true;
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
        };

        // Account.Id = $scope.employeeId;
        // var getData = bookingService.addBookingInfo(businessInfo);
        debugger;
        $scope.secondStep = false;
        $scope.firstStep = true;
        $scope.thirdStep = true;
        $scope.fourthStep = true;
        $scope.staffName = '';
        $scope.staffEmail = '';

        //getData.then(function (msg) {
        //    debugger;
        //    alert(msg.success);
        //    $scope.divAccount = false;
        //}, function () {
        //    alert('Error in updating record');
        //});

    }
    $scope.setUpBusiness = function () {
        $scope.firstStep = true;
        $scope.secondStep = true;
        $scope.thirdStep = false;
        $scope.fourthStep = true;
    }
    $scope.addStaff = function () {
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
        $scope.showStaff = !$scope.showStaff;
    }
    $scope.showDropDownBinded = function (index) {
        debugger;
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
                'staff': $scope.staffInfo,
            },

    ];
    //$scope.confirmed = false;
    $scope.addStaffItem = function () {
        debugger;

        $scope.staffInfo.push({ 'staffName': $scope.staffName, 'staffEmail': $scope.staffEmail });

        $scope.staffName = '';
        $scope.staffEmail = '';
    };
    $scope.toggleSelection = function staffChange(item) {
        debugger;
        var checkconf = $scope.confirmed;
        item['confirmed'] = checkconf;

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

        $scope.serviceInfo.push({ 'serviceName': $scope.sampleService, 'time': $scope.serviceTime, 'price': $scope.servicePrice, 'staff': $scope.staffInfo, });
        $scope.staffName = '';
        $scope.staffEmail = '';
    };
    $scope.removeServiceRow = function (name) {
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
});
app.service("bookingService", function ($http) {
    this.addBookingInfo = function (businessInfo) {
        debugger;
        var response = $http({
            method: "post",
            url: "http://romzbookingmanager.azurewebsites.net/api/companyregistration/CreateAccount",
            params: businessInfo
        });
        return response;
    }
    this.setUpBusinessHr = function (businessInfo) {
        debugger;
        var response = $http({
            method: "post",
            url: "http://romzbookingmanager.azurewebsites.net/api/companyregistration/CreateAccount",
            params: businessInfo
        });
        return response;
    }
    this.addStaff = function (businessInfo) {
        debugger;
        var response = $http({
            method: "post",
            url: "http://romzbookingmanager.azurewebsites.net/api/companyregistration/CreateAccount",
            params: businessInfo
        });
        return response;
    }
    this.addServices = function (businessInfo) {
        debugger;
        var response = $http({
            method: "post",
            url: "http://romzbookingmanager.azurewebsites.net/api/companyregistration/CreateAccount",
            params: businessInfo
        });
        return response;
    }
})