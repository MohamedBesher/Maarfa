
angular.module('UploadModule', ['naif.base64','SignalrDataModule'])
              .controller('ctrl', ['$scope', '$http', '$window', 'SignalrDataFactory',
              function ($scope, $http, $window, SignalrDataFactory) {
                  var uploadedCount = 0;
                  $scope.files = [];
                  $scope.file = {};
                  $scope.uploadFiles = function () {
                      var files = angular.copy($scope.files);
                      if ($scope.file) {
                          files.push($scope.file);
                      }
                      if (files.length === 0) {
                          $window.alert('Please select files!');
                          return false;
                      }
                      for (var i = files.length - 1; i >= 0; i--) {
                          var file = files[i];

                          var book = {
                              Image64: file.base64,
                              filename: file.filename,
                              Name: "sdasdas",
                              Description: "sdfsdf",
                              CategoryId:1
                          };

                          SignalrDataFactory.Post("Upload/Post", book).then(function (result) {
                              if (result.status === 200) {

                              }

                          });


                          //$http.post('api/Upload/Post', file.base64)
                          //.success(function (res) {
                          //    uploadedCount++;
                          //    if (uploadedCount == files.length) {
                          //        $window.alert('View uploaded files?');
                          //        $window.location.assign('/uploads');
                          //    }
                          //});
                      }
                  };
              }]);