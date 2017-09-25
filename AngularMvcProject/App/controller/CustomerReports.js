app.controller("CustomerReportsController", ['$scope','$routeParams','$location','bookingService', function ($scope, $routeParams, $location,bookingService) {
    //Redirection to different tab section//
    $scope.RedirecttoBuisnessReport = function () {
        
        $location.path("/BuisnessReports/:CompanyId");
    }
    $scope.RedirecttoResourceReport = function () {
        $location.path("/ResourceReports/"+ $routeParams.CompanyId);
    }
    $scope.RedirecttoServiceReport = function () {
        $location.path("/ServiceReports/"+ $routeParams.CompanyId);
    }
    $scope.RedirecttoCustomerReport = function () {
        $location.path("/CustomerReports/"+  $routeParams.CompanyId);
    }
    $scope.redirecttoCustomer = function () {
        $location.path("/customer/" + $routeParams.CompanyId);
    }

    $scope.redirectToCalendar = function () {

        $location.path("/Calendar/" + $routeParams.CompanyId);
    }

    $scope.RedirecttoStaff = function () {
        $location.path("/Setting/" + $routeParams.CompanyId);
    }

    $scope.RedirecttoReport = function () {
        $location.path("/BuisnessReports/" + $routeParams.CompanyId);
    }

    $scope.init = function () {
        debugger;
        $scope.Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        $scope.Years = ["2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];
        $scope.Date = [];
        for (var i = 1; i <= 31; i++) {
            $scope.Date.push(i);

        }

        $scope.time = "thismonth";
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);


        $scope.SelectedStartMonth = $scope.Months[date.getMonth()];
        $scope.SelectedStartYear = date.getFullYear().toString();
        $scope.SelectedStartDate = date.getDate().toString();

        var EndDate = new Date(date);
        EndDate.setDate(date.getDate() + 15);

        $scope.SelectedEndMonth = $scope.Months[EndDate.getMonth()];
        $scope.SelectedEndYear = EndDate.getFullYear().toString();
        $scope.SelectedEndDate = (EndDate.getDate()).toString();
      

        $scope.StartDate = firstDay;
        $scope.EndDate = lastDay;

        $scope.CustomerIds="";
        var customerhttprequest=bookingService.GetAllCustomer($routeParams.CompanyId);
        customerhttprequest.then(function(response){
            debugger;
            for(var i=0;i<response.data.length;i++)
            {
                $scope.CustomerIds=response.data[i].Id + "," + $scope.CustomerIds;
            }
            $scope.CustomerReportIds=$scope.CustomerIds.substring(0,$scope.CustomerIds.length -1);

            var httprequest = bookingService.GetCustomerReportsBetweenDates($routeParams.CompanyId, $scope.CustomerReportIds, $scope.StartDate, $scope.EndDate);
            httprequest.then(function (response) {
                debugger;
                $scope.CustomerReportDetail = [];
            })
        })

      
    }

    $scope.GetTimeFrame = function (TimeFrame) {
        debugger;
        $scope.BookingReport = [];
        
        if (TimeFrame == "today") {
            $scope.CustomerReportTimeFrame = false;
            var firstDay = new Date();
            var lastDay = new Date();
        }
        else if (TimeFrame == "thisweek") {
            $scope.CustomerReportTimeFrame = false;
            dt = new Date();
            var firstDay = new Date(dt.setDate(dt.getDate() - dt.getDay()));
            var lastDay = new Date(dt.setDate(dt.getDate() + 6 - dt.getDay()));
        }
        else if (TimeFrame == "thismonth") {
            $scope.CustomerReportTimeFrame = false;
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        }
        else if (TimeFrame == "thisyear") {
            $scope.CustomerReportTimeFrame = false;
            var date = new Date();
            var firstDay = new Date("1/1/" + date.getFullYear());
            var nextyear = date.getFullYear() + 1;
            var lastDay = new Date("1/1/" + nextyear)
        }
        else if (TimeFrame == "custom") {
            
            $scope.CustomerReportTimeFrame = true;
            var firstDay = new Date(parseInt($scope.SelectedStartYear), $scope.Months.indexOf($scope.SelectedStartMonth), parseInt($scope.SelectedStartDate));
            var lastDay = new Date(parseInt($scope.SelectedEndYear), $scope.Months.indexOf($scope.SelectedEndMonth), parseInt($scope.SelectedEndDate));
        }

        $scope.StartDate = firstDay;
        $scope.EndDate = lastDay;

        var httprequest = bookingService.GetCustomerReportsBetweenDates($routeParams.CompanyId, $scope.CustomerReportIds, $scope.StartDate, $scope.EndDate);
        httprequest.then(function (response) {
            debugger;
            $scope.CustomerReportDetail = [];
        })


       
    }

    $scope.GetTimeFrameReports = function () {
        
        $scope.BookingReport = [];

        var firstDay = new Date(parseInt($scope.SelectedStartYear), $scope.Months.indexOf($scope.SelectedStartMonth), parseInt($scope.SelectedStartDate));
        var lastDay = new Date(parseInt($scope.SelectedEndYear), $scope.Months.indexOf($scope.SelectedEndMonth), parseInt($scope.SelectedEndDate));

        $scope.StartDate = firstDay;
        $scope.EndDate = lastDay;

        GetTimeFrameReports

        var httprequest = bookingService.GetCustomerReportsBetweenDates($routeParams.CompanyId, $scope.CustomerReportIds, $scope.StartDate, $scope.EndDate);
        httprequest.then(function (response) {
            debugger;
            $scope.CustomerReportDetail = [];
        })


    }
}])