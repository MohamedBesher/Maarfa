angular
    .module('summaryModule', [
    'ngAnimate',
    'ngGrid',
    'SignalrDataModule',
    'naif.base64',
    'angularModalService',
    'ngYoutubeEmbed'
])
  .controller('summaryController', ['$scope', '$filter', '$http', '$q', 'SignalrDataFactory','ModalService','appSettings',
function ($scope, $filter, $http, $q, SignalrDataFactory, ModalService, appSettings) {
    $scope.apiUrl = appSettings.apiServiceBaseUri;

          var uploadedCount = 0;
          $scope.PageLabelObj = {
              Dashboard: 'الصفحة الرئيسية',
              header: "إدارة الملخصات",
              add: "إضافة ملخص",
              delete: "حذف",
              lbladd: "اضافة",
              lblbooksOnly: "Pdf - Word - txt",
              enterName: "اسم الملخص",
              enterCategory: "فئة الملخص",
              enterLink: "رابط الملخص",
              enterImage: "صورة الملخص",
              enterFilePath: "الملخص",
              List: "قائمة الملخصات",
              lblrequired:"هذا الحقل مطلوب",
              lblImagesOnly: "يمكنك رفع الصور فقط",
              lbledit: "نموذج التعديل",
              deleteselected: "حذف المحدد",
              RequireNote: 'حميع الحقول التي تحتوي على علامة * مطلوبة',
              search: "بحث",
              EditForm: "نموذج التعديل",
              NewForm: "نموذج الاضافة",
              lblPhoneNumber: " رقم الهاتف",
              cancel: "إلغاء",
              edit: "تعديل",
              accountType: [{ name: "الحساب موقوف", id: true },
                           { name: "الحساب مفعل", id: false }],
              approveType: [{ key: "تم قبول الاضافة", value: true },
                            { key: "تم رفض الاضافة", value: false }],
              lblAccountType: "اختر حالة الحساب",
              lockout: function (status) {
                  if (status)
                      return '<span class="label label-success" ng-show="true"></span>';
                  else
                      return '<span class="label label-danger" ng-show="false"></span>';
              },
              DrpCategory:"اختر تصنيف الملخص"
          }
          $scope.form = {};
          $scope.newPost = {};
          $scope.EditItem = {};
          $scope.isPosting = true;
          $scope.isEditing = true;
          $scope.showDiv = true;
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
          $scope.ClearImage=function() {
              $scope.newPost.Image = null;
              $scope.newPost.Image.base64 = null;

          }
         

          $scope.post = function () {
              var video = {
                  Id: 0,
                  Name: $scope.newPost.Name,
                  Imgfilename: $scope.newPost.Image.filename,
                  Image64: $scope.newPost.Image.base64,                 
                  CategoryId: $scope.newPost.categoryId
              };

              SignalrDataFactory.Post("Summaries/SaveSummary/", video).
              then(function (result) {
                  if (result.status === 200) {
                      $scope.getPagedDataAsync($scope.pagingOptions.pageSize,
                                            $scope.pagingOptions.currentPage,
                                            $scope.filterOptions.filterText, $scope.filterOptions.categoryId);
                      $scope.isPosting = true;
                      $scope.isEditing = true;
                      $scope.showDiv = true;
                      $scope.newPost = {};
                  }
              },
              function (error) {
                  if (error.status === 400)
                      $scope.showErrors = true;
                      $scope.newPostError = error.data.modelState;

              });          
          };

          $scope.delete = function (id) {              
              SignalrDataFactory.Delete('Summaries/Delete/', id).then(function (result) {
                    
                      if (result.status === 200) {
                          $scope.getPagedDataAsync($scope.pagingOptions.pageSize,
                                                                    $scope.pagingOptions.currentPage,
                                                                    $scope.filterOptions.filterText, $scope.filterOptions.categoryId);
                      }
         
                  });
          };

          $scope.cityEditObj = {};
          $scope.Categories = {};
          SignalrDataFactory.GetAll("Categories/GetAll").then(function (result) {
              $scope.Categories = result.data;
          });
          //Load Edit
          $scope.loadEditData = function (id) {                     
              SignalrDataFactory.GetSingle('Summaries/', id).then(function (result) {
                  $scope.EditItem = result.data;
                  $scope.showDiv = false;
                  $scope.isPosting = true;
                  $scope.isEditing = false;
              });
          }
          //Editing Send
          $scope.editCitySend = function () {
              var edit = {
                id: $scope.EditItem.id,                 
                Name: $scope.EditItem.name,
                Link: $scope.EditItem.embed,
                Embed: $scope.EditItem.embed,
                Slogon: $scope.EditItem.image,
                image: $scope.EditItem.image,
                Imgfilename: $scope.EditItem.uploadimage == null ? null : $scope.EditItem.uploadimage.filename,
                Image64: $scope.EditItem.uploadimage == null ? null : $scope.EditItem.uploadimage.base64,
                CategoryId: $scope.EditItem.categoryId
              };
              SignalrDataFactory.Post('Summaries/SaveSummary/', edit).then(function (result) {
                  // TODO ::
                  if (result.status === 200) {                     
                      $scope.getPagedDataAsync($scope.pagingOptions.pageSize,
                                                $scope.pagingOptions.currentPage,
                                                $scope.filterOptions.filterText,
                                                $scope.filterOptions.categoryId);
                      $scope.isPosting = true;
                      $scope.isEditing = true;
                      $scope.showDiv = true;
                  }
              }, function (error) {
                  if (error.status === 400)
                  {
                      $scope.showErrorsEdit = true;
                      $scope.EditPostError = error.data.modelState;
                    }
              });
            
          }
         
          $scope.MainData = [];
          $scope.filterOptions = {
              filterText: '',
              categoryId:null,
              useExternalFilter: true
          };
          $scope.totalServerItems = 0;
          $scope.pagingOptions = {
              pageSizes: [12, 18, 24, 30,36],
              pageSize: 12,
              currentPage: 1
          };
          $scope.setPagingData = function (data, page, pageSize) {
              //var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
              $scope.myData = data;
              $scope.totalServerItems = pageSize;
              if (!$scope.$$phase) {
                  $scope.$apply();
              }
          };
          $scope.getPagedDataAsync = function (pageSize, page, searchText, categoryId) {
              var filteredtext = null;
              if (searchText != null) filteredtext = searchText.toLowerCase();
              var pagingViewModel = {
                  pageNumber: $scope.pagingOptions.currentPage,
                  pageSize: $scope.pagingOptions.pageSize,
                  SearchTerm: searchText,
                  CategoryId: categoryId
              };
                  var data;
                  SignalrDataFactory.PostPaging('Summaries/FullSearch', pagingViewModel).then(function (result) {
                      $scope.MainData = result.data.items;
                      $scope.totalPages = result.data.totalPages;
                      $scope.totalServerItems = result.data.totalCount;
                      $scope.setPagingData($scope.MainData, result.data.page, result.data.totalCount);


              });
          };

          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
          $scope.$watch('pagingOptions', function (newVal, oldVal) {
              if (newVal !== oldVal) {
                  $scope.getPagedDataAsync($scope.pagingOptions.pageSize,
                                            $scope.pagingOptions.currentPage,
                                            $scope.filterOptions.filterText, $scope.filterOptions.categoryId);
              }
          }, true);
          $scope.$watch('filterOptions', function (newVal, oldVal) {
              if (newVal !== oldVal) {
                  $scope.getPagedDataAsync($scope.pagingOptions.pageSize,
                                          $scope.pagingOptions.currentPage,
                                          $scope.filterOptions.filterText, $scope.filterOptions.categoryId);
              }
          }, true);         
          $scope.yesNoResult = null;
          $scope.complexResult = null;
          $scope.customResult = null;
         
          $scope.show = function (selected) {
              
              ModalService.showModal({
                  templateUrl: 'modal.html',
                  controller: "ModalController",
                  inputs: {
                      item: selected,
                      url: $scope.apiUrl
          }
              }).then(function (modal) {
                  modal.element.modal();
                  modal.close.then(function (result) {
                      $scope.message = "You said " + result;
                  });
              });
          };


      }])
    .controller('ModalController', ['$scope', 'close', 'item', 'url', function ($scope, close, item, url) {
        $scope.imagepath = url + item.image;
        $scope.details = item;
          $scope.close = function(result) {
              close(result, 500); // close, but give 500ms for bootstrap to animate
          };


      }]);;