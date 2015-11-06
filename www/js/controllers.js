angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

    //Network status /////////////////////////////////////////////////////////////////////////
    $scope.$watch('online',function(newStatus){});
  })


  // slider controler ////////////////////////////////////////////////////////////////////////
    .controller('slideCtrl', function($scope, $ionicSlideBoxDelegate){
      $scope.navSlide = function(index){
      $ionicSlideBoxDelegate.slide(index, 600);}
    })


// DATA FROM TWITTER //////////////////////////////////////////////////////////////////
.controller('appService', function($rootScope, $scope, $ionicPlatform, $twitterApi, $cordovaOauth, $location) {

  var twitterKey = 'STORAGE.TWITTER.KEY';
  var clientId = 'hL1FTciRjOLyzHvwVttgcX9Db';
  var clientSecret = 'JAMpyC9e0lKCZIpvYAy8qd3NDxQ8M0m9MJITA0Z1aDnfslKXYP';
  var myToken = '4066470183-TC9nNuYhBkjmil9aCGQtHuFq5CxPsD2SRkQfLjJ';

  $scope.tweet = {};

  $ionicPlatform.ready(function() {
    myToken = JSON.parse(window.localStorage.getItem(twitterKey));

    $scope.showHomeTimeline = function() {
      $twitterApi.getHomeTimeline().then(function(data) {
        $scope.home_timeline = data;
      });
    };

    // Search von tweets mit dem hash tag ( funktioniert nicht) ///////////////////////////////
    $scope.showSearchHashTag = function() {
      $twitterApi.searchTweets("%22happy",{count: 5}).then(function(data) {
        $scope.home_timeline = data;

      });
    };


    // Search von tweets bei dem tweet tekst (funktioniert nicht) /////////////////////////////
    $scope.searchTweet = function(){
      $twitterApi.searchTweets($scope.tweet.searchT).then(function(data) {
        $scope.home_timeline = data;
      });
    };


    // data speichern und routing fur Details //////////////////////////////////////////////////
    $scope.getDetails = function(data){
      $rootScope.detailTweet = data;
     $location.path('/app/tweetDetails');
    };

    // Refreshing fur das Timeline(Tweets) /////////////////////////////////////////////////////
    $scope.doRefresh = function() {
      //$scope.showSearchHashTag("football");
      $scope.home_timeline = {};

      $scope.showHomeTimeline();
      $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.correctTimestring = function(string) {
      return new Date(Date.parse(string));
    };

    if (myToken === '' || myToken === null) {
      $cordovaOauth.twitter(clientId, clientSecret).then(function (succ) {
        myToken = succ;
        window.localStorage.setItem(twitterKey, JSON.stringify(succ));
        $twitterApi.configure(clientId, clientSecret, succ);
         $scope.showHomeTimeline();
       // $scope.showSearchHashTag();
      }, function(error) {
        console.log(error);
      });
    } else {
      $twitterApi.configure(clientId, clientSecret, myToken);
        $scope.showHomeTimeline();
      //$scope.showSearchHashTag();
    }
  });
  });
