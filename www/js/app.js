// Ionic Starter App
// Twitter client by Martin
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter',['ionic', 'starter.controllers', 'ngCordova', 'ngTwitter'])

  .run(function($ionicPlatform, $window, $rootScope) {
    console.log("martin");
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
    $rootScope.online = navigator.onLine;
    $window.addEventListener("offline", function () {
      console.log("offline status");
      $rootScope.$apply(function() {
        $rootScope.online = false;
      });
    }, false);
    $window.addEventListener("online", function () {
      console.log("online status");
      $rootScope.$apply(function() {
        $rootScope.online = true;
      });
    }, false);
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider



    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

    .state('app.tweetDetails', {
      url: '/tweetDetails',
      views: {
        'menuContent': {
          templateUrl: 'templates/tweetDetails.html'
        }
      }
    })

    .state('app.start', {
      url: '/start',
      views: {
        'menuContent': {
          templateUrl: 'templates/start.html'
        }
      }
    })

  .state('app.twitts', {
    url: '/twitts',
    views: {
      'menuContent': {
        templateUrl: 'templates/twitts.html'
      }
    }
  })

  .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html'
        }
      }
    })

    .state('app.imprint', {
      url: '/imprint',
      views: {
        'menuContent': {
          templateUrl: 'templates/imprint.html'
        }
      }
    })
  // Tab routing///////////////////////////////////////////////////////////////////////////
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/imprint.html',
      controller: 'AppCtrl'
    })

    .state('tab.mway', {
      url: '/mway',
      views: {
        'mway': {
          templateUrl: 'templates/mway.html'
        }
      }
    })

    .state('tab.aboutApp', {
      url: '/aboutApp',
      views: {
        'aboutApp': {
          templateUrl: 'templates/aboutApp.html'
        }
      }
    });

  //Fallback///////////////////////////////////////////////////////////////////////////////
  $urlRouterProvider.otherwise('/app/start');
})

    // IN_APP_BROWSING////////////////////////////////////////////////////////////////////
.directive("navigateTo", function($ionicGesture){
  return{
    restrict: 'A',
    link: function($scope, $element, $attr){
      var tapHandler = function(e){
        var inAppBrowser = window.open(encodeURI($attr.navigateTo), '_blank', 'location=yes', 'toolbar=yes');
      };
      var tapGesture = $ionicGesture.on('tap', tapHandler, $element);
      $scope.on('$destroy', function(){
        $ionicGesture.off(tapGesture, 'tap', tapHandler);
      });
    }
  }
});
