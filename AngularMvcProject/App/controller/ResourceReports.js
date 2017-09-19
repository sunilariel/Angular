app.controller("ResourceReportsController", ['$scope', '$location', 'bookingService', '$routeParams', function ($scope, $location, bookingService, $routeParams) {

    //Redirection to different tab section//
    $scope.RedirecttoBuisnessReport = function () {
        debugger;
        $location.path("/BuisnessReports/" + $routeParams.CompanyId);
    }
    $scope.RedirecttoResourceReport = function () {
        $location.path("/ResourceReports/" + $routeParams.CompanyId);
    }
    $scope.RedirecttoServiceReport = function () {
        $location.path("/ServiceReports/" + $routeParams.CompanyId);
    }
    $scope.RedirecttoCustomerReport = function () {
        $location.path("/CustomerReports/" + $routeParams.CompanyId);
    }
    $scope.redirecttoCustomer = function () {
        $location.path("/customer/" + $routeParams.CompanyId);
    }

    $scope.redirectToCalendar = function () {

        $location.path("/Calendar/" + $routeParams.CompanyId);
    }
    $scope.redirecttodashboard = function () {
        $location.path("/dashboard/" + $routeParams.CompanyId);
    }
    $scope.RedirecttoStaff = function () {
        $location.path("/Setting/" + $routeParams.CompanyId);
    }

    $scope.RedirecttoReport = function () {
        $location.path("/BuisnessReports/" + $routeParams.CompanyId);
    }

    $scope.init = function () {
        debugger;
        $scope.toggle = false;
        var ReportCount = false;
        $scope.ResourcerReportsloader = true;
        $scope.Resources = [];
        $scope.ResourceTimeFrame = false;
        $scope.Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        $scope.Years = ["2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017","2018","2019","2020","2021","2022"];
        $scope.Date = [];
        for (var i = 1; i <= 31; i++) {
            $scope.Date.push(i);

        }
        $scope.sortType = 'Bookings';
        $scope.sortreverse = false;
          $scope.AllResources = "";
          $scope.time = "thismonth";
          $scope.ResourcesList = "";
          var date = new Date();
          var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
          var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

          $scope.StartDate = firstDay;
          $scope.EndDate = lastDay;
        //Get All Staff for bind it to dropdown in reports//
        var GetStaffProvider = bookingService.GetStaffData($routeParams.CompanyId);
        GetStaffProvider.then(function (response) {
          
            for (var i = 0; i < response.data.length; i++) {
                $scope.Resources.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'UserName': response.data[i].UserName, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email });              
            }
            $scope.SelectedResource = (response.data[0].Id).toString();
            var apirequest = bookingService.GetResourceReportsBetweenDates($routeParams.CompanyId, $scope.Resources[0].Id, $scope.StartDate, $scope.EndDate);
            apirequest.then(function (response) {               
                $scope.ResourceReport = [];
                angular.forEach(response.data, function (value, key) {
                    ReportCount = true;
                    $scope.ResourceReport.push({ "Resource": value.Employee.FirstName, "Bookings": value.TotalBookingsAssigned, "Revenue": "£"+value.TotalRevenue, "Duration": value.DurationInHours, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%", "Tasks": value.TotalBookingsCompleted })
                })
                if (ReportCount == false) {
                    $scope.ResourceReport.push({ "Resource": "", "Bookings": "", "Revenue": "", "Duration": "No Records to display", "Cancellations": "", "CancellationRate": "", "Tasks": "" })
                }
                $scope.ResourcerReportsloader = false;
            })
        });

        //On it display records on monthly time frame//
        $scope.SelectedStartMonth = $scope.Months[date.getMonth()];
        $scope.SelectedStartYear = date.getFullYear().toString();
        $scope.SelectedStartDate = date.getDate().toString();

        $scope.SelectedEndMonth = $scope.Months[date.getMonth()];
        $scope.SelectedEndYear = date.getFullYear().toString();
        $scope.SelectedEndDate = (date.getDate() + 15).toString();
    
    }

    $scope.GetTimeFrame = function (TimeFrame) {
        debugger;
        $scope.ResourceReport = [];
        $scope.ResourcerReportsloader = true;
        var ReportCount = false;
        if (TimeFrame == "today") {
            $scope.ResourceTimeFrame = false;
            var firstDay = new Date();
            var lastDay = new Date();
        }
        else if (TimeFrame == "thisweek") {
            $scope.ResourceTimeFrame = false;
            dt = new Date();
            var firstDay = new Date(dt.setDate(dt.getDate() - dt.getDay()));
            var lastDay = new Date(dt.setDate(dt.getDate() + 6 - dt.getDay()));
        }
        else if (TimeFrame == "thismonth") {
            $scope.ResourceTimeFrame = false;
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        }
        else if (TimeFrame == "thisyear") {
            $scope.ResourceTimeFrame = false;
            var date = new Date();
            var firstDay = new Date("1/1/" + date.getFullYear());
            var nextyear = date.getFullYear() + 1;
            var lastDay = new Date("1/1/" + nextyear)
        }
        else if (TimeFrame == "custom") {
            $scope.ResourceTimeFrame = true;

            var firstDay = new Date(parseInt($scope.SelectedStartYear), $scope.Months.indexOf($scope.SelectedStartMonth), parseInt($scope.SelectedStartDate));
            var lastDay = new Date(parseInt($scope.SelectedEndYear), $scope.Months.indexOf($scope.SelectedEndMonth), parseInt($scope.SelectedEndDate));
        }
        $scope.StartDate = firstDay;
        $scope.EndDate = lastDay;
        if ($scope.allresourcechecked == true)
        {
            $scope.ResourcesList = "";
            angular.forEach($scope.Resources, function (value, Key) {
                $scope.ResourcesList = value.Id + "," + $scope.ResourcesList;
            })
            $scope.AllResources = $scope.ResourcesList.substring(0, $scope.ResourcesList.length - 1);
            var apirequest = bookingService.GetResourceReportsBetweenDates($routeParams.CompanyId, $scope.AllResources, $scope.StartDate, $scope.EndDate);
            apirequest.then(function (response) {             
                angular.forEach(response.data, function (value, key) {
                    ReportCount = true;
                    $scope.ResourceReport.push({ "Resource": value.Employee.FirstName, "Bookings": value.TotalBookingsAssigned, "Revenue": "£" + value.TotalRevenue, "Duration": value.DurationInHours, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%", "Tasks": value.TotalBookingsCompleted })
                })
                if (ReportCount == false) {
                    $scope.ResourceReport.push({ "Resource": "", "Bookings": "", "Revenue": "", "Duration": "No Records to display", "Cancellations": "", "CancellationRate": "", "Tasks": "" })
                }
                $scope.ResourcerReportsloader = false;
            })
        }
        else {
        var apirequest = bookingService.GetResourceReportsBetweenDates($routeParams.CompanyId, $scope.Resources[0].Id, firstDay, lastDay);
        apirequest.then(function (response) {
            $scope.ResourceReportData = [];
            $scope.ResourceReportData = response.data;          
            angular.forEach(response.data, function (value, key) {
                ReportCount = true;
                $scope.ResourceReport.push({ "Resource": value.Employee.FirstName, "Bookings": value.TotalBookingsAssigned, "Revenue": "£" + value.TotalRevenue, "Duration": value.DurationInHours, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%", "Tasks": value.TotalBookingsCompleted })
            })
            if (ReportCount == false) {
                $scope.ResourceReport.push({ "Resource": "", "Bookings": "", "Revenue": "", "Duration": "No Records to display", "Cancellations": "", "CancellationRate": "", "Tasks": "" })
            }
            $scope.ResourcerReportsloader = false;
        })
    }
    }

    $scope.GetAllResourcesReport = function (item) {
        debugger;
        $scope.ResourceReport = [];
        $scope.ResourcerReportsloader = true;
        var ReportCount = false;
        $scope.allresourcechecked = item;
        if ($scope.allresourcechecked == true) {
            var GetStaffProvider = bookingService.GetStaffData($routeParams.CompanyId);
            GetStaffProvider.then(function (response) {
                $scope.ResourcesList = "";
                $scope.Resources = [];
                for (var i = 0; i < response.data.length; i++) {
                    $scope.Resources.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'UserName': response.data[i].UserName, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email });
                    $scope.ResourcesList = response.data[i].Id + "," + $scope.ResourcesList;                                     
                }
                $scope.AllResources = $scope.ResourcesList.substring(0, $scope.ResourcesList.length - 1);

                var apirequest = bookingService.GetResourceReportsBetweenDates($routeParams.CompanyId, $scope.AllResources, $scope.StartDate, $scope.EndDate);
                apirequest.then(function (response) {                                   
                    angular.forEach(response.data, function (value, key) {
                        ReportCount = true;
                        $scope.ResourceReport.push({ "Resource": value.Employee.FirstName, "Bookings": value.TotalBookingsAssigned, "Revenue": "£" + value.TotalRevenue, "Duration": value.DurationInHours, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%", "Tasks": value.TotalBookingsCompleted })
                    })
                    if (ReportCount == false) {
                        $scope.ResourceReport.push({ "Resource": "", "Bookings": "", "Revenue": "", "Duration": "No Records to display", "Cancellations": "", "CancellationRate": "", "Tasks": "" })
                    }
                    $scope.ResourcerReportsloader = false;
                })
            })

        }
        else {            
                var apirequest = bookingService.GetResourceReportsBetweenDates($routeParams.CompanyId, $scope.Resources[0].Id, $scope.StartDate, $scope.EndDate);
                apirequest.then(function (response) {                   
                    angular.forEach(response.data, function (value, key) {
                        ReportCount = true;
                        $scope.ResourceReport.push({ "Resource": value.Employee.FirstName, "Bookings": value.TotalBookingsAssigned, "Revenue": "£" + value.TotalRevenue, "Duration": value.DurationInHours, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%", "Tasks": value.TotalBookingsCompleted })
                    })
                    if (ReportCount == false) {
                        $scope.ResourceReport.push({ "Resource": "", "Bookings": "", "Revenue": "", "Duration": "No Records to display", "Cancellations": "", "CancellationRate": "", "Tasks": "" })
                    }
                    $scope.ResourcerReportsloader = false;
                })
           
        }
    }


    $scope.ResourceChange = function (Id) {
        debugger;
        $scope.ResourceReport = [];
        $scope.ResourcerReportsloader = true;
        var ReportCount = false;
        var apirequest = bookingService.GetResourceReportsBetweenDates($routeParams.CompanyId, Id, $scope.StartDate, $scope.EndDate);
        apirequest.then(function (response) {           
            angular.forEach(response.data, function (value, key) {
                ReportCount = true;
                $scope.ResourceReport.push({ "Resource": value.Employee.FirstName, "Bookings": value.TotalBookingsAssigned, "Revenue": "£" + value.TotalRevenue, "Duration": value.DurationInHours, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%", "Tasks": value.TotalBookingsCompleted })
            })
            if (ReportCount == false) {
                $scope.ResourceReport.push({ "Resource": "", "Bookings": "", "Revenue": "", "Duration": "No Records to display", "Cancellations": "", "CancellationRate": "", "Tasks": "" })
            }
            $scope.ResourcerReportsloader = false;
        })
    }
    $scope.GetTimeFrameReports = function () {
        debugger;
        $scope.ResourceReport = [];
        var ReportCount = false;
        $scope.ResourcerReportsloader = true;
        $scope.BookingReport = [];

        var firstDay = new Date(parseInt($scope.SelectedStartYear), $scope.Months.indexOf($scope.SelectedStartMonth), parseInt($scope.SelectedStartDate));
        var lastDay = new Date(parseInt($scope.SelectedEndYear), $scope.Months.indexOf($scope.SelectedEndMonth), parseInt($scope.SelectedEndDate));

        $scope.StartDate = firstDay;
        $scope.EndDate = lastDay;

        if ($scope.allresourcechecked == true) {

            var GetStaffProvider = bookingService.GetStaffData($routeParams.CompanyId);
            GetStaffProvider.then(function (response) {
                $scope.ResourcesList = "";
                $scope.Resources = [];
                for (var i = 0; i < response.data.length; i++) {
                    $scope.Resources.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'UserName': response.data[i].UserName, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email });
                    $scope.ResourcesList = response.data[i].Id + "," + $scope.ResourcesList;                                     
                }
                $scope.AllResources = $scope.ResourcesList.substring(0, $scope.ResourcesList.length - 1);
            })
            var apirequest = bookingService.GetResourceReportsBetweenDates($routeParams.CompanyId, $scope.AllResources, $scope.StartDate, $scope.EndDate);
            apirequest.then(function (response) {               
                angular.forEach(response.data, function (value, key) {
                    ReportCount = true;
                    $scope.ResourceReport.push({ "Resource": value.Employee.FirstName, "Bookings": value.TotalBookingsAssigned, "Revenue": "£" + value.TotalRevenue, "Duration": value.DurationInHours, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%", "Tasks": value.TotalBookingsCompleted })
                })
                if (ReportCount == false) {
                    $scope.ResourceReport.push({ "Resource": "", "Bookings": "", "Revenue": "", "Duration": "No Records to display", "Cancellations": "", "CancellationRate": "", "Tasks": "" })
                }
                $scope.ResourcerReportsloader = false;
            })
        }
        else {
            
            var apirequest = bookingService.GetResourceReportsBetweenDates($routeParams.CompanyId, $scope.SelectedResource, $scope.StartDate, $scope.EndDate);
            apirequest.then(function (response) {             
                angular.forEach(response.data, function (value, key) {
                    ReportCount = true;
                    $scope.ResourceReport.push({ "Resource": value.Employee.FirstName, "Bookings": value.TotalBookingsAssigned, "Revenue": "£" + value.TotalRevenue, "Duration": value.DurationInHours, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%", "Tasks": value.TotalBookingsCompleted })
                })
                if (ReportCount == false) {
                    $scope.ResourceReport.push({ "Resource": "", "Bookings": "", "Revenue": "", "Duration": "No Records to display", "Cancellations": "", "CancellationRate": "", "Tasks": "" })
                }
                $scope.ResourcerReportsloader = false;
            })
        }

    }

    $scope.GetReportbyOrder = function (field) {
        debugger;
        $scope.toggle = !$scope.toggle;
        if ($scope.toggle == true) {
            $scope.Order = "ASC";
        }
        else {
            $scope.Order="DESC"
        }
        $scope.ResourceReport = [];
      
        var apirequest = bookingService.GetResourceReportsBetweenDatesinSortedOrder($routeParams.CompanyId, $scope.AllResources, $scope.StartDate, $scope.EndDate, $scope.Order, field);
        apirequest.then(function (response) {             
            angular.forEach(response.data, function (value, key) {              
         //       $scope.ResourceReport.push({ "Resource": value.Employee.FirstName, "Bookings": value.TotalBookingsAssigned, "Revenue": "£" + value.TotalRevenue, "Duration": value.DurationInHours, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%", "Tasks": value.TotalBookingsCompleted })
            })
        })
    }

}])