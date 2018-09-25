angular
    .module('SignalrDataModule', [])
    .factory('SignalrDataFactory', ['$rootScope', '$http', 'appSettings', '$location', function ($rootScope, $http, appSettings, $location) {
        var apiUrl = appSettings.cfrtsApiUrl;
       // $.connection.hub.url = appSettings.signalrHubConnection;

        function blockUi() {
            $.blockUI({
                css: {
                    backgroundColor: 'transparent',
                    border: 'none'
                },
                message: '<img src="assets/img/loading.gif" />',
                overlayCSS: { backgroundColor: '#000' }
            });
        }

        function unBlockUi() {
            $.unblockUI();
        }

        var Groups = [
          "CityAllModelsHubPublicGroupName",
          "QuotationAllModelsHubPublicGroupName",
          "ProductsAllModelsHubPublicGroupName",
          'ProductCategoryAllModelsHubPublicGroupName',
          "ProductSubCategoryAllModelsHubPublicGroupName",
          "UnitsAllModelsHubPublicGroupName"

        ];
        var service = {
            GetAll: GetAll,
            GetSingle: GetSingle,
            Post: Post,
            PostWithReturnError: PostWithReturnError,
            Put: Put,
            Delete: Delete,
            PostPaging: PostPaging,
            FetchObject: FetchObject,
            InitateConnection: InitateConnection,
            InvokeClientMethod: InvokeClientMethod,
            InvokeServerMethod: InvokeServerMethod,
            PostById: postbyId

        };

        return service;
        //SingalR
        var proxy;
        function InitateConnection(group) {
            //proxy = $.connection.allmodelsHub;
            //$.connection.hub.start().done(function () {
            //    console.log('Hub Connected');
            //    //proxy.server.jointogroup(group);

            //});

        }

        function InvokeClientMethod(MethodName, CallBack) {
            console.log(MethodName + " Client method is invoked");

            $rootScope.proxy.on(MethodName, CallBack);

        }


        function InvokeServerMethod(MethodName, Groupname, msg) {
            $rootScope.proxy.server[MethodName](Groupname, msg);

        }




        // CRUD Functions
        function GetAll(Url) {
            blockUi();

            return $http.get(apiUrl + Url).then(function (data) {
                unBlockUi();
                return data;
            });
        }
        function GetSingle(Url, ID) {
            blockUi();

            return $http.get(apiUrl + Url + ID).success(function (data) {
                unBlockUi();
                return data;

            });
        }
        function Post(Url, Data) {
            blockUi();

            return $http({
                method: 'POST',
                data: JSON.stringify(Data),
                url: apiUrl + Url,
                contentType: "application/json"
            }).success(function (response) {
                unBlockUi();
                console.log("Data was Edited");
            }).error(function (error) {
                unBlockUi();
                console.log(error);
            });
        }
        function PostWithReturnError(Url, Data) {
            blockUi();

            return $http({
                method: 'POST',
                data: JSON.stringify(Data),
                url: apiUrl + Url,
                contentType: "application/json"
            }).success(function (response) {
                unBlockUi();
               // console.log("Data was Edited");
                return response;
            }).error(function (error) {
                unBlockUi();
                //console.log(error);
                return error;
            });
        }

        function Put(Url, Data) {
            blockUi();

            return $http({
                method: 'POST',
                data: JSON.stringify(Data),
                url: apiUrl + Url,
                contentType: "application/json"
            }).success(function (response) {
                unBlockUi();
                console.log("Data was edited");
            }).error(function (error) {
                unBlockUi();
                console.log(error);

            });
        }

        function PostPaging(Url, Data) {
            blockUi();

            return $http({
                method: 'POST',
                data: JSON.stringify(Data),
                url: apiUrl + Url,
                contentType: "application/json"
            }).success(function (response) {
                unBlockUi();
                return response;
            }).error(function (error) {
                unBlockUi();
                console.log(error);
            });
        }
        function postbyId(Url, ID) {
            blockUi();

            return $http({
                method: 'POST',
              //  data: JSON.stringify(Data),
                url: apiUrl + Url+ID,
                contentType: "application/json"
            }).success(function (response) {
                unBlockUi();
                return response;
            }).error(function (error) {
                unBlockUi();
                console.log(error);
            });
        }

        function Delete(Url, ID) {
            blockUi();

            return $http({
                method: "DELETE",
                url: apiUrl + Url + ID

            }).success(function (response) {
                unBlockUi();
                //return true; // Return true or false to Indicate the success of the post
                console.log("Data was Edited");
            }).error(function (error) {
                unBlockUi();
                console.log(error);
                //return false;
            });
          
        }
        //Paramters : Key , ApiLink
        //This method get the querystring key and return the value then
        //Get the object from the database
        function FetchObject(key, apiLink) {
            var ID = $location.search()[key];
            return GetSingle(apiLink, ID);
        }
    }]);

