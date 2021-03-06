angular
    .module('booksModule', [
    'ngAnimate',
    'ngGrid',
    'SignalrDataModule',
    'naif.base64',
    'angularModalService'
])
  .controller('bookController', ['$scope', '$filter', '$http', '$q', 'appSettings', 'SignalrDataFactory', 'ModalService',
      function ($scope, $filter, $http, $q, appSettings, SignalrDataFactory, ModalService) {
          var uploadedCount = 0;
          $scope.apiUrl = appSettings.apiServiceBaseUri;

          $scope.PageLabelObj = {
              Dashboard: 'الصفحة الرئيسية',
              header: "إدارة الكتب",
              add: "إضافة كتاب",
              delete: "حذف",
              lbladd: "اضافة",
              lblbooksOnly: "Pdf-Word-Excel-PowerPoint الامتدادات المدعومة",
              enterName: "اسم الكتاب",
              enterCategory: "فئة الكتاب",
              enterDescription: "وصف الكتاب",
              enterImage: "صورة الكتاب",
              enterFilePath: "الكتاب",
              List: "قائمة الكتب",
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
              DrpCategory:"اختر تصنيف الكتاب"
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
              $scope.newPost = {};
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
              $scope.cityEditObj = {};
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

          $scope.newPost = {};

          $scope.post = function () {
              var book = {
                  Id: 0,
                  Name: $scope.newPost.Name,
                  Description: $scope.newPost.Description,
                  Imgfilename: $scope.newPost.Image.filename,
                  Image64: $scope.newPost.Image.base64,
                  DownloadLink64: $scope.newPost.FilePath.base64,
                  DownloadLinkfilename: $scope.newPost.FilePath.filename,
                  CategoryId: $scope.newPost.categoryId
              };

              SignalrDataFactory.Post("Books/SaveBook/", book).then(function (result) {
                  if (result.status === 200) {
                      $scope.getPagedDataAsync($scope.pagingOptions.pageSize,
                                            $scope.pagingOptions.currentPage,
                                            $scope.filterOptions.filterText, $scope.filterOptions.categoryId);
                      $scope.isPosting = true;
                      $scope.isEditing = true;
                      $scope.showDiv = true;
                      $scope.newPost = {};
                  }
              },function (error) {
                  if (error.status === 400)
                      $scope.showErrors = true;
                      $scope.newPostError = error.data.modelState;

              });


          
          };

          $scope.delete = function (id) {
              //alert(event.target.id);
                  //var id = $scope.gridOptions.selectedItems[0].id;
            SignalrDataFactory.Delete('Books/Delete/', id).then(function (result) {
                    
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
              SignalrDataFactory.GetSingle('Books/', id).then(function (result) {
                  $scope.EditItem = result.data;
                  $scope.EditItem.image = null;
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
                Description: $scope.EditItem.description,
                Slogon: $scope.EditItem.slogon,
                Imgfilename: $scope.EditItem.image == null ? null : $scope.EditItem.image.filename,
                Image64: $scope.EditItem.image == null ? null : $scope.EditItem.image.base64,
                DownloadLink: $scope.EditItem.downloadLink,
                DownloadLink64: $scope.EditItem.filePath == null ? null : $scope.EditItem.filePath.base64,
                DownloadLinkfilename: $scope.EditItem.filePath == null ? null : $scope.EditItem.filePath.filename,
                CategoryId: $scope.EditItem.categoryId
              };
              // TODO :: 


              SignalrDataFactory.Post('Books/SaveBook/', edit).then(function (result) {
                  // TODO ::
                  if (result.status === 200) {
                      
                      $scope.getPagedDataAsync($scope.pagingOptions.pageSize,
                                                                $scope.pagingOptions.currentPage,
                                                                $scope.filterOptions.filterText, $scope.filterOptions.categoryId);
                  }
              }, function (error) {
                  if (error.status === 400)
                  {
                      $scope.showErrorsEdit = true;
                      $scope.EditPostError = error.data.modelState;
                    }
              });
              $scope.isPosting = true;
              $scope.isEditing = true;
              $scope.showDiv = true;
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
                  SignalrDataFactory.PostPaging('Books/FullSearch', pagingViewModel).then(function (result) {
                      $scope.MainData = result.data.items;
                      $scope.totalPages = result.data.totalPages;
                  $scope.totalServerItems = result.data.totalCount;
                  $scope.setPagingData($scope.MainData, result.data.page, result.data.totalCount);


              });
              //}, 100);
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
                  templateUrl: 'Bookmodal.html',
                  controller: "BookModalController",
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
    .controller('BookModalController', ['$scope', 'close', 'item', 'url', function ($scope, close, item, url) {
        $scope.imagepath = url + item.image;
        $scope.downloadbook = url + item.downloadLink;
        $scope.details = item;
          $scope.close = function(result) {
              close(result, 500); // close, but give 500ms for bootstrap to animate
          };

      }]);;