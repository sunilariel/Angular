app.controller("SignIn", ['$scope', '$http', '$timeout', '$location', '$window', function ($scope, $http, $timeout, $location, $window) {
    debugger;
    $scope.username = "";
    $scope.Email = "";
    $scope.Password = "";
    $scope.IsVisible = false;
    var booluserexist = false;
    $scope.submitTheForm = function (form) {
        debugger;

        if (form.$invalid == true) {
            if (form.username.$invalid == true) {
                form.username.$touched = true;
                form.username.$setTouched();
            }
            if (form.email.$invalid == true) {
                form.email.$touched = true;
                form.email.$setTouched();
            }
            if (form.password.$invalid == true) {
                form.password.$touched = true;
                form.password.$setTouched();
            }
            return false;
        }

        var dataobject = {
            Id: 1,
            //Name: $scope.username,
            Address: "aaa",
            Email: $scope.Email,
            Telephone: "123654789",
            PostCode: "a",
            Website: "a",
            County: "aaa",
            Town: "aaaaa",
            Description: "aa",
            Password: $scope.Password,
            CreationDate: "2017-05-22T05:55:21.9148617+00:00"


        }
        var data = JSON.stringify(dataobject);
         $scope.IsVisible = true;
         $scope.MessageText = "Signing In"
        $http.post("SignIn/postdata", { json: data }).success(function (data) {
            debugger;
            if (data.success == true) {
              
                $scope.msg = "Post Data Submitted Successfully!";
                $scope.companyId = data.CompanyId;

              //  $timeout(function () { $scope.MessageText = "Your Details saved."; $timeout(function () { $scope.IsVisible = false; }, 1000) }, 500);
                $scope.IsVisible = false;
                $location.path("/dashboard/" + $scope.companyId);
                $window.sessionStorage.setItem('userInfo-token', data.Token);
            }
            else {
                $timeout(function () { $scope.MessageText = "Invalid Credentials."; }, 500);
            }
        })
        .error(function (e) {
            alert('Error!');
            //$timeout(function () { $scope.messagetext = "Invalid Credentials."; }, 500);
        });
    }
}
]);