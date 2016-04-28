'use strict';

(function() {
    var app = angular.module('pinterestApp', []);
        app.controller('pinterestController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
            $scope.addPin = function(pinName) {
                console.log(pinName);
                $http.post('/api/addPin/'+pinName)
                .then(function(response) {
                    console.log(response);
                });
            };
            
            $scope.pins = {};
            
            /*
            var socket = io.connect($location.origin);
            socket.on("serverResponse", function(data) {
                if(data.message.indexOf("updated") > -1) {
                    $scope.drawChart();
                }
            });
            
            $scope.drawChart = function () {
                $scope.stockObjects = [];
                $http.get('/api/stocks')
                .then(function(response) {
                    for (var i = 0; i < response.data.length; i++) {
                        $scope.stockObjects.push({name: response.data[i].stock_name.toUpperCase()});                        
                    }
        
                    var seriesOptions = [],
                        seriesCounter = 0;
                
                    /**
                     * Create the chart when all data is loaded
                     * @returns {undefined}
                     */
                     /*
                    function createChart() {
                
                        $('#stockChart').highcharts('StockChart', {
                
                            rangeSelector: {
                                selected: 4
                            },
                
                            yAxis: {
                                labels: {
                                    formatter: function () {
                                        return (this.value > 0 ? ' + ' : '') + this.value + '%';
                                    }
                                },
                                plotLines: [{
                                    value: 0,
                                    width: 2,
                                    color: 'silver'
                                }]
                            },
                
                            plotOptions: {
                                series: {
                                    compare: 'percent'
                                }
                            },
                
                            tooltip: {
                                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                                valueDecimals: 2
                            },
                
                            series: seriesOptions
                        });
                    }
                
                    $.each($scope.stockObjects, function (i, stock) {
                
                        $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=' + stock.name.toLowerCase() + '-c.json&callback=?',    function (data) {
                            seriesOptions[i] = {
                                name: stock.name,
                                data: data
                            };
                
                            // As we're loading the data asynchronously, we don't know what order it will arrive. So
                            // we keep a counter and create the chart when all the data is loaded.
                            seriesCounter += 1;
                
                            if (seriesCounter === $scope.stockObjects.length) {
                                createChart();
                            }
                        });
                    });
            
                });    
            };
            
            $scope.drawChart();
            
            $scope.addStock = function(stockSymbol) {
              $http.post('/api/addStock/'+stockSymbol)
              .then(function(response) {
    		    if (response.data.indexOf("Failed") > -1) {
        		    $('form.btn-container').prepend('<div class="error">Incorrect or non-existent stock code.</div>');
        		    setTimeout(function(){
                        $('.error').fadeOut("slow");
                    },3000);    		        
    		    }
                else if (response.data.indexOf("already") > -1) {
        		    $('form.btn-container').prepend('<div class="error">Stock already in chart.</div>');
        		    setTimeout(function(){
                        $('.error').fadeOut("slow");
                    },3000);                      
                }
                else {
                    socket.emit("clientCall", { message : "Stock added!" } );
                }
              })
              .catch(function(err) {
                console.log(err);
              });
            };
            
            $scope.removeStock = function(stockSymbol) {
              $http.post('/api/removeStock/'+stockSymbol)
              .then(function(response) {
                socket.emit("clientCall", { message : "Stock removed!" } );
              })
              .catch(function(err) {
                  console.log(err);
              });
            };
            */
        }]);
})();