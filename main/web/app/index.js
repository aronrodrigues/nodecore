(function () {
  'use strict';

  var app = angular.module('nodeCoreApp', ['ngRoute']);
  app.factory('NodeCoreAPIService', NodeCoreAPIService);
  NodeCoreAPIService.$inject = ['$http'];
  function NodeCoreAPIService ($http) {
    var srvc = this;
    srvc.getMessage = function () {
      return $http.get('/api/');
    }
    return srvc;
  }
  
  app.controller("NodeCoreAPIController", NodeCoreAPIController);
  NodeCoreAPIController.$inject = ['NodeCoreAPIService'];
  function NodeCoreAPIController(NodeCoreAPIService) {
    var ctrl = this;
    ctrl.message = null;
    
    ctrl.getMessage = function () {
      NodeCoreAPIService.getMessage().success(function(data, status, headers, config) {
        ctrl.message = data.message;
      }).
      error(function(data, status, headers, config) {
        alert(data);
      });
    }
    return ctrl;
  };

  app.config(function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/home.html'
      })
      .otherwise({template: '<h1>404: NOT FOUND BUDDY!</h1>'});
    $httpProvider.interceptors.push(function ($q, $location, $rootScope) {
      return {
        request: function (config) {
          /* CHECK TOKEN!
          if (localStorage.token) {
            config.headers['access-token'] = localStorage.token;
          }
          */
          return config;
        },
        responseError: function (response) {
          if (response.status === 401) {
            alert('401');
            $location.path('/');
          }
            return $q.reject(response);
        }
        };
    });
  });
})();
