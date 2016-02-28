//= require jquery
//= require jquery_ujs
//= require foundation
//= require turbolinks
//= require angular
//= require highcharts
//= require highcharts-ng
//= require lodash
//= require moment
//= require_self
//= require factories

var load_control = angular.module('load_control', ["highcharts-ng"]).run(['$rootScope', function($rootScope) {
  $rootScope.urlBase = urlBase;
}])
.constant('_', window._);


load_control.controller('dashboard_ctrl', ['$scope', 'measureFactory', '$interval', function ($scope, measureFactory, $interval) {
    $scope.begin_date = moment().subtract(1, 'hours').format('YYYY-MM-DD, HH:MM:SS');
    $scope.end_date   = moment().format('YYYY-MM-DD, HH:MM:SS');

    $scope.temp_data = []
    $scope.loading = false;

    var reload_temp = function(begin_date, end_date) {
      $scope.loading = true;
      measureFactory.find({kind: 'temp', begin_date: begin_date, end_date: end_date}).success(function(data){
        _data = _.map(data, function (line) {
          return [line.timestamp, line.data1];
        })

        $scope.tempGraphic.series[0].data = _data;
        $scope.loading = false;
      }).error(function(response, status) {
      });
    }

    var reload_accel = function(begin_date, end_date) {
      $scope.loading = true;
      measureFactory.find({kind: 'accel', begin_date: begin_date, end_date: end_date}).success(function(data){
        _timestamp = _.map(data, function(line) {
          return Highcharts.dateFormat('%H:%M:%S', line.timestamp)
        });
        _data1 = _.map(data, 'data1')
        _data2 = _.map(data, 'data2')
        _data3 = _.map(data, 'data3')


        $scope.accelGraphic.xAxis.categories = _timestamp;
        $scope.accelGraphic.series[0].data = _data1;
        $scope.accelGraphic.series[1].data = _data2;
        $scope.accelGraphic.series[2].data = _data3;

        $scope.loading = false;
      }).error(function(response, status) {
      });
    }

    var reload_gyro = function(begin_date, end_date) {
      $scope.loading = true;
      measureFactory.find({kind: 'gyro', begin_date: begin_date, end_date: end_date}).success(function(data){
        _timestamp = _.map(data, function(line) {
          return Highcharts.dateFormat('%H:%M:%S', line.timestamp)
        });
        _data1 = _.map(data, 'data1')
        _data2 = _.map(data, 'data2')
        _data3 = _.map(data, 'data3')

        $scope.gyroGraphic.xAxis.categories = _timestamp;
        $scope.gyroGraphic.series[0].data = _data1;
        $scope.gyroGraphic.series[1].data = _data2;
        $scope.gyroGraphic.series[2].data = _data3;

        $scope.loading = false;
      }).error(function(response, status) {
      });
    }

    $scope.search = function() {
      reload_temp($scope.begin_date, $scope.end_date);
      reload_accel($scope.begin_date, $scope.end_date);
      reload_gyro($scope.begin_date, $scope.end_date);
    }

    $scope.tempGraphic = {
        title: {
            text: 'Temperatura'
        },
        xAxis: {        
            type: 'datetime',
            labels: {
                formatter: function() {
                    return Highcharts.dateFormat('%H:%M:%S', this.value);
                }
            }
        },
        series: [
          {
            name: 'Temperatura',
            type: 'areaspline',
            data: [],
            pointStart: Date.UTC(2011, 0),
            pointInterval: 36e5,
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
        xAxis: {
          categories: [],
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
          name: 'Eje X',
        }, {
          type: 'column',
          name: 'Eje Y',
        }, {
          type: 'column',
          name: 'Eje Z',
        }
        ]
    }

    $scope.gyroGraphic = {
        title: {
            text: 'Giroscopio'
        },
        xAxis: {
          categories: [],
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
          name: 'Eje X',
        }, {
          type: 'column',
          name: 'Eje Y',
        }, {
          type: 'column',
          name: 'Eje Z',
        }
        ]
    }

    $scope.search();
    $interval(function() {
      $scope.search();
    }, 10000);

}]);
$(function(){ $(document).foundation(); });
