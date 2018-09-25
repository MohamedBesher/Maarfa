"use strict";
angular
    .module('themesApp', [
        'theme',
        'theme.demos',
        "theme.demos.canvas_charts",
        'ngYoutubeEmbed',
        'booksModule',                 
        'videosModule',
        'summaryModule',
        'contactUsModule',
        'UploadModule',
        'ConfirmationModule',
        'SharedDataModule',
        'SharedDataModule',
        'SharedDataModule',
        'LocalStorageModule',
        'authServiceModule',
        'tokenModule',
        'loginModule',
        "ng-fusioncharts",
        'angularModalService'


    ])
    .constant('appSettings', {
        //ResourceServerUrl: 'https://localhost:44363/',
        //hubConnectionUrl: 'https://localhost:44363/',              //used in run() function  app.js file
        //cfrtsApiUrl: 'http://localhost:12886/api/',               // used in SignalrDataFactory.js file 
        cfrtsApiUrl: 'http://maarfaapi.saned-projects.com/api/',               // used in SignalrDataFactory.js file 
        //signalrHubConnection: 'https://localhost:44363/signalr',   // used in SignalrDataFactory.js file
        //identityProvider: 'https://localhost:44317/identity',      // used in common.services.js file and need to modify in callback.html also
        //signalrHubs: 'https://localhost:44363/signalr/hubs',       // used in index.html page
        //apiServiceBaseUri: 'http://localhost:54192/',
       // apiServiceBaseUri: 'http://localhost:12886/',
        apiServiceBaseUri: 'http://maarfaapi.saned-projects.com/',
              clientId: 'ngAuthApp'
    })
    .config([
        '$provide', '$routeProvider', '$httpProvider', '$sceDelegateProvider',
        function ($provide, $routeProvider, $httpProvider, $sceDelegateProvider) {
            'use strict';
            $routeProvider
                .when('/', {
                    templateUrl: 'views/Settings/Books.html',
                    resolve: {
                        loadCalendar: [
                            '$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'bower_components/fullcalendar/fullcalendar.js',
                                    //'bower_components/Chart.js/Chart.min.js'

                                ]);
                            }
                        ]
                    }
                })
                .when('/login', {
                    templateUrl: 'views/extras-login.html',
                    hideMenus: true
                })
                .when('/Books', {
                    templateUrl: 'views/Settings/Books.html'
                })
                .when('/Videos', {
                    templateUrl: 'views/Settings/Videos.html'
                })
                .when('/Summaries', {
                      templateUrl: 'views/Settings/Summaries.html'
                })
                 .when('/ContactUs', {
                     templateUrl: 'views/Settings/ContactUs.html'
                 })
                     .when('/Comments', {
                         templateUrl: 'views/Settings/Comments.html'
                     })
                 .when('/Uploads', {
                     templateUrl: 'views/Settings/Upload.html'
                 })
                .when('/:templateFile', {
                    templateUrl: function (param) {
                        return 'views/' + param.templateFile + '.html';
                    }
                })
                .when('#', {
                    templateUrl: 'views/Settings/Books.html'
                })
                .otherwise({
                    redirectTo: 'views/extras-login'
                });

            $sceDelegateProvider.resourceUrlWhitelist([
               'self',
               'https://www.youtube.com/**'
            ]);

            $httpProvider.interceptors.push('authInterceptorService');
            //$httpProvider.interceptors.push('authInterceptor');
        }
    ])
    .run(['authService', function (authService) {
        authService.fillAuthData();
    }]);

/* .run(['$rootScope', '$location', '$cookieStore', '$http',
 function ($rootScope, $location, $cookieStore, $http) {

     $rootScope.globals2 = $cookieStore.get('token') || {};
     if ($rootScope.globals2.currentToken) {
         $http.defaults.headers.common['Authorization'] = 'bearer ' + $rootScope.globals2.currentToken.token;
     }

     $rootScope.$on('$locationChangeStart', function (event, next, current) {
         console.log("---Trace App-- In Run $locationChangeStart ");
         // redirect to login page if not logged in
         if ($location.path() !== '/login' && !$rootScope.globals2.currentToken) {
             $location.path('/login');
         }
         else
             if ($location.path() === '/login' && $rootScope.globals2.currentToken) {
                 $location.path('/');
             }
     });


 }]);*/
