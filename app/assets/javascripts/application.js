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


load_control.controller('dashboard_ctrl', ['$scope', 'measureFactory', '$interval', function ($scope, measureFactory, $interval) {
    $scope.temp_data = []

    var reload_temp = function() {
      measureFactory.find({kind: 'temp'}).success(function(data){
        _data = _.map(data, function (line) {
          return [line.timestamp, line.data1];
        })

        $scope.tempGraphic.series[0].data = _data;
      }).error(function(response, status) {
      });
    }

    var reload_accel = function() {
      measureFactory.find({kind: 'accel'}).success(function(data){
        _timestamp = _.map(data, 'timestamp')
        _data1 = _.map(data, 'data1')
        _data2 = _.map(data, 'data2')
        _data3 = _.map(data, 'data3')

        $scope.accelGraphic.series[0].data = _data1;
        $scope.accelGraphic.series[1].data = _data2;
        $scope.accelGraphic.series[2].data = _data3;

        $scope.accelGraphic.xAxis.categories = _timestamp;
      }).error(function(response, status) {
      });
    }


    $scope.tempGraphic = {
        series: [
          {
            name: 'Area',
            type: 'areaspline',
            data: [],
            pointStart: Date.UTC(2011, 0),
            pointInterval: 30 * 24 * 36e5,
            color: '#FF0000',
            negativeColor: '#0088FF',
          }
        ],
        func: function (chart) {
            console.log(chart);
            $scope.chartData = chart;
            $scope.chartExport = $.proxy(chart.exportChart, chart);
        }
    }

    $scope.accelGraphic = {
        yAxis: {
            min: 0,
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
            }
        },
        series: [{
          type: 'column',
          name: 'Eje 1',
        }, {
          type: 'column',
          name: 'Eje 2',
        }, {
          type: 'column',
          name: 'Eje 3',
        }
        ]
    }

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

    reload_accel();
    reload_temp();
    $interval(function() {
      reload_temp();
      reload_accel();
    }, 5000);


}]);
$(function(){ $(document).foundation(); });
