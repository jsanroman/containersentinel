angular.module('load_control')
  .factory('measureFactory', ['$http', '$rootScope', function ($http, $rootScope) {
    var factory = {};

    factory.find = function (params) {
      return $http.get($rootScope.urlBase + '/api/v1/measurements.json', {params: params});
    }

    return factory;
  }])
;
