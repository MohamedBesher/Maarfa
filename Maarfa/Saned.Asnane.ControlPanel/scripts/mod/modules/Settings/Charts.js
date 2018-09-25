angular
  .module('theme.demos.canvas_charts', [
    'theme.chart.canvas',
    "ng-fusioncharts"
  ])
  .
controller('CanvasChartsController', [
    '$scope', '$http', 'SignalrDataFactory', '$ocLazyLoad',
    function ($scope, $http, SignalrDataFactory, $ocLazyLoad) {
        'use strict';


        $scope.doughnutData = {};

        $scope.myDataSource = {};


        // $scope.doughnutData = {};
        SignalrDataFactory.GetAll("Charts/AccountTypesChart/").then(function (result) {
            if (result.status === 200) {
                // $scope.doughnutData[1].value = 100;            
                $scope.doughnutData = result.data;
                var total = "اجمالى المستخدمين:" + result.data[0].totalUsers;
                $scope.myDataSource = {
                    "chart": {
                        "caption": "اجمالى عدد المستخدمين ",
                        "subCaption": "فى النظام",
                       // "numberPrefix": "$",
                        "paletteColors": "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000",
                        "bgColor": "#ffffff",
                        "showBorder": "0",
                        "use3DLighting": "0",
                        "showShadow": "0",
                        "enableSmartLabels": "0",
                        "startingAngle": "310",
                        "showLabels": "0",
                        "showPercentValues": "1",
                        "showLegend": "1",
                        "legendShadow": "0",
                        "legendBorderAlpha": "0",
                        "defaultCenterLabel": total,
                        "centerLabel": "اجمالى  $label: $value",
                        "centerLabelBold": "1",
                        "showTooltip": "0",
                        "decimals": "0",
                        "captionFontSize": "14",
                        "subcaptionFontSize": "14",
                        "subcaptionFontBold": "0"
                    },
                    "data": $scope.doughnutData
                };
            }
        });


        //$scope.doughnutData = [{"value":0.0,"label":0,"color":"#3349F3","accountType":"User"},{"value":40.0,"label":1,"color":"#C2765E","accountType":"Doctor"},{"value":280.0,"label":7,"color":"#8303EB","accountType":"Agent"},{"value":40.0,"label":1,"color":"#E1ABB2","accountType":"Administrator"}];
        //$ocLazyLoad.load([
        //                'bower_components/Chart.js/Chart.min.js'
        //]);
        //$scope.doughnutData = [
        //    {
        //        "value": 3,
        //        "label": 200,
        //        "color": '#F7464A'
        //    },
        //{
        //    "value": 4,
        //    "label": 200,
        //    "color": '#46BFBD'
        //}, {
        //    value: 5,
        //    label: 200,
        //    color: '#FDB45C'
        //}, {
        //    value: 40,
        //    label: 200,
        //    color: '#949FB1'
        //}, {
        //    value: 50,
        //    label: 200,
        //    color: '#4D5360'
        //}];
    }
]);
