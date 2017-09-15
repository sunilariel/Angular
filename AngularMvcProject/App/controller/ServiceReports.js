app.controller('ServiceReportsController', ['$scope', '$routeParams', '$location', 'bookingService', function ($scope, $routeParams, $location, bookingService) {

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
        $location.path("/CustomerReports/"+ $routeParams.CompanyId);
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
   

    $scope.GetTimeFrame = function (TimeFrame) {
        debugger;
        var ReportCount=false;
        $scope.ServiceReportsloader = true;
        if (TimeFrame == "today") {
            $scope.ServiceTimeFrame = false;
            var firstDay = new Date();
            var lastDay = new Date();
        }
        else if (TimeFrame == "thisweek") {
            $scope.ServiceTimeFrame = false;
            dt = new Date();
            var firstDay = new Date(dt.setDate(dt.getDate() - dt.getDay()));
            var lastDay = new Date(dt.setDate(dt.getDate() + 6 - dt.getDay()));
        }
        else if (TimeFrame == "thismonth") {
            $scope.ServiceTimeFrame = false;
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        }
        else if (TimeFrame == "thisyear") {
            $scope.ServiceTimeFrame = false;
            var date = new Date();
            var firstDay = new Date("1/1/" + date.getFullYear());
            var nextyear = date.getFullYear() + 1;
            var lastDay = new Date("1/1/" + nextyear)
        }
        else if (TimeFrame == "custom") {
            $scope.ServiceTimeFrame = true;
            var firstDay = new Date(parseInt($scope.SelectedStartYear), $scope.Months.indexOf($scope.SelectedStartMonth), parseInt($scope.SelectedStartDate));
            var lastDay = new Date(parseInt($scope.SelectedEndYear), $scope.Months.indexOf($scope.SelectedEndMonth), parseInt($scope.SelectedEndDate));
        }
        $scope.StartDate = firstDay;
        $scope.EndDate = lastDay;

        $scope.ServiceReport = [];

        if ($scope.allservicechecked == true) {
            var apirequest = bookingService.getServicesData($routeParams.CompanyId);
            $scope.Services = "";
            apirequest.then(function (response) {
                angular.forEach(response.data, function (value, key) {
                    $scope.Services = value.Id + "," + $scope.Services;
                })
                $scope.commaSeperatedServiceIds = $scope.Services.substring(0, $scope.Services.length - 1)

                var apireportrequest = bookingService.GetServiceReportsBetweenDates($routeParams.CompanyId, $scope.commaSeperatedServiceIds, firstDay, lastDay);
                apireportrequest.then(function (response) {
                   
                  
                    angular.forEach(response.data, function (value, key) {
                        ReportCount=true;
                        $scope.ServiceReport.push({ "Service": value.ServiceName, "Category": value.CategoryName, "Booking": value.TotalBookings, "Revenue": "£"+value.TotalConfirmedRevenue, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations +"%" });
                        $scope.ServiceReportsloader = false;
                    })
                    if (ReportCount==false) {
                        $scope.ServiceReport.push({ "Service": "", "Category": "", "Booking": "", "Revenue": "No Records to display", "Cancellations": "", "CancellationRate": "" });
                        $scope.ServiceReportsloader = false;
                    }
                })

            })

        }
        else {
            var apireportrequest = bookingService.GetServiceReportsBetweenDates($routeParams.CompanyId, $scope.SelectedService, firstDay, lastDay);
            apireportrequest.then(function (response) {               
                angular.forEach(response.data, function (value, key) {
                    ReportCount = true;
                    $scope.ServiceReport.push({ "Service": value.ServiceName, "Category": value.CategoryName, "Booking": value.TotalBookings, "Revenue": "£" + value.TotalConfirmedRevenue, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%" });
                    $scope.ServiceReportsloader = false;
                })
                if (ReportCount == false) {
                    $scope.ServiceReport.push({ "Service": "", "Category": "", "Booking": "", "Revenue": "No Records to display", "Cancellations": "", "CancellationRate": "" });
                    $scope.ServiceReportsloader = false;
                }
            })
        }
    }

    $scope.init = function () {
        debugger;
        var ReportCount = 0;
        $scope.ServiceReportsloader = true;
        $scope.ServiceTimeFrame = false;
        $scope.allservicechecked = false;
        $scope.Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        $scope.Years = ["2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];
        $scope.Date = [];
        for (var i = 1; i <= 31; i++) {
            $scope.Date.push(i);

        }
        $scope.time = "thismonth";      
        var date = new Date();
        $scope.Services = "";
        $scope.ServiceReport = [];
        $scope.ListofServices = [];
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        $scope.StartDate = firstDay;
        $scope.EndDate = lastDay;

        $scope.SelectedStartMonth = $scope.Months[date.getMonth()];
        $scope.SelectedStartYear = date.getFullYear().toString();
        $scope.SelectedStartDate = date.getDate().toString();

        $scope.SelectedEndMonth = $scope.Months[date.getMonth()];
        $scope.SelectedEndYear = date.getFullYear().toString();
        $scope.SelectedEndDate = (date.getDate() + 15).toString();


               
        var apirequest=bookingService.getServicesData($routeParams.CompanyId);
        apirequest.then(function(response){
            angular.forEach(response.data, function (value, key) {
                $scope.ListofServices.push({ "Id": value.Id, "Service": value.Name });                            
            })
            $scope.SelectedService = response.data[0].Id.toString();
       
        $scope.ServiceReport = [];
        var apireportrequest = bookingService.GetServiceReportsBetweenDates($routeParams.CompanyId, $scope.SelectedService, firstDay, lastDay);
        apireportrequest.then(function (response) {           
            angular.forEach(response.data, function (value, key) {
                ReportCount = true;
                $scope.ServiceReport.push({ "Service": value.ServiceName, "Category": value.CategoryName, "Booking": value.TotalBookings, "Revenue": "£" + value.TotalConfirmedRevenue, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%" });
                $scope.ServiceReportsloader = false;
            })
            if (ReportCount == false) {
                $scope.ServiceReport.push({ "Service": "", "Category": "", "Booking": "", "Revenue": "No Records to display", "Cancellations": "", "CancellationRate": "" });
                $scope.ServiceReportsloader = false;
            }
        })
    })      
    }

    $scope.GetTimeFrameReports = function () {
        debugger;
        var ReportCount = false;
        $scope.ServiceReportsloader = true;
        $scope.ServiceReport = [];

        var firstDay = new Date(parseInt($scope.SelectedStartYear), $scope.Months.indexOf($scope.SelectedStartMonth), parseInt($scope.SelectedStartDate));
        var lastDay = new Date(parseInt($scope.SelectedEndYear), $scope.Months.indexOf($scope.SelectedEndMonth), parseInt($scope.SelectedEndDate));

        $scope.StartDate = firstDay;
        $scope.EndDate = lastDay;
        var apirequest = bookingService.getServicesData($routeParams.CompanyId);
        apirequest.then(function (response) {
            angular.forEach(response.data, function (value, key) {
                $scope.Services = value.Id + "," + $scope.Services;
            })
            $scope.commaSeperatedServiceIds = $scope.Services.substring(0, $scope.Services.length - 1)

            var apireportrequest = bookingService.GetServiceReportsBetweenDates($routeParams.CompanyId, $scope.commaSeperatedServiceIds, firstDay, lastDay);
            apireportrequest.then(function (response) {              
                angular.forEach(response.data, function (value, key) {
                    ReportCount = true;
                    $scope.ServiceReport.push({ "Service": value.ServiceName, "Category": value.CategoryName, "Booking": value.TotalBookings, "Revenue": "£" + value.TotalConfirmedRevenue, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%" });
                    $scope.ServiceReportsloader = false;
                })
                if (ReportCount == false) {
                    $scope.ServiceReport.push({ "Service": "", "Category": "", "Booking": "", "Revenue": "No Records to display", "Cancellations": "", "CancellationRate": "" });
                    $scope.ServiceReportsloader = false;
                }
            })

        })
    }

    $scope.GetAllServicesReport=function(checked)
    {
        debugger;
        var ReportCount = false;
        $scope.allservicechecked = true;
        $scope.ServiceReportsloader = true;
        $scope.ServiceReport = [];
        if(checked==true)
        {
            var apirequest=bookingService.getServicesData($routeParams.CompanyId);
            apirequest.then(function (response) {
                angular.forEach(response.data, function (value, key) {
                    $scope.Services = value.Id + "," + $scope.Services;
                })
            
                $scope.commaSeperatedServiceIds = $scope.Services.substring(0, $scope.Services.length - 1)

                var apireportrequest = bookingService.GetServiceReportsBetweenDates($routeParams.CompanyId, $scope.commaSeperatedServiceIds, $scope.StartDate, $scope.EndDate);
                apireportrequest.then(function (response) {
                  
                    angular.forEach(response.data, function (value, key) {
                        ReportCount = true;
                        $scope.ServiceReport.push({ "Service": value.ServiceName, "Category": value.CategoryName, "Booking": value.TotalBookings, "Revenue": "£" + value.TotalConfirmedRevenue, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%" });
                        $scope.ServiceReportsloader=false;
                    })
                    if (ReportCount == false) {
                        $scope.ServiceReport.push({ "Service": "", "Category": "", "Booking": "", "Revenue": "No Records to display", "Cancellations": "", "CancellationRate": "" });
                        $scope.ServiceReportsloader = false;
                    }
                })
            })
        }
        else {
            $scope.allservicechecked = false;
            var apireportrequest = bookingService.GetServiceReportsBetweenDates($routeParams.CompanyId, $scope.SelectedService, $scope.StartDate, $scope.EndDate);
            apireportrequest.then(function (response) {
                
                angular.forEach(response.data, function (value, key) {
                    ReportCount = true;
                    $scope.ServiceReport.push({ "Service": value.ServiceName, "Category": value.CategoryName, "Booking": value.TotalBookings, "Revenue": "£" + value.TotalConfirmedRevenue, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%" });
                    $scope.ServiceReportsloader = false;
                })
                if (ReportCount == false) {
                    $scope.ServiceReport.push({ "Service": "", "Category": "", "Booking": "", "Revenue": "No Records to display", "Cancellations": "", "CancellationRate": "" });
                    $scope.ServiceReportsloader = false;
                }
            })
        }
    }

    $scope.ServiceChange = function (Id) {
        debugger;
        var ReportCount = false;
        $scope.ServiceReportsloader = true;
        $scope.ServiceReport = [];
        var apireportrequest = bookingService.GetServiceReportsBetweenDates($routeParams.CompanyId, Id, $scope.StartDate, $scope.EndDate);
        apireportrequest.then(function (response) {           
            angular.forEach(response.data, function (value, key) {
                ReportCount = true;
                    $scope.ServiceReport.push({ "Service": value.ServiceName, "Category": value.CategoryName, "Booking": value.TotalBookings, "Revenue": "£"+value.TotalConfirmedRevenue, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations +"%" });
                    $scope.ServiceReportsloader = false;
                })
                if (ReportCount == false) {
                    $scope.ServiceReport.push({ "Service": "", "Category": "", "Booking": "", "Revenue": "No Records to display", "Cancellations": "", "CancellationRate": "" });
                    $scope.ServiceReportsloader = false;
                }
            })
    }


}])