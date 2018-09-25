"use strict";
angular
    .module('themesApp', [
        'theme',
        'theme.demos',
        'cityModule',
        'districtModule',
        'facilityModule',
        'specialtyModule',
        'agentsModule',
        'doctorsModule',
        'ConfirmationModule',
        'SharedDataModule',
        'SharedDataModule',
        'SharedDataModule',
        'LocalStorageModule',
        'authServiceModule',
        'tokenModule',
        'loginModule',
        
    ])
    .constant('appSettings', {
        //ResourceServerUrl: 'https://localhost:44363/',
        //hubConnectionUrl: 'https://localhost:44363/',              //used in run() function  app.js file
        // cfrtsApiUrl: 'http://localhost:12886/api/',               // used in SignalrDataFactory.js file 
        cfrtsApiUrl: 'http://Api.common-sa.com/api/',               // used in SignalrDataFactory.js file 
        //signalrHubConnection: 'https://localhost:44363/signalr',   // used in SignalrDataFactory.js file
        //identityProvider: 'https://localhost:44317/identity',      // used in common.services.js file and need to modify in callback.html also
        //signalrHubs: 'https://localhost:44363/signalr/hubs',       // used in index.html page
        //apiServiceBaseUri: 'http://localhost:54192/',
        //apiServiceBaseUri: 'http://localhost:12886/',
        apiServiceBaseUri: 'http://Api.common-sa.com/',
        clientId: 'ngAuthApp'
    })
    .config([
        '$provide', '$routeProvider', '$httpProvider', function ($provide, $routeProvider, $httpProvider) {
            'use strict';
            $routeProvider
                .when('/', {
                    templateUrl: 'views/index.html',
                    resolve: {
                        loadCalendar: [
                            '$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'bower_components/fullcalendar/fullcalendar.js',
                                ]);
                            }
                        ]
                    }
                })
                .when('/login', {
                    templateUrl: 'views/extras-login.html',
                    hideMenus: true
                })
                .when('/Cities', {
                    templateUrl: 'views/Settings/Cities.html'
                })
                .when('/Specialties', {
                    templateUrl: 'views/Settings/Specialties.html'
                })
                 .when('/Districts', {
                     templateUrl: 'views/Settings/Districts.html'
                 })       
                  .when('/Facilities', {
                      templateUrl: 'views/Settings/Facilities.html'
                  })
                .when('/Users', {
                    templateUrl: 'views/Settings/Users.html'
                })
                 .when('/Doctors', {
                     templateUrl: 'views/Settings/Doctors.html'
                 })
                .when('/:templateFile', {
                    templateUrl: function (param) {
                        return 'views/' + param.templateFile + '.html';
                    }
                })
                .when('#', {
                    templateUrl: 'views/index.html'
                })
                .otherwise({
                    redirectTo: 'views/extras-login'
                });
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
