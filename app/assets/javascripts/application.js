//= require lodash
//= require jquery
//= require jquery_ujs
//= require foundation
//= require turbolinks
//= require angular
//= require highcharts
//= require highcharts-ng
//= require_self
//= require factories

var load_control = angular.module('load_control', ["highcharts-ng"]).run(['$rootScope', function($rootScope) {
  $rootScope.urlBase = urlBase;
}])
.constant('_', window._);


load_control.controller('dashboard_ctrl', ['$scope', 'measureFactory', function ($scope, measureFactory) {


    measureFactory.find().success(function(data){
      data2 = _.map(data, function (line) {
        return [line.timestamp, line.data1];
      })

      $scope.tempGraphic = {
          series: [
            {
              name: 'Area',
              type: 'areaspline',
              data: data2,
              pointStart: Date.UTC(2011, 0),
              pointInterval: 30 * 24 * 36e5,
              color: '#FF0000',
              negativeColor: '#0088FF'
            }
          ],
          func: function (chart) {
              console.log(chart);
              $scope.chartData = chart;
              $scope.chartExport = $.proxy(chart.exportChart, chart);
          }
      }

    }).error(function(response, status) {
    });



    $scope.gyroGraphic = {
        series: [
          {
            "name": "Some data 2",
            "data": [
              5,
              2,
              2,
              3,
              5
            ],
            "type": "column",
            "id": "series-2"
          }
        ],

        func: function (chart) {
            console.log(chart);
            $scope.chartData = chart;
            $scope.chartExport = $.proxy(chart.exportChart, chart);
        }
    }
}]);
$(function(){ $(document).foundation(); });
