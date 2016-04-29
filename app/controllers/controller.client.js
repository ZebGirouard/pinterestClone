'use strict';

(function() {
    var app = angular.module('pinterestApp', ['ngRoute', 'wu.masonry']);
        app.directive('onError', function() {
          return {
            restrict:'A',
            link: function(scope, element, attr) {
              element.on('error', function() {
                element.attr('src', attr.onError);
              });
            }
          };
        });    

        app.config(['$routeProvider', '$locationProvider',
          function($routeProvider, $locationProvider) {
            $routeProvider
              .when('/', {
                templateUrl: 'public/templates/allPins.html'
              })
              .when('/myPins', {
                templateUrl: 'public/templates/myPins.html'
              })
              .otherwise({redirectTo: '/'});
        
            $locationProvider.html5Mode({
              enabled: true,
              requireBase: false
            });
        }]);

    app.factory('Authentication', function($http, $window) {
        var saveStatus = function () {
            return $http.get('/api/isLoggedIn');
        };
    
        var getStatus = function () {
          return $window.localStorage['mean-status'];
        };
    
        var logout = function() {
          $window.localStorage.removeItem('mean-status');
        };
    
        var isLoggedIn = function() {
          var status = getStatus();
        
          if(status === "Authenticated!"){
              return true;
          } else {
            return false;
          }
        };
    
        /*var currentUser = function() {
          if(isLoggedIn()){
            var token = getToken();
            var payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);
            return {
              email : payload.email
            };
          }
        }; */
        
        return {
          saveStatus : saveStatus,
          getStatus : getStatus,
          logout : logout,
          isLoggedIn: isLoggedIn
          //currentUser: currentUser
        };
    });
        
        app.controller('pinterestController', function ($scope, $http, $location, $window, Authentication) {
            
            $scope.initPins = function() {
              $scope.getStatus();
              $scope.getPins();
            };
            
            $scope.getStatus = function() {
                Authentication.saveStatus()
                .then(function (response) {
                    $window.localStorage['mean-status'] = response.data;  
                    console.log(response);
                    $scope.isLoggedIn = Authentication.isLoggedIn();
                    console.log($scope.isLoggedIn);                
                });
            };
            
            $scope.addPin = function(pin) {
                console.log("Title: " + pin.title);
                console.log("URL: " + pin.url);
                $http.post('/api/addPin', pin)
                .then(function(response) {
                    console.log(response);
                });
            };

            $scope.removePin = function(pin) {
              $http.post('/api/removePin/', pin)
              .then(function(response) {
                  console.log(response);
                console.log("Pin removed: " + pin.title);
                //socket.emit("clientCall", { message : "Pin removed!" } );
              })
              .catch(function(err) {
                  console.log(err);
              });
            };
            
            $scope.getPins = function() {
                $http.get('/api/pins')
                .then(function(response) {
                    console.log(response);
                    $scope.pins = response.data;
                });
            };
            
            $scope.twitterLogin = function() {
              console.log("Logging in with twitter.");
              $http.get('/login/twitter')
              .then(function(response) {
                  console.log(response);
              });
            };
            
            $scope.logOut = function() {
                Authentication.logout();
                $http.get('/signout')
                .then(function(response) {
                    console.log(response);
                    $scope.getStatus();
                });
            };
            
            /*
            var socket = io.connect($location.origin);
            socket.on("serverResponse", function(data) {
                if(data.message.indexOf("updated") > -1) {
                    $scope.drawChart();
                }
            });
            */
        });
})();