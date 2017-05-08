angular.module('App')
.controller('RatesController', function ($scope, $http, $ionicPopover, $interval, Currencies) {
  
  $scope.currencies = Currencies;

  $ionicPopover.fromTemplateUrl('views/rates/help-popover.html', {
    scope: $scope,
  }).then(function (popover) {
    $scope.popover = popover;
  });
  $scope.openHelp = function($event) {
    $scope.popover.show($event);
  };
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });

  $scope.load = function () {
    $http.get('https://api.bitcoinaverage.com/ticker/all').success(function (tickers) {
      angular.forEach($scope.currencies, function (currency) {
        currency.ticker = tickers[currency.code];
        currency.ticker.timestamp = new Date(currency.ticker.timestamp);
        Updated {{rc.currencies[0].ticker.timestamp | date:'mediumTime'}}
      });
    }).finally(function () {
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.loadSchedule = function(){
  $scope.load();
};

  var promise = $interval($scope.loadSchedule, 60* 1000);
  
  $scope.load();
});
