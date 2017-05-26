var app = angular.module("MyApp", []);
app.controller("SignUp", function ($scope, $http) {
    debugger;
    $scope.username = "";
    $scope.Email = "";
    $scope.Password = "";
    $scope.submitTheForm = function () {
        debugger;
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
            alert("hello")
            $scope.PostDataResponse = data;

        })
        .error(function (e) {             
                alert('Error!');              
            });

        //var config = {
        //    headers: {
        //        'Content-Type': 'application/json;charset=utf-8;'
        //    }
        //}
      
        //$http.post("http://romzbookingmanager.azurewebsites.net/api/companyregistration/CreateAccount", dataobject, config)
        //.success(function (data, status, headers, config) {
        //    debugger
        //    $scope.PostDataResponse = data;
        //    alert(6778);
        //    $scope.msg = "Post Data Submitted Successfully!";
        //    var data2 = data.replace(/{"d":null}/g, '');
        //    var myjson = JSON.parse(data2);
        //    $scope.questions = JSON.parse(myjson);
        //})
        //.error(function (data, status, header, config) {
        //    $scope.ResponseDetails = "Data: " + data +
        //        "<hr />status: " + status +
        //        "<hr />headers: " + header +
        //        "<hr />config: " + config;
        //});

        //$http({
        //    url: '/Signup/postdata',
        //    type: "POST",
        //    dataType: "json",
        //    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        //    data: { json: JSON.stringify(dataobject) },
        //}).success(function (d) {
        //    alert("hello");
        //    // Success callback
        //    //defer.resolve(d);
        //}).error(function (e) {
        //    //Failed Callback
        //    alert('Error!');
        //    //defer.reject(e);
        //});
    }
});