angular.module('load_control')
  .factory('measureFactory', ['$http', function ($http) {
    var factory = {};

    factory.find = function (key) {
      return $http.get($rootScope.urlBase + '/api/v1/measures.json');
    }

    return factory;
  }])
;
