angular.module("categoryModule", ['ngAnimate',
    'ngGrid',
    'SignalrDataModule'])
   .controller('categoryController', ['$scope', '$filter', '$http', '$q', 'SignalrDataFactory', '$timeout',
function ($scope, $filter, $http, $q, SignalrDataFactory, $timeout) {
    $scope.form = {};
    $scope.newPost = {};
    //-----------------------------

    $scope.PageLabelObj = {
        Dashboard: 'الصفحة الرئيسية',
        header: "إدارة التخصصات",
        add: "إضافة جديد",
        lbladd: "اضافة",
        enterName: "اسم التخصص",
        delete: "حذف",
        deleteselected: "حذف المحدد",
        search: "بحث",
        EditForm: "نموذج التعديل",
        NewForm: "نموذج الاضافة",
        cancel: "إلغاء",
        edit: "تعديل",
        lblrequired: "هذا الحقل مطلوب"
    }



    //Constants (Ng-Hide)
    $scope.resetValidationForm = function () {
        $scope.newPost.Name = null;
        $scope.EditItem.name = null;
        $scope.form.newPost.$setPristine(true);
        $scope.form.newPost.$setUntouched(true);

    }
    $scope.function = true;
    $scope.isEditing = true;
    $scope.showDiv = true;
    $scope.DismissForm = function () {
        $scope.isPosting = true;
        $scope.isEditing = true;
        $scope.showDiv = true;
        $scope.resetValidationForm();

    }
    $scope.showEditDv = function () {
        //Clicked by the Add button
        $scope.isPosting = false;
        $scope.isEditing = true;
        $scope.showDiv = false;

    };
    $scope.canSubmitValidationForm = function () {
        return $scope.form.newPost.$valid;
    }
    $scope.canSubmitValidationFormEdit = function () {
        return $scope.form.EditItem.$valid;
    }

    //$scope.newPost = {};
    $scope.districtSearch = {};
    // add Facility
    $scope.post = function () {


        var specialty = {
            id: null,
            Name: $scope.newPost.Name
        };
        SignalrDataFactory.Post("Categories/SaveCategory/", specialty).then(function (result) {
            if (result.status === 200) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        });


        $scope.isPosting = true;
        $scope.isEditing = true;
        $scope.showDiv = true;
        $scope.newPost = {};
    };
    $scope.ShowError = false;

    //Deleteing all seleceted cities 
    $scope.deleteItem = function () {
        var id = $scope.gridOptions.selectedItems[0].id;
        SignalrDataFactory.Delete('Categories/Delete/', id)
                .then(function (result) {
                    if (result.status === 200)
                        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);

                }, function (error) {
                    if (error.status === 400) {
                        $scope.Error = error.data.message;
                        $scope.ShowError = true;
                        $timeout(function () { $scope.ShowError = false; }, 5000);
                    }
                });
    };


    $scope.EditObj = {};

    //Load Edit
    $scope.loadEditData = function () {
        $scope.isAdding = false;
        $scope.isEdtiing = true;
        var edited = $scope.gridOptions.selectedItems[0];

        $scope.gridOptions.$gridScope.toggleSelectAll(false, false);
        SignalrDataFactory.GetSingle('Categories/', edited.id).then(function (result) {
            $scope.EditItem = result.data;
            $scope.showDiv = false;
            $scope.isPosting = true;
            $scope.isEditing = false;
        });
    }
    //Editing Send
    $scope.editSend = function () {
        var editItem = {
            id: $scope.EditItem.id,
            name: $scope.EditItem.name,
        };



        SignalrDataFactory.Put('Categories/SaveCategory/', editItem).then(function (result) {
            if (result.status === 200) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        });
        $scope.isPosting = true;
        $scope.isEditing = true;
        $scope.showDiv = true;
    }





    //-----------------------------------------------------------------
    //----------------------- NG-GRID CONFIGURATION -------------------
    //$scope.MainData is the Array containing the elements in the grid-
    $scope.MainData = [];
    $scope.filterOptions = {
        filterText: '',
        isdeleted: false,
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [10, 25, 50, 100],
        pageSize: 10,
        currentPage: 1
    };
    $scope.setPagingData = function (data, page, pageSize) {
        $scope.myData = data;
        $scope.totalServerItems = pageSize;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };


    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        // setTimeout(function () {
        var filteredtext = null;
        if (searchText != null) filteredtext = searchText.toLowerCase();
        var pagingViewModel = {
            pageNumber: page,
            pageSize: pageSize,
            SearchTerm: searchText
        };

        var data;
        $scope.MainData = [];
        SignalrDataFactory.PostPaging('Categories/FullSearch', pagingViewModel).then(function (result) {
            $scope.MainData = result.data.items;
            $scope.totalServerItems = result.data.totalCount;
            $scope.setPagingData($scope.MainData, result.data.page, result.data.totalCount);


        });
    }

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {

        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
        multiSelect: false,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        selectedItems: [],
        columnDefs:
        [
           
            { field: 'name', displayName: 'اسم التخصص' },        
            { displayName: 'المسلسل', cellTemplate: '<div>{{$parent.$index + 1}}</div>' }
        ]
    };


}]);