angular.module('load_control')
  .factory('measureFactory', ['$http', '$rootScope', function ($http, $rootScope) {
    var factory = {};

    factory.find = function (key) {
      return $http.get($rootScope.urlBase + '/api/v1/measurements.json');
    }

    return factory;
  }])
;
