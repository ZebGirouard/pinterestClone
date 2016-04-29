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
        
        app.controller('pinterestController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
            
            $scope.init = function() {
                $scope.getPins();
                /*$(document).ready( function() {
                
                    var elem = document.querySelector('.pinsContainer');
                    console.log(elem);
                    var msnry = new Masonry( elem, {
                      // options
                      itemSelector: '.pinBlock'
                    });   
                    
                    $('.pinsContainer').masonry({
                      // options
                      itemSelector: '.pinBlock'
                    });                    
                });*/
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
            /*
            var socket = io.connect($location.origin);
            socket.on("serverResponse", function(data) {
                if(data.message.indexOf("updated") > -1) {
                    $scope.drawChart();
                }
            });
            */
        }]);
})();