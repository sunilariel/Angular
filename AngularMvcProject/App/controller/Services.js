app.controller("servicesController", ['$scope', '$http', '$routeParams', '$timeout', '$location','bookingService', function ($scope, $http, $routeParams, $timeout, $location,bookingService) {


    //Redirection to different pages////
    $scope.redirecttoCustomer = function () {
        $location.path("/customer/" + $routeParams.CompanyId);
    }
    $scope.RedirecttoStaff = function () {
        $location.path("/Setting/" + $routeParams.CompanyId);
    }
    $scope.redirecttodashboard = function () {        
        $location.path("/dashboard/" + $routeParams.CompanyId);
    }
    $scope.redirecttoServices = function () {
        $location.path("/Services/" + $routeParams.CompanyId);
    }


    $scope.init = function () {
        debugger;
        $scope.showAddServiceDiv = true;
        $scope.showCategoryServicesDiv = true;
        $scope.showAllServicesDiv = false;
        $scope.CategoryCheckedCount = 0;
        $scope.EditServiceDiv = true;

        var CompanyId = $routeParams.CompanyId;
        var responsedata = bookingService.GetCategories(CompanyId);
        responsedata.then(function (response) {
            if (response.data.length > 0) {
                $scope.Categories = [];
                $scope.Categories = response.data;
            }
        });

    //Get All Services of particular CompanyId//
        var responsedata = bookingService.GetAllService($routeParams.CompanyId);
        responsedata.then(function (response) {
            $scope.AllServices = [];
            $scope.AllServices = response.data;
        });
    }

    //Show the AddService Section with staff name
    $scope.AddServicePopup = function () {
        debugger;
        $scope.ServiceName = "";
        $scope.ServiceCost = "";
        $scope.ServiceTime = "";

        var responsedata = bookingService.GetAllStaff($routeParams.CompanyId);

        responsedata.then(function (response) {
            $scope.staffList = [];
            $scope.staffList.push({ 'Id': "", 'CompanyId': "", 'UserName': "", 'staffName': "All Staff", 'staffEmail': "" });
            for (var i = 0; i < response.data.length; i++) {
                $scope.staffList.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'UserName': response.data[i].UserName, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email });
            }
        });

        //Hide the other div 
        $scope.showAddServiceDiv = false;
        $scope.showAllServicesDiv = true;
        $scope.showCategoryServicesDiv = true;
    }

    
    $scope.showAllServicePopup = function () {
        debugger;
        $scope.init();
    }

    $scope.ShowCategoryService = function (item) {
        debugger;
        var responsedata = bookingService.GetAllServiceForCategory(item.Id);
        responsedata.then(function (response) {
            debugger;
            if (response.data.length > 0) {
                $scope.CategoryName = response.data[0].CategoryName;
                $scope.CategoryId = response.data[0].CategoryId;
                $scope.ServiceDividedByCategory = [];
                $scope.ServiceDividedByCategory = response.data;
            }
            else {
                $scope.ServiceDividedByCategory = [];
                $scope.CategoryId = item.Id;
                $scope.CategoryName = item.Name;
            }
        });
        
        $scope.showAddServiceDiv = true;
        $scope.showAllServicesDiv = true;
        $scope.EditServiceDiv = true;
        $scope.showCategoryServicesDiv = false;
    }

    //Updating Category Name//
    $scope.EditCategory = function (categoryName) {
        var updatedcategory =
            {
                "Id": $scope.CategoryId,
                "CompanyId": $routeParams.CompanyId,
                "Name": categoryName,
                "CreationDate": "2017-07-04T05:49:29.2657661+00:00"
            }
        var responseresult = bookingService.UpdateCategory(updatedcategory);
        responseresult.then(function (response) {
            if (response.data.Success == true) {
                $scope.MessageText = "Saving Category Name."
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.MessageText = "Category Name Saved"
                    $timeout(function () {
                        $scope.IsVisible = false;
                    }, 1000)
                }, 500);
            }
        });
    }

    //Delete Category//

    $scope.DeleteCategory=function()
    {
        var responseresult = bookingService.DeleteCategory($scope.CategoryId);
        responseresult.then(function (response) {
            if(response.data.Success==true)
            {
                $scope.MessageText = "Only Category will be deleted not the service."
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.MessageText="Category Deleted."
                    $timeout(function()
                    {
                        $scope.IsVisible = false;
                        $scope.init();
                    },1000)
                }, 500);

                
            }
        });
    }



    $scope.AddCategory = function () {
        debugger;
        var CurrentDate=new Date();
        var data = {
            "Id": "",
            "CompanyId": $routeParams.CompanyId,
            "Name": $scope.CategoryName,
            "CreationDate": CurrentDate
        }
        var response = bookingService.AddCategory(data);

        response.then(function (response) {
            if(response.data.Success==true)
            {
                $scope.showcategorypopup = false;
                var CompanyId = $routeParams.CompanyId;
                var responsedata = bookingService.GetCategories(CompanyId);
                responsedata.then(function (response) {
                    if (response.data.length > 0) {
                        $scope.Categories = [];
                        $scope.Categories = response.data;
                    }
                })
              
                $scope.MessageText = "Adding new Category";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.IsVisible = false;
                }, 500);
            }
        });
    }

  
    $scope.SaveService = function () {        
        if (servicenameform.ServiceName.value == "")
        {
            $scope.MessageText = "Service name cannot be empty!";
            $scope.IsVisible = true;
            $timeout(function () {
                $scope.IsVisible = false;
            }, 1000);
            return false;
        }
        if (servicedetailform.ServiceTime.value == "") {
            $scope.MessageText = "Service time cannot be empty!";
            $scope.IsVisible = true;
            $timeout(function () {
                $scope.IsVisible = false;
            }, 1000);
            return false;
        }
            var service = {
                "Id": "",
                "CompanyId": $routeParams.CompanyId,
                "Name": $scope.ServiceName,
                "CategoryName": "",
                "CategoryId": null,
                "DurationInMinutes": $scope.ServiceTime,
                "DurationInHours": 0,
                "Cost": $scope.ServiceCost,
                "Currency": "sample string 9",
                "CreationDate": "2017-06-26T11:08:28.4943519+00:00"
            }

            var responsedata = bookingService.AddServices(service);

            responsedata.then(function (response) {
                debugger;
                if (response.data.Success == true) {
                    $scope.ServiceId = response.data.ReturnObject.ServiceId;

                    //Assign Staff to Service
                    angular.forEach($scope.staffList, function (value, key) {
                        
                        if(value.staffName!="All Staff" && value.confirmed==true)
                        {
                            var CurrentDate = new Date();
                            var requestdata = {
                                "Id": "",
                                "CompanyId": $routeParams.CompanyId,
                                "EmployeeId": value.Id,
                                "ServiceId": $scope.ServiceId,
                                "CreationDate": CurrentDate
                            }
                            var responseresult = bookingService.AssignStafftoService(requestdata);
                            responseresult.then(function (response) {
                                debugger;
                            })
                        }
                    });
                   

                    //Assign Category to Service
                    angular.forEach($scope.Categories, function (value, key) {
                        if (value.hasOwnProperty("Confirmed")==true) {
                            if (value.Confirmed == true) {
                                //var responsedata = bookingService.AssignCategoryToService($scope.ServiceId, value.Id);
                                var updatedservice = {
                                    "Id": $scope.ServiceId,
                                    "CompanyId": $routeParams.CompanyId,
                                    "Name": $scope.ServiceName,
                                    "CategoryName": value.Name,
                                    "CategoryId": value.Id,
                                    "DurationInMinutes": $scope.ServiceTime,
                                    "DurationInHours": 0,
                                    "Cost": $scope.ServiceCost,
                                    "Currency": "sample string 9",
                                    "CreationDate": "2017-06-26T11:08:28.4943519+00:00"
                                }

                                var responsedata = bookingService.UpdateService(updatedservice);
                                //var responsedata = bookingService.AssignCategorytoService($scope.ServiceId,value.Id);
                                responsedata.then(function (response) {
                                    if (response.data.Success == true) {
                                        $scope.MessageText = "Service Saved";
                                        $scope.IsVisible = true;
                                        $timeout(function () {
                                            $scope.IsVisible = false;
                                        },1000);
                                        //Empty the value in element//
                                        $scope.ServiceName = "";
                                        $scope.ServiceTime = "";
                                        $scope.ServiceCost = "";
                                    }
                                })
                            }
                        }
                    });                                
                    $scope.init();
                }
            })     
    }


    $scope.EditService = function (item) {
        debugger;
        $scope.ServiceId=item.Id;
        $scope.ServiceName = item.Name;
        $scope.ServiceCost = item.Cost;
        $scope.ServiceTime = item.DurationInMinutes;
        var responsedata = bookingService.GetAllStaff($routeParams.CompanyId);

        responsedata.then(function (response) {
            $scope.staffList = [];
            $scope.staffList.push({ 'Id': "", 'CompanyId': "", 'UserName': "", 'staffName': "All Staff", 'staffEmail': "" });
            for (var i = 0; i < response.data.length; i++) {
                $scope.staffList.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'UserName': response.data[i].UserName, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email });
            }
        });
        var responseresult = bookingService.GetEmployeeAssignedtoService($scope.ServiceId);
        responseresult.then(function (response) {
            for(var i=0;i<response.data.length;i++)
            {
                angular.forEach($scope.staffList,function(value,key)
                {
                    if(value.Id==response.data[i].Id)
                    {
                        value.confirmed = true;
                    }
                   
                })
                if($scope.staffList.length==response.data.length+1)
                {
                    $scope.staffList[0].confirmed = true;
                }
            }
            
        });

        $scope.EditServiceDiv = false;
        $scope.showAddServiceDiv = true;
        $scope.showCategoryServicesDiv = true;
        $scope.showAllServicesDiv = true;

    }

    //Update Service//

    $scope.updateService = function () {
        debugger;
        var CurrentDate = new Date();
        var UpdatedService=
        {
            "Id": $scope.ServiceId,
            "CompanyId": $routeParams.CompanyId,
            "Name": $scope.ServiceName,
            "CategoryName": "sample string 4",
            "CategoryId": null,
            "DurationInMinutes": $scope.ServiceTime ,
            "DurationInHours": "",
            "Cost": $scope.ServiceCost,
            "Currency": "sample string 9",
            "CreationDate": "2017-07-05T05:21:50.3448321+00:00"
        }

        var result = bookingService.UpdateService(UpdatedService);
        result.then(function (response) {
            if(response.data.Success==true)
            {
                $scope.MessageText = "Saving Service";
                $scope.IsVisible = true;
                $timeout(function()
                {
                    $scope.MessageText = "Service Saved";
                    $timeout(function()
                    {                        
                        $scope.IsVisible = false;
                    },1000)
                },500)
            }
        });       
    }

    //Delete Service//
    $scope.DeleteService = function () {
        debugger;
        var result = bookingService.DeleteService($scope.ServiceId);
        result.then(function(response)
        {
            if (response.data.Success == true)
            {
                $scope.IsVisible = true;
                $scope.MessageText = "Deleting Service";
                $timeout(function () {
                      
                    $scope.MessageText = "Service Deleted";
                    $timeout(function () {
                        $scope.IsVisible = false;
                        $scope.init();
                    },1000)
                }, 800)

                
                
            }
           
        })
    }


    //Assigned/Deassigned Staff to Service

    $scope.AssignedStafftoService=function(item)
    {
        debugger;
        if(item.confirmed==true)
        {
            var CurrentDate = new Date();
            var requesteddata = {
                "Id": "",
                "CompanyId": $routeParams.CompanyId,
                "EmployeeId": item.Id,
                "ServiceId": $scope.ServiceId,
                "CreationDate": CurrentDate
            }

            var result = bookingService.AssignStafftoService(requesteddata);
            result.then(function(response)
            {
                if(response.data.Success==true)
                {
                    $scope.MessageText = "Assigning staff to services";
                    $scope.IsVisible = true;
                    $timeout(function()
                    {
                        $scope.MessageText = "Service Saved";
                        $timeout(function () {
                            $scope.IsVisible = false;
                        },1000)
                    },800)
                }
            })
        }
        else {
            var result = bookingService.DeAssignedStaffToService($routeParams.CompanyId, item.Id, $scope.ServiceId);
            result.then(function (response) {
                if (response.data.Success == true) {
                    $scope.MessageText = "Unassigning staff to services";
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "Service Saved";
                        $timeout(function () {
                            $scope.IsVisible = false;
                        },1000)
                    },800)
                }
            })
        }

        $scope.staffchecked(item);
    }



    //Get Categories Count//
    $scope.CategoryConfirmedCount=function()
    {
        debugger;
        $scope.CategoryCheckedCount = 0;
        angular.forEach($scope.Categories, function (value, key) {
            if(value.Confirmed==true)
            {
                $scope.CategoryCheckedCount = $scope.CategoryCheckedCount + 1;

            }
        });
    }

    //Checked and unchecked service provider in add service section//

    $scope.staffchecked = function (item)
    {
        if(item.staffName=="All Staff")
        {
            if (item.confirmed == true) {
                angular.forEach($scope.staffList, function (value, key) {
                    value.confirmed = true;
                });
            }
            else {
                angular.forEach($scope.staffList, function (value, key) {
                    value.confirmed = false;
                });
            }
        }
        else {
            for (var i = 1; i < $scope.staffList.length; i++) {
                if ($scope.staffList[i].confirmed == true) {
                    $scope.staffList[0].confirmed = true;
                }
                else {
                    $scope.staffList[0].confirmed = false;
                    break;
                }
            }
        }
    }

 


}]);