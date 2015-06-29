// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
'use strict';
angular.module('starter', ['ionic','ngCordova', 'uiGmapgoogle-maps'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config( ['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
      console.log('config');
      uiGmapGoogleMapApiProvider.configure({
        v: '3.20',
        libraries: '',
        language: 'es',
        sensor: 'false',
      });
    }]

  )

.controller('MapaCtrl',['$scope', 'uiGmapGoogleMapApi',  '$cordovaGeolocation',
  function($scope, uiGmapGoogleMapApi, $cordovaGeolocation){
    //map variable containing the map details, will be referenced from the html
    angular.extend($scope, {
      map : {
        center: {
          latitude: 36.6856305, 
          longitude: -6.105594 
        }, 
        zoom: 18, 
        control:{},
        refresh: function () {
          $scope.map.control.refresh(origCenter);
        }
      }
    });
    var origCenter = {latitude: $scope.map.center.latitude, longitude: $scope.map.center.longitude};
    //map options
    $scope.opts = {scrollwheel: false, disableDefaultUI: true};
    $scope.markers = [];

    $scope.putMarkers = function (){
        var lat = $scope.map.center.latitude;
        var long = $scope.map.center.longitude;
        for(var i=0; i<5; i++) {
          $scope.markers.push({
              id: $scope.markers.length,
              latitude: lat + (i * 0.0002),
              longitude: long + (i * 0.0003),
              icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              options: {
                visible:true,
                title:'ma' + i,
                labelContent: 'm' + i
              }

          });
        }      
    };

    $cordovaGeolocation.getCurrentPosition(). then(
      function (position){
        var lat  = position.coords.latitude;
        var long = position.coords.longitude;
        $scope.map = {center: {latitude: lat, longitude: long}, zoom: 16 };
        //just want to create this loop to make more markers

      }, function() {
        console.log('error cordovaGeolocation');
        var lat  = 36.6856305;
        var long = -6.105594;
        $scope.map = {center: {latitude: lat, longitude: long}, zoom: 16 };
      });

}]);