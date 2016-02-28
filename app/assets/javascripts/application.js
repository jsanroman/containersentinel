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
    $scope.begin_date = moment().subtract(1, 'hours').format('YYYY-MM-DD, hh:mm:ss');
    $scope.end_date   = moment().format('YYYY-MM-DD, hh:mm:ss');

    $scope.temp_data = []

    var reload_temp = function(begin_date, end_date) {
      measureFactory.find({kind: 'temp', begin_date: begin_date, end_date: end_date}).success(function(data){
        _data = _.map(data, function (line) {
          return [line.timestamp, line.data1];
        })

        $scope.tempGraphic.series[0].data = _data;
      }).error(function(response, status) {
      });
    }

    var reload_accel = function(begin_date, end_date) {
      measureFactory.find({kind: 'accel', begin_date: begin_date, end_date, end_date}).success(function(data){
        _timestamp = _.map(data, 'timestamp')
        _data1 = _.map(data, 'data1')
        _data2 = _.map(data, 'data2')
        _data3 = _.map(data, 'data3')

        $scope.accelGraphic.series[0].data = _data1;
        $scope.accelGraphic.series[1].data = _data2;
        $scope.accelGraphic.series[2].data = _data3;

        // $scope.accelGraphic.xAxis.categories = _timestamp;
      }).error(function(response, status) {
      });
    }

    var reload_gyro = function(begin_date, end_date) {
      measureFactory.find({kind: 'gyro', begin_date: begin_date, end_date: end_date}).success(function(data){
        _timestamp = _.map(data, 'timestamp')
        _data1 = _.map(data, 'data1')
        _data2 = _.map(data, 'data2')
        _data3 = _.map(data, 'data3')

        $scope.gyroGraphic.series[0].data = _data1;
        $scope.gyroGraphic.series[1].data = _data2;
        $scope.gyroGraphic.series[2].data = _data3;

        // $scope.gyroGraphic.xAxis.categories = _timestamp;
      }).error(function(response, status) {
      });
    }

    $scope.search = function(begin_date, end_date) {
      reload_temp(begin_date, end_date);
      reload_accel(begin_date, end_date);
      reload_gyro(begin_date, end_date);
    }

    $scope.tempGraphic = {
        title: {
            text: 'Temperatura'
        },
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
        title: {
            text: 'Acelerómetro'
        },
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
        title: {
            text: 'Giroscopio'
        },
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

    $scope.search($scope.begin_date, $scope.end_date);
    $interval(function() {
      $scope.search($scope.begin_date, $scope.end_date);
    }, 10000);

}]);
$(function(){ $(document).foundation(); });
