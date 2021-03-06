angular
    .module('aboutUsModule', [
    'ngAnimate',
    'ngGrid',
    'SignalrDataModule',
    'naif.base64',
    'angularModalService'
])
  .controller('aboutUsController', ['$scope', '$filter', '$http', '$q', 'SignalrDataFactory', 'ModalService',
      function ($scope, $filter, $http, $q, SignalrDataFactory, ModalService) {
          $scope.viewMode = true;
          $scope.PageLabelObj = {
              Dashboard: 'الصفحة الرئيسية',
              header: "من نحن",          
              delete: "حذف",
              lbladd: "حفظ",
              List: "من نحن",
              lblrequired:"هذا الحقل مطلوب",
              RequireNote: 'حميع الحقول التي تحتوي على علامة * مطلوبة',
              cancel: "إلغاء",
              edit: "تعديل",            
              lockout: function (status) {
                  if (status)
                      return '<span class="label label-success" ng-show="true"></span>';
                  else
                      return '<span class="label label-danger" ng-show="false"></span>';
              }
          }
          $scope.form = {};
          $scope.newPost = {};
          $scope.DismissForm = function () {
              $scope.isPosting = true;
              $scope.isEditing = true;
              $scope.showDiv = true;
              $scope.newPost = null;
              $scope.resetValidationForm();

          }
          $scope.resetValidationForm = function () {       
              $scope.form.newPost.$setPristine(true);
              $scope.form.newPost.$setUntouched(true);

          }
          $scope.DismissFormEdit = function () {
                        
              $scope.isPosting = true;
              $scope.isEditing = true;
              $scope.showDiv = true;
              $scope.cityEditObj = null;
              $scope.resetValidationForm();
          }
          $scope.showEditDv = function () {
              $scope.resetValidationForm();              //Clicked by the Add button
              $scope.isPosting = false;
              $scope.isEditing = true;
              $scope.showDiv = false;

          }

          $scope.newPost = {};

          $scope.post = function () {
              //var contact = {
              //    Id: $scope.newPost.id,
              //    Phone: $scope.newPost.phone,
              //    Email: $scope.newPost.email,
              //    AboutUs: $scope.newPost.aboutus
              //};

              SignalrDataFactory.Post("ContactUs/SaveContactUs/", $scope.newPost).then(function (result) {
                  if (result.status === 200) {
                      $scope.viewMode = true;
                  }
              },function (error) {
                  if (error.status === 400)
                      $scope.viewMode = false;
              });


          
          };
          $scope.AccessviewMode=function() {
              $scope.viewMode = false;
          }
          $scope.ExistviewMode = function () {
              $scope.viewMode = true;
          }
          //Load Edit
          $scope.loadEditData = function () {                     
              SignalrDataFactory.GetAll('ContactUs/').then(function (result) {
                  $scope.newPost = result.data;              
              });
          }
          $scope.loadEditData();
          //Editing Send
         
      
         

      }])
    .directive("viewedit", function() {
        return function(scope, element, attrs) {

            scope.$watch('viewMode', function() {
                if (scope.viewMode) { 
                    element.removeClass("editable").addClass("viewable").attr('disabled','disabled');
                } else {
                    element.removeClass("viewable").addClass("editable").removeAttr('disabled');
                }
          
            });

        }
    });