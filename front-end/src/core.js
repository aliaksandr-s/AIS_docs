(function () {
    'use strict';

    angular.module('aisApp', ['ui.router', 'ngFileUpload'])
        .config(['$stateProvider', '$locationProvider',
            '$urlMatcherFactoryProvider', '$urlRouterProvider', config]);

    function config($stateProvider, $locationProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $urlMatcherFactoryProvider.caseInsensitive(true);

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'dist/controllers/home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'home'
            })

        $locationProvider.html5Mode(true);
    }
})();