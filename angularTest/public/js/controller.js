app.controller('mainController', function($scope, $http) {


  $scope.procent2 = 0;
  function counter() {

    $scope.procent2++;
    if ($scope.procent2>100) {
      $scope.procent2 = 0;
    }
    $scope.$apply();
  }

  setInterval(counter, 1000);



  setInterval(function() {

    $http.jsonp('https://www.ombord.info/api/jsonp/user/?callback=JSON_CALLBACK').
      success(function(data) {
          //what do I do here?
          console.log("Success " + data);
          $scope.successData = data;
          $scope.procent = 100 * (data.data_total_used / data.data_total_limit);

      }).
      error(function(data, status, headers, config) {
          $scope.error = true;
          console.log("Error" + data);
      });

      /*
    $http({
    method: 'GET',
    //url: "http://localhost:1337/fakeapi"
    url: "http://localhost:1337/api"


    }).then(function successCallback(response) {
        // this callback will be called asynchronously when the response is available

        console.log(response + " Success");
        $scope.response = response.data;
        $scope.procent = 100 * ($scope.response.data_total_used / $scope.response.data_total_limit);

      }, function errorCallback(response) {

      console.log(response + " Error");

    }); */

  }, 10000);

});
