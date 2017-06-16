var app = angular.module("MyApp", []);
app.controller("SignUp",['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    debugger;
    $scope.username = "";
    $scope.Email = "";
    $scope.Password = "";
    $scope.IsVisible = false;
    var booluserexist = false;
    $scope.submitTheForm = function (form) {
        debugger;

        if (form.$invalid == true)
        {
            if(form.username.$invalid==true)
            {
                form.username.$touched = true;
                form.username.$setTouched();
            }
            if(form.email.$invalid==true)
            {
                form.email.$touched = true;
                form.email.$setTouched();
            }
            if(form.password.$invalid==true)
            {
                form.password.$touched = true;
                form.password.$setTouched();
            }
            return false;
        }

        //var email = form.email.$$rawmodelvalue;     
        //$http.post("signup/userexist",
        //    { email: email }
        //    ).success(function (response) {
        //        debugger;
        //        if (response == false) {
        //            booluserexist = true;
        //            $timeout(function () { $scope.messagetext = "user already exist."; }, 500);
        //            alert("user already exists");
        //            return false;
        //        }
        //    }).error(function (e) {
        //        alert("!error");
        //    });
       
       
            var dataobject = {
                Id: 1,
                Name: $scope.username,
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

        $http.post("SignUp/postdata", { json: data }).success(function (data) {
            debugger;
            if(data.success==true){
                $scope.IsVisible = true;
                $scope.MessageText ="Saving Data"
                $scope.msg = "Post Data Submitted Successfully!";

                $timeout(function () { $scope.MessageText = "Data saved."; $timeout(function () { $scope.IsVisible = false; }, 1000) }, 500);
            }
            //else if(data.success=="UserExits")
            //{
            //    $scope.IsVisible = true;
            //    $scope.MessageText = "Saving Data"
            //    $scope.msg = "Post Data Submitted Successfully!";

            //    $timeout(function () { $scope.MessageText = "User alreay exist"; $timeout(function () { $scope.IsVisible = false; }, 1000) }, 500);
            //}
        })
        .error(function (e) {             
            alert('Error!');              
        });

       

    }
}
]);