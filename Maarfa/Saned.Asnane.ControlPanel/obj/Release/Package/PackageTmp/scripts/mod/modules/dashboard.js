angular.module('theme.demos.dashboard', [
    'angular-skycons',
    'theme.demos.forms',
    'theme.demos.tasks'
  ])
  .controller('DashboardController', ['$scope','SignalrDataFactory', function($scope,SignalrDataFactory) {
    'use strict';
        $scope.PageLabelObj = {
            Dashboard: 'الصفحة الرئيسية',
            doctors:'عدد الأطباء',
            agents:'عدد المسوقين',
            Users: 'عدد المستخدمين',
            lockedOutUsersNumbers: 'عدد الموقوفين',
            approvedAgentNumbers: 'عدد المسوقين المفعلين',
            socialUsers: 'عدد المسجلين من شبكات التواصل',
            facilitiesNumbers: 'عددالمستشفيات المسجلة',
            abuseReportNumbers: 'عددالشكاوى'
                };
             $scope.data = {};
             SignalrDataFactory.GetAll("Charts/GetUsersNumbers").then(function (result) {
                 $scope.data = result.data;
                });

        


    
  }]);

